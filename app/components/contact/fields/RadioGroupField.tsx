"use client";

type RadioOption = { value: string; label: string };

type RadioGroupFieldProps = {
  label: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  options: RadioOption[];
  errorMessage?: string;
};

export default function RadioGroupField({
  label,
  name,
  value,
  onChange,
  options,
  errorMessage,
}: RadioGroupFieldProps) {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-800">{label}</p>
      <div className="flex flex-wrap gap-4 text-sm text-gray-800">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
      {errorMessage && (
        <p className="text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
