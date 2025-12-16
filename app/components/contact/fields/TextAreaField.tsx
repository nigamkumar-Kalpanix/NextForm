"use client";

type TextAreaFieldProps = {
  label: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  errorMessage?: string;
};

export default function TextAreaField({
  label,
  placeholder,
  required,
  rows = 5,
  name,
  value,
  onChange,
  onBlur,
  errorMessage,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full rounded border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8E7571]"
      />
      {errorMessage && (
        <p className="text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
