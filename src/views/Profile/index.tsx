import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/services/api";
import { UserProfile } from "@/helpers/types";
import styles from "./styles.module.css";

const initialFormValues: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function Profile() {
  const { data: userData } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    if (userData) {
      setFormValues({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      });
    }
  }, [userData]);

  const handleSubmit = async (
    values: UserProfile,
    { setSubmitting }: FormikHelpers<UserProfile>
  ) => {
    try {
      await updateProfile({ id: userData!.id, ...values }).unwrap();
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                {isEditing ? (
                  <Field
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="text-input"
                  />
                ) : (
                  <div className="mt-1 py-2">{userData?.firstName}</div>
                )}
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                {isEditing ? (
                  <Field
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="text-input"
                  />
                ) : (
                  <div className="mt-1 py-2">{userData?.lastName}</div>
                )}
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                {isEditing ? (
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="text-input"
                    disabled
                  />
                ) : (
                  <div className="mt-1 py-2">{userData?.email}</div>
                )}
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className="flex justify-end space-x-2">
                {isEditing ? (
                  <>
                    <Button type="submit" disabled={isSubmitting}>
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="submit" disabled className="hidden">
                      Save
                    </Button>
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
