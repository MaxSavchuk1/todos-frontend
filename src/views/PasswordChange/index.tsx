// import { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "@/components/ui";
import { useChangePasswordMutation } from "@/services/api/modules/auth";
import Input from "@/components/ui/Input";
import { passwordChangeValidationSchema } from "@/helpers/validationSchemes";
import styles from "./styles.module.css";
import { ChangePasswordRequest } from "@/helpers/types";
import notify from "@/services/notify";

const initialFormValues: ChangePasswordRequest = {
  oldPassword: "",
  password: "",
  passwordConfirmation: "",
};

export default function Profile() {
  const [changePassword] = useChangePasswordMutation();

  const handleSubmit = async (
    values: ChangePasswordRequest,
    {
      setSubmitting,
      resetForm,
      setFieldError,
    }: FormikHelpers<ChangePasswordRequest>
  ) => {
    try {
      if (values.password !== values.passwordConfirmation) {
        setFieldError("passwordConfirmation", "Passwords do not match");
        return setSubmitting(false);
      }

      await changePassword(values).unwrap();
      notify("Password changed successfully", "success");
      resetForm();
    } catch (e) {
      if (Array.isArray((e as any)?.data?.message)) {
        notify((e as any)?.data?.message[0], "error");
      }
      console.log(e);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-6">Password change</h1>
      <Formik
        initialValues={initialFormValues}
        validationSchema={passwordChangeValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="space-y-2">
              <div>
                <label htmlFor="oldPassword" className={styles.label}>
                  Old password
                </label>
                <Input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  placeholder="Old password"
                />
              </div>

              <div>
                <label htmlFor="password" className={styles.label}>
                  New password
                </label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="New password"
                />
              </div>

              <div>
                <label htmlFor="passwordConfirmation" className={styles.label}>
                  Confirm new password
                </label>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm new password"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="submit" disabled={isSubmitting}>
                  Change password
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
