import { SelectField } from "@/components/common/SelectField";
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
import { getHalls } from "../../halls/actions";
import { HallProps } from "../../halls/hallId/HallOverview";

type UpdatedScreenFormValues = z.infer<typeof screenFormSchema>;

// Use coerce.number() to convert strings to numbers automatically
export const screenFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Screen name must be at least 4 characters" })
    .max(50, {
      message: "Screen name must not be longer than 30 characters",
    }),
  hall: z.string({ required_error: "Hall name must be given" }),
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
  const [halls, setHalls] = useState<HallProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const form = useForm<UpdatedScreenFormValues>({
    resolver: zodResolver(screenFormSchema),
    defaultValues: {
      name: "",
      hall: "",
      rows: 10,
      columns: 10,
    },
  });

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await getHalls();
        setHalls(res.halls);
      } catch (error) {
        console.log("Failed to fetch hall owners", error);
        toast.error("Failed to fetch halls");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHalls();
  }, []);

  useEffect(() => {
    if (screenInfo && halls.length > 0) {
      const hall = halls.find((hall) => hall._id === screenInfo.hallId._id);

      form.reset({
        name: screenInfo?.name || "",
        hall: hall?._id || "",
        rows: screenInfo?.rows || 10,
        columns: screenInfo?.columns || 10,
      });
    }
  }, [halls, form, screenInfo]);

  async function onSubmit(data: UpdatedScreenFormValues) {
    try {
      console.log("Submitting data:", data);

      const res = await axios.put(`/screen/${screenInfo?._id}`, data);

      if (res.data.success) {
        toast.success("Screen updated successfully!");
      } else {
        toast.error("Failed to update screen");
      }
    } catch (error) {
      console.error("Error updating screen:", error);
      toast.error("Error updating screen");
    }
  }

  // Handle number input changes properly
  const handleNumberChange = (value: string, field: any) => {
    // Convert to number if not empty, otherwise set to empty string for validation
    const numericValue = value === "" ? "" : Number(value);
    field.onChange(numericValue);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-500">Edit Screen</h2>
      </div>
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
                  label="Name"
                  placeholder="Add Screen Name here"
                  form={form}
                />

                <SelectField
                  name="hall"
                  label="Hall"
                  form={form}
                  formItemClassName="flex flex-col"
                  options={halls.map((hall) => ({
                    value: hall._id,
                    label: hall.name,
                  }))}
                  placeholder="Select a hall"
                />

                {/* Use the custom handler for number inputs */}
                <TextInputField
                  name="rows"
                  label="Rows"
                  placeholder="Add Rows Here"
                  type="number"
                  form={form}
                  onChangeOverride={handleNumberChange}
                />

                <TextInputField
                  name="columns"
                  label="Columns"
                  placeholder="Add Columns here"
                  type="number"
                  form={form}
                  onChangeOverride={handleNumberChange}
                />

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Updating..." : "Update"}
                  </Button>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4 md:gap-6">
                {/* You can add additional form fields here if needed */}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditScreenForm;
