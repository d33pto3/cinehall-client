import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { cn } from "@/lib/utils";

interface TextInputFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder?: string;
  form: UseFormReturn<T>;
  type?: string;
  formItemClass?: string;
  formLabelClass?: string;
  inputClass?: string;
  onChangeOverride?: (
    value: string,
    field: ControllerRenderProps<T, Path<T>>
  ) => void;
  formDescription?: string;
  rightText?: string;
  isDisabled?: boolean;
  descPos?: "top" | "bottom";
}

export const TextInputField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  form,
  type = "text",
  formItemClass,
  formLabelClass,
  inputClass,
  onChangeOverride,
  formDescription,
  rightText,
  isDisabled = false,
  descPos = "top",
}: TextInputFieldProps<T>) => (
  <FormField
    control={form.control}
    name={name}
    disabled={isDisabled}
    render={({ field }) => (
      <FormItem className={formItemClass}>
        <FormLabel className={formLabelClass}>{label}</FormLabel>
        {formDescription && descPos == "top" && (
          <FormDescription>{formDescription}</FormDescription>
        )}
        <FormControl>
          <div className="relative w-full">
            <Input
              className={cn(inputClass, rightText && "pr-16")} // Dynamically adjust padding
              placeholder={placeholder}
              type={type}
              {...field}
              value={field?.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                if (onChangeOverride) {
                  onChangeOverride(value, field);
                } else {
                  field.onChange(value);
                }
              }}
            />
            {rightText && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
                {rightText}
              </span>
            )}
          </div>
        </FormControl>
        {formDescription && descPos == "bottom" && (
          <FormDescription>{formDescription}</FormDescription>
        )}
        <FormMessage />
      </FormItem>
    )}
  />
);
