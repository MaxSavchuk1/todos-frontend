import * as Yup from "yup";

const passwordSchema = Yup.string()
  .required("Required")
  .min(6, "Minimum 6 characters")
  .max(20, "Maximum 20 characters");

export const passwordChangeValidationSchema = Yup.object().shape({
  oldPassword: passwordSchema,
  password: passwordSchema,
  passwordConfirmation: passwordSchema,
});

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: passwordSchema,
});

export const createAccountValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: passwordSchema,
});
