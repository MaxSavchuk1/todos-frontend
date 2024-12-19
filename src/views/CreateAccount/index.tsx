import { Formik, Form, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useCreateAccountMutation } from "@/services/api/modules/users";
import { CreateAccountRequest } from "@/helpers/types";
import { Button } from "@/components/ui";
import Input from "@/components/ui/Input";
import { createAccountValidationSchema } from "@/helpers/validationSchemes";
import { ROUTES } from "@/constants";

const initialValues: CreateAccountRequest = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function CreateAccount() {
  const [createAccount] = useCreateAccountMutation();
  const navigate = useNavigate();

  const submitHandler = async (
    values: CreateAccountRequest,
    { setSubmitting, setFieldError }: FormikHelpers<CreateAccountRequest>
  ) => {
    try {
      await createAccount(values).unwrap();
      navigate(ROUTES.USERS);
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
    <div className="min-h-screen flex flex-col p-4">
      <h2 className="text-2xl text-gray-900">Create user</h2>
      <div className="max-w-md w-full space-y-8">
        <Formik
          initialValues={initialValues}
          validationSchema={createAccountValidationSchema}
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
                  Create new user
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
