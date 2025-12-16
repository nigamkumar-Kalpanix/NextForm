"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type CheckboxFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
};

export default function CheckboxField({
  label,
  registration,
  error,
}: CheckboxFieldProps) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm text-gray-800">
        <input type="checkbox" {...registration} />
        <span>{label}</span>
      </label>
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
