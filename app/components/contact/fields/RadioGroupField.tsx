"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type RadioOption = {
  value: string;
  label: string;
};

type RadioGroupFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  options: RadioOption[];
};

export default function RadioGroupField({
  label,
  registration,
  error,
  options,
}: RadioGroupFieldProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-800">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input type="radio" value={opt.value} {...registration} />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
