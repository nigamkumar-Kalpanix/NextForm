"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    contactSchema,
    ContactFormValues,
} from "./contactSchema";
import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import SelectField from "./fields/SelectField";
import RadioGroupField from "./fields/RadioGroupField";
import CheckboxField from "./fields/CheckboxField";

export default function ContactForm() {
    const [isSuccess, setIsSuccess] = useState(false);

  
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: yupResolver(contactSchema),
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
                    Feedback Form
                </h1>
              
            </div>
            

            {/* Form section */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 px-6 py-6 sm:px-8 sm:py-8"
            >
                <TextField
                    label="Name"
                    required
                    placeholder="Enter your full name..."
                    registration={register("name")}
                    error={errors.name}
                />

                <TextField
                    label="Email"
                    required
                    type="email"
                    placeholder="enteryouremail@example.com"
                    registration={register("email")}
                    error={errors.email}
                />

                <SelectField
                    label="Which Field"
                    registration={register("choice")}
                    error={errors.choice}
                    options={[
                        { value: "num1", label: "num1" },
                        { value: "num2", label: "num2" },
                        { value: "num3", label: "num3" },
                    ]}
                />

                <TextField
                    label="Subject (optional)"
                    placeholder="any subject..."
                    registration={register("subject")}
                    error={errors.subject}
                />

                <RadioGroupField
                    label="Preferred contact method "
                    registration={register("contactMethod")}
                    error={errors.contactMethod}
                    options={[
                        { value: "email", label: "Email" },
                        { value: "phone", label: "Phone" },
                    ]}
                />

                <TextField
                    label="Date OF Birth"
                    type="date"
                    registration={register("preferredDate")}
                    error={errors.preferredDate}
                />

                <TextAreaField
                    label="Any Suggestion"
                    required
                    placeholder="Write your suggestions here..."
                    registration={register("message")}
                    error={errors.message}
                />

                <CheckboxField
                    label="Are you sure you want to submit?"
                    registration={register("confirmSubmit")}
                    error={errors.confirmSubmit}
                />

                {isSuccess && (
                    <p className="text-sm text-green-600">
                        Thank you for submitting the form .
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
