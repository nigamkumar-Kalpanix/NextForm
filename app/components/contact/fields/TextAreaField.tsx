"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TextAreaFieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  rows?: number;
};

export default function TextAreaField({
  label,
  placeholder,
  required,
  registration,
  error,
  rows = 5,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8E7571]"
        {...registration}
      />
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
