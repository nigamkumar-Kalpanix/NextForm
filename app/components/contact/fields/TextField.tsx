"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TextFieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  type?: string;
};

export default function TextField({
  label,
  placeholder,
  required,
  registration,
  error,
  type = "text",
}: TextFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8E7571]"
        {...registration}
      />
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
