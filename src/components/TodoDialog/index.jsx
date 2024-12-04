import { useCallback, useEffect, useMemo, useState } from "react";

import { Formik, Form, Field } from "formik";
import { pick } from "lodash";

import { STATUSES } from "../../constants";
import { sleep } from "../../helpers";
import { Select, Button, Dialog } from "../ui";
import useTodos from "../../hooks/useTodos";
import { createTodo, deleteTodo, getTodoById, updateTodo } from "../../api";
import TodoCard from "../TodoCard";

import styles from "./styles.module.css";
import { ChevronRightIcon } from "@heroicons/react/16/solid";

const initialFormValues = {
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
  const [currentTodo, setCurrentTodo] = useState(null);

  const fetchTodo = useCallback(async () => {
    try {
      if (!currentId) return;

      const res = await getTodoById(currentId);
      setCurrentTodo(res.data);
    } catch (e) {
      console.error("error", e);
    }
  }, [currentId]);

  const handleSubmit = async (values) => {
    try {
      if (!currentTodo) {
        await createTodo(values);
      } else {
        await updateTodo(currentTodo.id, values);
      }
      fetchTodos();
      close();
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(currentId);
      fetchTodos();
      close();
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleUpdateStatus = async (value) => {
    try {
      await updateTodo(currentTodo.id, { status: value });
      fetchTodos();
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleCreateChildTodo = async () => {
    // close();
    await sleep(300);
    // setShowModal(true);
  };

  const handleBreadcrumbClick = (id) => {
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
    const neededValues = pick(currentTodo, Object.keys(initialFormValues));
    Object.keys(neededValues).forEach(
      (key) => neededValues[key] === null && (neededValues[key] = "")
    );
    return neededValues;
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
      {!isEdit && todosIdsStack.length && (
        <ul className={styles.breadcrumbs}>
          <li
            className={styles.breadcrumb}
            onClick={() => handleBreadcrumbClick(todosIdsStack[0])}
          >
            {`TODO-${todosIdsStack[0]}`}
          </li>

          {todosIdsStack.toSpliced(0, 1).map((id) => (
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
                optionValues={STATUSES}
                className="w-40 ml-auto"
                onChange={(e) => {
                  const value = e.target.value;
                  handleUpdateStatus(value);
                  setFieldValue("status", value);
                }}
              />
            )}

            <div className="w-full border-t border-black"></div>

            {currentTodo?.children && !isEdit && (
              <div className="w-full flex flex-col gap-1 max-h-28 overflow-y-scroll">
                {currentTodo.children.map((childTodo) => (
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
