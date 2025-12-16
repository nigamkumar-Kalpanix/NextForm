"use client";

type CheckboxFieldProps = {
  label: string;
  name?: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
};

export default function CheckboxField({
  label,
  name,
  checked,
  onChange,
  errorMessage,
}: CheckboxFieldProps) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm text-gray-800">
        <input
          type="checkbox"
          name={name}
          checked={!!checked}
          onChange={onChange}
        />
        <span>{label}</span>
      </label>
      {errorMessage && (
        <p className="text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
