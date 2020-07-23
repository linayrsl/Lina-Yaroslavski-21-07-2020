import * as Yup from "yup";

export const ComposeEmailSchema = Yup.object()
  .shape({
    receiver: Yup.string()
      .min(1, "Username too short")
      .max(16, "Username too long")
      .required("required field"),
    sender: Yup.string()
      .min(1, "Password too short")
      .max(16, "Password too long")
      .required("required field"),
    subject: Yup.string()
      .required("required field"),
    message: Yup.string()
  });
