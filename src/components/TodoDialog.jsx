import { useEffect, useMemo, useState } from "react";

import { Formik, Form, Field } from "formik";
import { pick } from "lodash";

import { STATUSES } from "../constants";
import { Select, Button, Dialog } from "./ui/index";
import useTodos from "../hooks/useTodos";

const initialFormValues = {
  title: "",
  body: "",
  status: "new",
};

export default function TodoDialog() {
  const { showModal, selectedTodo, setShowModal, setSelectedTodo } = useTodos();
  const [isEdit, setIsEdit] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleSubmit = (...args) => {
    console.log(args);
  };

  const closeHandler = (v) => {
    setShowModal(v);
    setTimeout(() => setSelectedTodo(null), 250);
  };

  const transformedSelectedTodo = useMemo(() => {
    const neededValues = pick(selectedTodo, Object.keys(initialFormValues));
    Object.keys(neededValues).forEach(
      (key) => neededValues[key] === null && (neededValues[key] = "")
    );
    return neededValues;
  }, [selectedTodo]);

  useEffect(() => {
    if (!selectedTodo) {
      setIsEdit(true);
      setFormValues(initialFormValues);
    } else {
      setIsEdit(false);
      setFormValues(transformedSelectedTodo);
    }
  }, [selectedTodo, transformedSelectedTodo]);

  return (
    <Dialog open={showModal} handleClose={closeHandler}>
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {() => (
          <Form className="flex flex-col items-start gap-3 max-w-[90%]">
            {isEdit && (
              <>
                <Field
                  name="title"
                  type="text"
                  placeholder="Title"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 font-semibold"
                />
                <Field
                  name="body"
                  component="textarea"
                  rows={3}
                  placeholder="Content"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                />
              </>
            )}

            {!isEdit && (
              <>
                <h3 className="text-base font-semibold text-gray-900">
                  {selectedTodo.title}
                </h3>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">{selectedTodo.body}</p>
                </div>
              </>
            )}

            {selectedTodo && !isEdit && (
              <Select name="status" optionValues={STATUSES} />
            )}

            <div className="mt-5 flex gap-3">
              {selectedTodo && (
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
                <Button styleType="danger" onClick={() => closeHandler(false)}>
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
