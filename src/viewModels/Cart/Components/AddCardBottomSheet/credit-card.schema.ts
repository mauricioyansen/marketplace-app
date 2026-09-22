import * as yup from "yup";

export const creditCardSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must have at least 2 characters"),
  number: yup
    .string()
    .required("Card number is required")
    .test("card-number", "Card number must have exactly 16 digits", (value) => {
      if (!value) return false;
      const cleaned = value.replace(/\s/g, "");
      return /^\d{16}$/.test(cleaned);
    }),
  expirationDate: yup
    .string()
    .required("Expiration date is required")
    .matches(/^\d{2}\/\d{2}$/, "Format must be MM/YY"),
  CVV: yup
    .string()
    .required("CVV is required")
    .matches(/^\d{3}$/, "CVV must have exactly 3 digits"),
});

export type CreditCardFormData = yup.InferType<typeof creditCardSchema>;
