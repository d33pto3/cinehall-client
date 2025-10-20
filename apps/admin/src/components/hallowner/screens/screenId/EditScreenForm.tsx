// EditScreenForm.tsx
import { TextInputField } from "@/components/common/TextInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { ScreenProps } from "./ScreenOverview";

type UpdatedScreenFormValues = z.infer<typeof screenFormSchema>;

export const screenFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Screen name must be at least 4 characters" })
    .max(50, {
      message: "Screen name must not be longer than 50 characters",
    }),
  rows: z.coerce
    .number()
    .min(1, { message: "Rows must be at least 1" })
    .max(100, { message: "Rows cannot exceed 100" }),
  columns: z.coerce
    .number()
    .min(1, { message: "Columns must be at least 1" })
    .max(100, { message: "Columns cannot exceed 100" }),
});

function EditScreenForm({ screenInfo }: { screenInfo: ScreenProps | null }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<UpdatedScreenFormValues>({
    resolver: zodResolver(screenFormSchema),
    defaultValues: {
      name: "",
      rows: 10,
      columns: 10,
    },
  });

  useEffect(() => {
    if (screenInfo) {
      form.reset({
        name: screenInfo.name || "",
        rows: screenInfo.rows || 10,
        columns: screenInfo.columns || 10,
      });
    }
  }, [form, screenInfo]);

  async function onSubmit(data: UpdatedScreenFormValues) {
    try {
      setIsSubmitting(true);

      // Calculate capacity based on rows and columns
      const capacity = data.rows * data.columns;
      const updateData = {
        ...data,
        capacity,
      };

      const res = await axios.put(`/screen/${screenInfo?._id}`, updateData);

      if (res.data.success) {
        toast.success("Screen updated successfully!");
      } else {
        toast.error("Failed to update screen");
      }
    } catch (error: any) {
      console.error("Error updating screen:", error);
      toast.error(error.response?.data?.message || "Error updating screen");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleNumberChange = (value: string, field: any) => {
    const numericValue = value === "" ? "" : Number(value);
    field.onChange(numericValue);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-500">Edit Screen</h2>
      </div>

      {/* Display hall information (read-only) */}
      {screenInfo && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Hall Information</h3>
          <p className="text-sm">Hall: {screenInfo.hallId.name}</p>
          <p className="text-sm">
            Current Capacity: {screenInfo.capacity} seats
          </p>
          <p className="text-sm text-muted-foreground">
            Note: You cannot change the hall for this screen.
          </p>
        </div>
      )}

      <div>
        <div className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {/* Left Column */}
              <div className="space-y-6 md:space-y-4 md:gap-6">
                <TextInputField
                  name="name"
                  label="Screen Name"
                  placeholder="Enter screen name"
                  form={form}
                />

                <TextInputField
                  name="rows"
                  label="Rows"
                  placeholder="Enter number of rows"
                  type="number"
                  form={form}
                  onChangeOverride={handleNumberChange}
                />

                <TextInputField
                  name="columns"
                  label="Columns"
                  placeholder="Enter number of columns"
                  type="number"
                  form={form}
                  onChangeOverride={handleNumberChange}
                />

                {/* Display new capacity preview */}
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="text-sm font-medium">New Capacity Preview</p>
                  <p className="text-lg font-bold">
                    {form.watch("rows") * form.watch("columns")} seats
                  </p>
                  <p className="text-xs text-muted-foreground">
                    (Rows × Columns = Capacity)
                  </p>
                </div>

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Screen"}
                  </Button>
                </div>
              </div>

              {/* Right Column - Additional information */}
              <div className="space-y-4 md:gap-6">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Screen Guidelines</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Screen names should be descriptive</li>
                    <li>• Ensure rows and columns match physical layout</li>
                    <li>• Capacity is automatically calculated</li>
                    <li>• Changes affect future show scheduling</li>
                  </ul>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditScreenForm;
