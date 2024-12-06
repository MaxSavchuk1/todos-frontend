import { useCallback, useEffect, useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import { pick } from "lodash";
import { enqueueSnackbar } from "notistack";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

import { STATUSES } from "@/constants";
import { sleep } from "@/helpers";
import { Select, Button, Dialog } from "../ui";
import useTodos from "@/hooks/useTodos";
import { createTodo, deleteTodo, getTodoById, updateTodo } from "@/api";
import TodoCard from "../TodoCard";
import styles from "./styles.module.css";
import type { FormValues, Todo, TodoStatus } from "@/helpers/types";

const initialFormValues: FormValues = {
  title: "",
  body: "",
  status: "new",
};

export default function TodoDialog() {
  const {
    showModal,
    todosIdsStack,
    setShowModal,
    fetchTodos,
    removeFromIdsStack,
    clearTodosIdsStack,
  } = useTodos();

  const currentId = todosIdsStack.at(-1);

  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const fetchTodo = useCallback(async () => {
    try {
      if (!currentId) return;

      const response = await getTodoById(currentId);
      setCurrentTodo(response as any);
    } catch (e) {
      console.error("error", e);
    }
  }, [currentId]);

  const successHandler = (message = "Success!") => {
    enqueueSnackbar(message, { variant: "success" });
    fetchTodos();
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      if (!currentTodo) {
        if (currentId) {
          await createTodo({ ...values, parentId: currentId });
        } else {
          await createTodo(values);
        }
      } else {
        await updateTodo(currentTodo.id, values);
      }
      if (currentId) {
        await fetchTodo();
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
        await deleteTodo(currentId as number);
        successHandler("Todo was deleted");
        close();
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleUpdateStatus = async (value: TodoStatus) => {
    try {
      await updateTodo(currentTodo!.id, { status: value });
      fetchTodos();
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleCreateChildTodo = async () => {
    setCurrentTodo(null);
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
    setCurrentTodo(null);
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
    fetchTodo();
  }, [currentId, fetchTodo]);

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
          <Form className="flex flex-col items-start gap-3 mt-6">
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
                  className="text-xl font-semibold text-gray-900 line-clamp-2"
                  onDoubleClick={() => setIsEdit(true)}
                >
                  {currentTodo?.title}
                </h3>

                <div className="mt-2">
                  <p
                    className="text-sm text-gray-500 line-clamp-5"
                    onDoubleClick={() => setIsEdit(true)}
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
                onChange={(e) => {
                  const { value } = e.target;
                  handleUpdateStatus(value as TodoStatus);
                  setFieldValue("status", value);
                }}
              />
            )}

            <div className="w-full border-t border-black"></div>

            {currentTodo?.children && !isEdit && (
              <div className="w-full flex flex-col gap-1 max-h-28 overflow-y-scroll">
                {(currentTodo.children as Todo[]).map((childTodo) => (
                  <TodoCard key={childTodo.id} todo={childTodo} minified />
                ))}
              </div>
            )}

            {currentTodo && !isEdit && (
              <Button
                type="button"
                className="ml-auto"
                onClick={() => handleCreateChildTodo()}
              >
                Create child todo
              </Button>
            )}

            <div className="mt-5 flex gap-3 w-full justify-between">
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
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
