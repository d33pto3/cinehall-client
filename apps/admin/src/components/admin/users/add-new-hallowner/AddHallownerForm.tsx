import { TextInputField } from "@/components/common/TextInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// Schema for hall owner creation
export const hallOwnerFormSchema = z
  .object({
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters" })
      .max(30, {
        message: "Username must not be longer than 30 characters",
      }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(50, { message: "Password must not be longer than 50 characters" }),
    confirmPassword: z.string(),
    hallName: z
      .string()
      .min(2, { message: "Hall name must be at least 2 characters" })
      .max(50, { message: "Hall name must not be longer than 50 characters" }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type HallOwnerFormValues = z.infer<typeof hallOwnerFormSchema>;

interface AddHallOwnerFormProps {
  onSuccess?: () => void;
}

function AddHallOwnerForm({ onSuccess }: AddHallOwnerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HallOwnerFormValues>({
    resolver: zodResolver(hallOwnerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      hallName: "",
      address: "",
    },
  });

  async function onSubmit(data: HallOwnerFormValues) {
    setIsSubmitting(true);
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...hallOwnerData } = data;

      // Add role to the data
      const payload = {
        ...hallOwnerData,
        role: "hallOwner", // Set the role to hallOwner
      };

      const res = await axios.post("/user", payload);

      if (res.data.success) {
        toast.success("Hall owner created successfully!");
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.data.message || "Failed to create hall owner");
      }
    } catch (error: any) {
      console.error("Create hall owner error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key]);
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Add New Hall Owner</h1>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden">
        <div className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {/* User Information */}
              <div className="space-y-4 pl-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  Hallowner Information
                </h3>

                <TextInputField
                  name="username"
                  label="Username"
                  placeholder="Enter username"
                  form={form}
                  isDisabled={isSubmitting}
                />

                <TextInputField
                  name="email"
                  label="Email"
                  placeholder="Enter email address"
                  form={form}
                  type="email"
                  isDisabled={isSubmitting}
                  autoComplete="email"
                />

                <TextInputField
                  name="phone"
                  label="Phone"
                  placeholder="Enter phone number"
                  form={form}
                  type="tel"
                  isDisabled={isSubmitting}
                />

                <TextInputField
                  name="password"
                  label="Password"
                  placeholder="Enter password"
                  form={form}
                  type="password"
                  isDisabled={isSubmitting}
                />

                <TextInputField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  form={form}
                  type="password"
                  isDisabled={isSubmitting}
                />

                <Button
                  type="submit"
                  className="w-full relative"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Hall Owner...
                    </>
                  ) : (
                    "Create Hall Owner"
                  )}
                </Button>
              </div>

              <div className="md:col-span-2 pt-4"></div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddHallOwnerForm;
