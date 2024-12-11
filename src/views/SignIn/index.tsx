import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { LoginRequest } from "@/helpers/types";
import { Button } from "@/components/ui";
import useLogin from "@/hooks/useLogin";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(6, "Minimum 6 characters"),
});

const initialValues: LoginRequest = {
  email: "",
  password: "",
};

export default function SignIn() {
  const { loginRequest } = useLogin();

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={SignInSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-3">
                <div>
                  <Field
                    name="email"
                    type="email"
                    className="text-input"
                    placeholder="Email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    className="text-input"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button type="submit" disabled={isSubmitting}>
                  Sign in
                </Button>

                <Link to="/sign-up" className="router-link">
                  Create an account
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
