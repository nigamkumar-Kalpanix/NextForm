"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { ContactFormValues } from "./contactSchema";
import FormField, { FieldConfig } from "./FormField";

const fieldConfigs: FieldConfig[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  {
    name: "choice",
    label: "Choose an option",
    type: "select",
    options: [
      { value: "num1", label: "num1" },
      { value: "num2", label: "num2" },
      { value: "num3", label: "num3" },
    ],
  },
  { name: "subject", label: "Subject (optional)", type: "text" },
  {
    name: "contactMethod",
    label: "Preferred contact method *",
    type: "radio",
    options: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone" },
    ],
  },
  { name: "preferredDate", label: "Preferred date (optional)", type: "date" },
  {
    name: "message",
    label: "Any Suggestion",
    type: "textarea",
    required: true,
  },
  {
    name: "confirmSubmit",
    label: "Are you sure you want to submit?",
    type: "checkbox",
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
        {/* Name */}
        <FormField
          config={fieldConfigs[0]}
          register={register}
          errors={errors}
          watch={watch}
          rules={{
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          }}
        />

        {/* Email */}
        <FormField
          config={fieldConfigs[1]}
          register={register}
          errors={errors}
          watch={watch}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
        />

        {/* Choice */}
        <FormField
          config={fieldConfigs[2]}
          register={register}
          errors={errors}
          watch={watch}
          rules={{ required: "Please choose an option" }}
        />

        {/* Subject (optional) */}
        <FormField
          config={fieldConfigs[3]}
          register={register}
          errors={errors}
          watch={watch}
          rules={{
            maxLength: {
              value: 100,
              message: "Subject must be at most 100 characters",
            },
          }}
        />

        {/* Contact method */}
        <FormField
          config={fieldConfigs[4]}
          register={register}
          errors={errors}
          watch={watch}
          rules={{ required: "Contact method is required" }}
        />

        {/* Preferred date (optional) */}
        <FormField
          config={fieldConfigs[5]}
          register={register}
          errors={errors}
          watch={watch}
        />

        {/* Message */}
        <FormField
          config={fieldConfigs[6]}
          register={register}
          errors={errors}
          watch={watch}
          rules={{
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
          }}
        />

        {/* Confirm submit */}
        <FormField
          config={fieldConfigs[7]}
          register={register}
          errors={errors}
          watch={watch}
          rules={{
            validate: (v) => v || "Please confirm before submitting",
          }}
        />

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
