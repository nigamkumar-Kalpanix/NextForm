import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  subject: yup
    .string()
    .max(100, "Subject must be at most 100 characters")
    .optional(),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters"),
  choice: yup
    .string()
    .oneOf(["num1", "num2", "num3"])
    .required(),
  contactMethod: yup
    .string()
    .oneOf(["email", "phone"], "Choose a contact method")
    .required("Contact method is required"),
  preferredDate: yup.string().nullable().optional(),
  confirmSubmit: yup
    .boolean()
    .oneOf([true], "Please confirm before submitting"),
});

export type ContactFormValues = yup.InferType<typeof contactSchema>;
