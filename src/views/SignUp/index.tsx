import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useSignupMutation } from "@/services/api";
import { SignUpRequest } from "@/helpers/types";
import { Button } from "@/components/ui";
import useLogin from "@/hooks/useLogin";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});

const initialValues: SignUpRequest = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const [signup] = useSignupMutation();
  const { loginRequest } = useLogin();

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
          validationSchema={SignUpSchema}
          onSubmit={submitHandler}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-3">
                <div>
                  <Field
                    name="firstName"
                    type="text"
                    className="text-input"
                    placeholder="First name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
                <div>
                  <Field
                    name="lastName"
                    type="text"
                    className="text-input"
                    placeholder="Last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
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

              <div>
                <Button type="submit" disabled={isSubmitting}>
                  Sign up
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
