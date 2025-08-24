import { SelectField } from "@/components/common/SelectField";
import { TextInputField } from "@/components/common/TextInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { HallProps } from "./HallOverview";
import { getUsersByRole } from "../../users/actions";
import { useEffect, useState } from "react";
import { User } from "../../users/ListOfUsers";

type UpdatedHallFormValues = z.infer<typeof hallFormSchema>;

export const hallFormSchema = z.object({
  hall_title: z
    .string()
    .min(4, { message: "Title name must be at least 4 characters" })
    .max(30, {
      message: "Title name must not be longer than 30 characters",
    }),
  address: z.string({ required_error: "Please give an address" }),
  hallowner: z.string({ required_error: "Please select a hallowner" }),
});

function EditHallForm({ hallInfo }: { hallInfo: HallProps | null }) {
  const [hallOwners, setHallOwners] = useState<User[]>([]);

  const defaultValues = {
    hall_title: hallInfo?.name || "",
    address: hallInfo?.address || "",
    hallowner: hallInfo?.ownerId || "",
  };

  const form = useForm<UpdatedHallFormValues>({
    resolver: zodResolver(hallFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (hallInfo) {
      form.reset({
        hall_title: hallInfo.name,
        address: hallInfo.address,
        hallowner: hallInfo.ownerId,
      });
    }
  }, [hallInfo]);

  useEffect(() => {
    const getHallOwners = async () => {
      const res = await getUsersByRole("hallOwner");

      setHallOwners(res.users);
    };

    getHallOwners();
  }, []);

  //   console.log(hallInfo);

  async function onSubmit(data: UpdatedHallFormValues) {
    console.log("Updating Halls: ", data);
  }

  return (
    <>
      {" "}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text text-gray-500">
          {/* {activityDetailValue?.activity_title} */}
          Edit Hall
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
                  name="hall_title"
                  //   label={t("Title")}
                  label="Title"
                  //   placeholder={t("Add title here")}
                  placeholder="Add title here"
                  form={form}
                />
                <TextInputField
                  name="address"
                  //   label={t("Title")}
                  label="Address"
                  //   placeholder={t("Add title here")}
                  placeholder="Add Address here"
                  form={form}
                />
                <SelectField
                  name="hallowner"
                  label="Hallowner"
                  form={form}
                  formItemClassName="flex flex-col"
                  options={hallOwners.map((ho) => ({
                    value: ho._id,
                    label: ho.username,
                  }))}
                  placeholder={"Select a hallowner"}
                />
                <div className="md:col-span-2">
                  <Button type="submit" className="w-full">
                    {/* {t("UpdateButton")} */}
                    Update
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

export default EditHallForm;
