import { useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "@/components/ui";
import { useUpdateProfileMutation } from "@/services/api/modules/users";
import { useGetProfileQuery } from "@/services/api/modules/auth";
import { UserProfile } from "@/helpers/types";
import styles from "./styles.module.css";
import Input from "@/components/ui/Input";
import { profileValidationSchema } from "@/helpers/validationSchemes";

const initialFormValues: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
};

export default function PasswordChange() {
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
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      <Formik
        initialValues={formValues}
        validationSchema={profileValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div className="space-y-2">
              <div>
                <label htmlFor="firstName" className={styles.label}>
                  First Name
                </label>
                {isEditing ? (
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                ) : (
                  <div className="mt-1 pt-2 pb-4">{userData?.firstName}</div>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name
                </label>
                {isEditing ? (
                  <Input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                  />
                ) : (
                  <div className="mt-1 pt-2 pb-4">{userData?.lastName}</div>
                )}
              </div>

              <div>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    disabled
                  />
                ) : (
                  <div className="mt-1 pt-2 pb-4">{userData?.email}</div>
                )}
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
                    <Button type="submit" disabled className="!hidden">
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
