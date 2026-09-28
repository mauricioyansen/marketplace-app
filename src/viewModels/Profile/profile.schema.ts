import * as yup from "yup";

export const profileSchema: yup.ObjectSchema<{
  name: string;
  email: string;
  phone: string;
  password?: string;
  newPassword?: string;
}> = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(4, "Name must be at least 4 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{11}$/, "Phone must have 11 digits (DDD + number)"),
  password: yup.string().optional(),
  newPassword: yup.string().optional(),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;
