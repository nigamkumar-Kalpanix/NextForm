"use client";

import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { ContactFormValues } from "./contactSchema";
import TextField from "./fields/TextField";
import TextAreaField from "./fields/TextAreaField";
import SelectField from "./fields/SelectField";
import RadioGroupField from "./fields/RadioGroupField";
import CheckboxField from "./fields/CheckboxField";

type FieldName = keyof ContactFormValues;

type BaseConfig = {
  name: FieldName;
  label: string;
  required?: boolean;
};

export type FieldConfig =
  | (BaseConfig & { type: "text" | "email" | "date" })
  | (BaseConfig & {
      type: "select";
      options: { value: string; label: string }[];
    })
  | (BaseConfig & {
      type: "radio";
      options: { value: string; label: string }[];
    })
  | (BaseConfig & { type: "textarea" })
  | (BaseConfig & { type: "checkbox" });

type FormFieldProps = {
  config: FieldConfig;
  register: UseFormRegister<ContactFormValues>;
  errors: FieldErrors<ContactFormValues>;
  watch: UseFormWatch<ContactFormValues>;
  rules?: RegisterOptions<ContactFormValues, FieldName>;
};

export default function FormField({
  config,
  register,
  errors,
  watch,
  rules,
}: FormFieldProps) {
  const error = errors[config.name];
  const errorMessage = error?.message as string | undefined;
  const value = watch(config.name) as string | boolean | null | undefined;

  const common = {
    name: config.name,
    errorMessage,
  };

  switch (config.type) {
    case "text":
    case "email":
    case "date": {
      const { onChange, onBlur } = register(config.name, rules);
      return (
        <TextField
          label={config.label}
          required={config.required}
          type={config.type === "text" ? "text" : config.type}
          value={(value as string) ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          {...common}
        />
      );
    }

    case "select": {
      const { onChange, onBlur } = register(config.name, rules);
      return (
        <SelectField
          label={config.label}
          value={(value as string) ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          options={config.options}
          {...common}
        />
      );
    }

    case "radio": {
      const { onChange } = register(config.name, rules);
      return (
        <RadioGroupField
          label={config.label}
          value={(value as string) ?? ""}
          onChange={onChange}
          options={config.options}
          {...common}
        />
      );
    }

    case "textarea": {
      const { onChange, onBlur } = register(config.name, rules);
      return (
        <TextAreaField
          label={config.label}
          required={config.required}
          value={(value as string) ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          {...common}
        />
      );
    }

    case "checkbox": {
      const { onChange } = register(config.name, rules);
      return (
        <CheckboxField
          label={config.label}
          checked={Boolean(value)}
          onChange={onChange}
          {...common}
        />
      );
    }
  }
}
