"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form";

import { ContactFormValues } from "./contactSchema";
import FormField, { FieldConfig } from "./FormField";

type FieldName = keyof ContactFormValues;

// extend FieldConfig with rules for each field
type ConfigWithRules = FieldConfig & {
  rules?: RegisterOptions<ContactFormValues, FieldName>;
};

const fieldConfigs: ConfigWithRules[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    rules: {
      required: "Name is required",
      minLength: {
        value: 2,
        message: "Name must be at least 2 characters",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
  },
  {
    name: "choice",
    label: "Choose an option",
    type: "select",
    options: [
      { value: "num1", label: "num1" },
      { value: "num2", label: "num2" },
      { value: "num3", label: "num3" },
    ],
    rules: { required: "Please choose an option" },
  },
  {
    name: "subject",
    label: "Subject (optional)",
    type: "text",
    rules: {
      maxLength: {
        value: 100,
        message: "Subject must be at most 100 characters",
      },
    },
  },
  {
    name: "contactMethod",
    label: "Preferred contact method *",
    type: "radio",
    options: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
    ],
    rules: { required: "Contact method is required" },
  },
  {
    name: "preferredDate",
    label: "Preferred date (optional)",
    type: "date",
  },
  {
    name: "message",
    label: "Any Suggestion",
    type: "textarea",
    required: true,
    rules: {
      required: "Message is required",
      minLength: {
        value: 10,
        message: "Message must be at least 10 characters",
      },
    },
  },
  {
    name: "confirmSubmit",
    label: "Are you sure you want to submit?",
    type: "checkbox",
    rules: {
      validate: (v) => v || "Please confirm before submitting",
    },
  },
];

export default function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      choice: "num1",
      contactMethod: "email",
      preferredDate: null,
      confirmSubmit: false,
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    setIsSuccess(false);
    console.log("Contact form submitted:", data);
    setIsSuccess(true);
    reset({
      name: "",
      email: "",
      subject: "",
      message: "",
      choice: "num1",
      contactMethod: "email",
      preferredDate: null,
      confirmSubmit: false,
    });
  };

  return (
    <section className="w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-lg">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-[#303030] to-[#494949] px-6 py-6 text-white sm:px-8 sm:py-8">
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
          Have a question or feedback?
        </h1>
      </div>

      {/* Form section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 px-6 py-6 sm:px-8 sm:py-8"
      >
        {fieldConfigs.map((field) => (
          <FormField
            key={field.name}
            config={field}
            register={register}
            errors={errors}
            watch={watch}
            rules={field.rules}
          />
        ))}

        {isSuccess && (
          <p className="text-sm text-green-600">
            Thank you! Your message has been sent.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-sm bg-[#0E0C0B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5C4A47] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
}
