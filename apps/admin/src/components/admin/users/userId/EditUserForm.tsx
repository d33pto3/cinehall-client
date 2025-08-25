import { TextInputField } from "@/components/common/TextInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserProps } from "./UserOverview";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";

type UpdatedUserFormValues = z.infer<typeof userFormSchema>;

export const userFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: "Username must be at least 4 characters" })
    .max(30, {
      message: "Username must not be longer than 30 characters",
    }),
  email: z.string({ required_error: "Please give an email" }),
  phone: z.string({ required_error: "Please give your phone number" }),
});

function EditUserForm({ userInfo }: { userInfo: UserProps | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UpdatedUserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        username: userInfo.username,
        email: userInfo.email,
        phone: userInfo.phone,
      });
    }
  }, [userInfo, form]);

  async function onSubmit(data: UpdatedUserFormValues) {
    if (!userInfo) return;

    setIsSubmitting(true);
    try {
      const res = await axios.put(`/user/${userInfo._id}`, data);

      if (res.data.success) {
        toast.success("User updated successfully!");
      } else {
        toast.error(res.data.message || "Failed to update user");
      }
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!userInfo) {
    return <div>User information not available</div>;
  }

  return (
    <>
      {" "}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text text-gray-500">
          {/* {activityDetailValue?.activity_title} */}
          Edit User
        </h2>
        {/* Here will go the created at date */}
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
                {/* Title */}
                <TextInputField
                  name="username"
                  //   label={t("Title")}
                  label="Username"
                  //   placeholder={t("Add title here")}
                  placeholder="Add Name here"
                  form={form}
                />
                <TextInputField
                  name="email"
                  //   label={t("Title")}
                  label="Email"
                  //   placeholder={t("Add title here")}
                  placeholder="Add Address here"
                  form={form}
                />
                <TextInputField
                  name="phone"
                  label="Phone"
                  form={form}
                  placeholder={"Add Phone Number here"}
                />
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update"}
                  </Button>
                </div>
                {/* Type, Date, Duration */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4"></div>
              </div>
              {/* Right Column */}
              <div className="space-y-4 md:gap-6"></div>
              {/* Submit Button */}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditUserForm;
