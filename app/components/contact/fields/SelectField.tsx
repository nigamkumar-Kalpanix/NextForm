"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  options: Option[];
};

export default function SelectField({
  label,
  registration,
  error,
  options,
}: SelectFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <select
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8E7571]"
        {...registration}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
