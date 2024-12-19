import { memo, useEffect, useState } from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button } from "@/components/ui";
import {
  useDeleteUserMutation,
  useUpdateProfileMutation,
  useUpdateMyProfileMutation,
} from "@/services/api/modules/users";
import { User, UserProfile } from "@/helpers/types";
import styles from "./styles.module.css";
import Input from "@/components/ui/Input";
import { profileValidationSchema } from "@/helpers/validationSchemes";
import useAuth from "@/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants";

type Props = {
  userData: User;
};

const initialFormValues: UserProfile = {
  firstName: "",
  lastName: "",
  email: "",
};

function UserForm({ userData }: Props) {
  const [updateProfile] = useUpdateProfileMutation();
  const [updateMyProfile] = useUpdateMyProfileMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { isAdmin, isUserManager } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState(initialFormValues);

  const isProfilePage = pathname === ROUTES.PROFILE;

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
    const data = { id: userData!.id, ...values };

    try {
      if (isProfilePage) {
        await updateMyProfile(data).unwrap();
      } else {
        await updateProfile(data).unwrap();
      }
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }

    setSubmitting(false);
  };

  const deleteUserHandler = async () => {
    try {
      if (window.confirm("Are you shure?")) {
        await deleteUser(userData.id).unwrap();
        navigate(-1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
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
                <div className={styles.infoItem}>{userData?.firstName}</div>
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
                <div className={styles.infoItem}>{userData?.lastName}</div>
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
                <div className={styles.infoItem}>{userData?.email}</div>
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
                <div className="flex w-full">
                  {/* plug. Somehow Formik use any another button as submit button if there is no submit button */}
                  <Button type="submit" disabled className="!hidden">
                    Plug
                  </Button>

                  {(isAdmin || isUserManager) && !isProfilePage && (
                    <Button
                      styleType="danger"
                      className="mr-auto"
                      onClick={deleteUserHandler}
                    >
                      Delete user
                    </Button>
                  )}

                  <Button onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default memo(UserForm);
