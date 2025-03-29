import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { InputTypes } from "@/lib/types";

interface InputFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>; // The name of the field in the form schema
  label: string;
  placeholder: string;
  type?: InputTypes;
}

const InputFormField = <T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
}: InputFormFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              value={field.value ?? ""}
            />
          </FormControl>
          <FormMessage className="text-xs font-normal" />
        </FormItem>
      )}
    />
  );
};

export default InputFormField;
