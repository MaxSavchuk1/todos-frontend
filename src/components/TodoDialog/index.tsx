import { memo, useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { pick } from "lodash";
import notify from "@/services/notify";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

import { STATUSES } from "@/constants";
import { sleep } from "@/helpers";
import { Select, Button, Dialog } from "../ui";
import useTodos from "@/hooks/useTodos";
import TodoCard from "../TodoCard";
import styles from "./styles.module.css";
import type { FormValues, Todo, TodoStatus } from "@/helpers/types";

type Props = {
  allowEdit?: boolean;
};

const initialFormValues: FormValues = {
  title: "",
  body: "",
  status: "new",
};

function TodoDialog({ allowEdit = true }: Props) {
  const {
    showModal,
    todosIdsStack,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    setShowModal,
    removeFromIdsStack,
    clearTodosIdsStack,
    useLazyGetTodoByIdQuery,
  } = useTodos();

  const [fetchTodoById, { data: currentTodo, reset }] =
    useLazyGetTodoByIdQuery();

  const currentId = todosIdsStack.at(-1);

  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const successHandler = async (message = "Success!") => {
    notify(message, "success");
    await fetchTodos();
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!currentTodo) {
        if (currentId) {
          await createTodo({ ...values, parentId: currentId }).unwrap();
        } else {
          await createTodo(values).unwrap();
        }
      } else {
        await updateTodo({ id: currentTodo.id, data: values }).unwrap();
      }
      if (currentId) {
        await fetchTodoById(currentId);
        await fetchTodos();
      } else {
        successHandler();
        close();
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you shure?")) {
        await deleteTodo(currentId!);
        successHandler("Todo was deleted");
        close();
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleUpdateStatus = async (value: TodoStatus) => {
    try {
      await updateTodo({
        id: currentTodo!.id,
        data: { status: value },
      }).unwrap();
      await fetchTodos();
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleCreateChildTodo = async () => {
    reset();
  };

  const handleBreadcrumbClick = (id: number) => {
    if (id !== currentId) {
      removeFromIdsStack(id);
    }
  };

  const close = async () => {
    setShowModal(false);
    await sleep(200);
    clearTodosIdsStack();
    reset();
  };

  const transformedSelectedTodo = useMemo(() => {
    const pickedValues = pick(
      currentTodo,
      Object.keys(initialFormValues)
    ) as FormValues;

    Object.keys(pickedValues).forEach(
      (key) =>
        pickedValues[key as keyof FormValues] === null &&
        (pickedValues[key as keyof Omit<FormValues, "status">] = "")
    );

    return pickedValues;
  }, [currentTodo]);

  useEffect(() => {
    currentId && fetchTodoById(currentId);
  }, [currentId, fetchTodoById]);

  useEffect(() => {
    if (!currentTodo) {
      setIsEdit(true);
      setFormValues(initialFormValues);
    } else {
      setIsEdit(false);
      setFormValues(transformedSelectedTodo);
    }
  }, [currentTodo, transformedSelectedTodo]);

  return (
    <Dialog open={showModal} handleClose={close}>
      {/***** BREADCRUMBS ****/}

      {!isEdit && todosIdsStack.length && (
        <ul className={styles.breadcrumbs}>
          <li
            className={styles.breadcrumb}
            onClick={() => handleBreadcrumbClick(todosIdsStack[0])}
          >
            {`TODO-${todosIdsStack[0]}`}
          </li>

          {todosIdsStack.toSpliced(0, 1).map((id: number) => (
            <li key={"crumb" + id}>
              <div className="flex items-center">
                <ChevronRightIcon className="size-5 shrink-0 text-gray-400" />
                <span
                  className={styles.breadcrumb}
                  onClick={() => handleBreadcrumbClick(id)}
                >
                  {`TODO-${id}`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/***** CONTENT ****/}

      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form className={styles.inputs}>
            {isEdit && (
              <>
                <Field
                  name="title"
                  type="text"
                  placeholder="Title*"
                  className="text-input font-semibold"
                  required
                />
                <Field
                  name="body"
                  component="textarea"
                  rows={5}
                  placeholder="Content"
                  className="text-input"
                />
              </>
            )}

            {!isEdit && (
              <>
                <h3
                  className={styles.todoTitle}
                  onDoubleClick={() => allowEdit && setIsEdit(true)}
                >
                  {currentTodo?.title}
                </h3>

                <div className="mt-2">
                  <p
                    className={styles.todoBody}
                    onDoubleClick={() => allowEdit && setIsEdit(true)}
                  >
                    {currentTodo?.body}
                  </p>
                </div>
              </>
            )}

            {currentTodo && !isEdit && (
              <Select
                name="status"
                optionValues={[...STATUSES]}
                className="w-40 ml-auto"
                disabled={!allowEdit}
                onChange={(e) => {
                  const { value } = e.target;
                  handleUpdateStatus(value as TodoStatus);
                  setFieldValue("status", value);
                }}
              />
            )}

            <div className={styles.divider}></div>

            {currentTodo?.children && !isEdit && (
              <div className={styles.childrenList}>
                {(currentTodo.children as Todo[]).map((childTodo) => (
                  <TodoCard key={childTodo.id} todo={childTodo} minified />
                ))}
              </div>
            )}

            {allowEdit && currentTodo && !isEdit && (
              <Button
                type="button"
                className="ml-auto"
                onClick={() => handleCreateChildTodo()}
              >
                Create child todo
              </Button>
            )}

            {allowEdit && (
              <div className={styles.buttons}>
                {currentTodo && (
                  <Button
                    type="button"
                    onClick={() => setIsEdit((prev) => !prev)}
                  >
                    {isEdit ? "Cancel" : "Edit"}
                  </Button>
                )}

                {isEdit ? (
                  <Button type="submit" styleType="primary">
                    Save
                  </Button>
                ) : (
                  <Button styleType="danger" onClick={() => handleDelete()}>
                    Delete
                  </Button>
                )}
              </div>
            )}
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

export default memo(TodoDialog);
