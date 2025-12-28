import React from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
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
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordType = type === "password";

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                {...field}
                type={isPasswordType ? (showPassword ? "text" : "password") : type}
                value={field.value ?? ""}
                className="text-black pr-10"
              />
              {isPasswordType && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-xs font-normal" />
        </FormItem>
      )}
    />
  );
};

export default InputFormField;
