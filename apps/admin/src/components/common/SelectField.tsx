import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  FieldValues,
  Path,
  useController,
  UseFormReturn,
} from "react-hook-form";

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  form: UseFormReturn<T>;
  options: { value: string; label: string }[];
  placeholder?: string;
  formItemClassName?: string;
  formLabelClassName?: string;
  onValueChange?: (value: string) => void;
  description?: string;
  descriptionPosition?: "up" | "down";
  formDescriptionClassName?: string;
}

export const SelectField = <T extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder,
  formItemClassName,
  formLabelClassName,
  onValueChange, // Accept the custom onValueChange prop
  description,
  descriptionPosition = "up",
  formDescriptionClassName,
}: SelectFieldProps<T>) => {
  const { field } = useController({
    name,
    control: form.control,
  });

  return (
    <FormItem className={formItemClassName}>
      <FormLabel className={formLabelClassName}>{label}</FormLabel>
      {description && descriptionPosition == "up" && (
        <FormDescription className={formDescriptionClassName}>
          {description}
        </FormDescription>
      )}
      <Select
        onValueChange={(value: string) => {
          field.onChange(value);
          if (onValueChange) onValueChange(value); // Call the custom onValueChange if passed
        }}
        defaultValue={field.value || ""}
      >
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder || "Select..."} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && descriptionPosition == "down" && (
        <FormDescription>{description}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
};
