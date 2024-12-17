import { Formik, Form, FormikHelpers } from "formik";
import { useSignupMutation } from "@/services/api/modules/users";
import { SignUpRequest } from "@/helpers/types";
import { Button } from "@/components/ui";
import useLogin from "@/hooks/useLogin";
import { Link, Navigate } from "react-router-dom";
import Input from "@/components/ui/Input";
import useAuth from "@/hooks/useAuth";
import { ROUTES } from "@/constants";
import { signUpValidationSchema } from "@/helpers/validationSchemes";

const initialValues: SignUpRequest = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const [signup] = useSignupMutation();
  const { loginRequest } = useLogin();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  const submitHandler = async (
    values: SignUpRequest,
    { setSubmitting, setFieldError }: FormikHelpers<SignUpRequest>
  ) => {
    try {
      await signup(values).unwrap();
      loginRequest({ email: values.email, password: values.password });
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
          Create your account
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpValidationSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-1">
                <Input name="firstName" type="text" placeholder="First name" />
                <Input name="lastName" type="text" placeholder="Last name" />
                <Input name="email" type="email" placeholder="Email address" />
                <Input name="password" type="password" placeholder="Password" />
              </div>

              <div className="flex items-center justify-between">
                <Button type="submit" disabled={isSubmitting}>
                  Sign up
                </Button>

                <Link to="/sign-in" className="router-link">
                  Sign in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
