import { Navigate } from "react-router-dom";
import { Formik, Form, FormikHelpers } from "formik";
import { LoginRequest } from "@/helpers/types";
import { Button } from "@/components/ui";
import useLogin from "@/hooks/useLogin";
import Input from "@/components/ui/Input";
import useAuth from "@/hooks/useAuth";
import { ROUTES } from "@/constants";
import { signInValidationSchema } from "@/helpers/validationSchemes";
import styles from "./styles.module.css";

const initialValues: LoginRequest = {
  email: "",
  password: "",
};

export default function SignIn() {
  const { loginRequest } = useLogin();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const submitHandler = async (
    values: LoginRequest,
    { setSubmitting, setFieldError }: FormikHelpers<LoginRequest>
  ) => {
    try {
      await loginRequest(values);
    } catch (error) {
      const messages = (error as any)?.data?.messageByField;
      if (messages) {
        Object.keys(messages).forEach((key) =>
          setFieldError(key, messages[key])
        );
      }
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.header}>Sign in to your account</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={signInValidationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-1">
                <Input name="email" type="email" placeholder="Email address" />
                <Input name="password" type="password" placeholder="Password" />
              </div>

              <div className="flex items-center justify-between">
                <Button type="submit" disabled={isSubmitting}>
                  Sign in
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
