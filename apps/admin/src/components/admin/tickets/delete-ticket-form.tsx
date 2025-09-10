import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "@/lib/axios";

const formSchema = z.object({
  ticketId: z.string(),
});

export default function DeleteTicketForm({
  ticketId,
  setIsOpen,
  onDeleted,
}: {
  ticketId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onDeleted?: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketId,
    },
  });
  // const t = useTranslations("ActivityPage");

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async () => {
    // const result = JSON.parse(await deleteActivityById(activityId));
    // if (result?.error?.message) {
    //     toast({title: t("FailedDeleteActivityMessageTitle")});
    // } else {
    //     toast({title: t("SuccessfullyDeleteActivityMessageTitle")});
    // }

    try {
      setIsOpen(false);
      const res = await axios.delete(`/ticket/${ticketId}`);
      console.log(res);
      if (res.data.success) {
        if (onDeleted) onDeleted();
      } else {
        // toast for error
      }
    } catch (error) {
      // toast for error - An error occured during deletion
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-4">
        <div className="w-full flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            disabled={isLoading}
            className="w-full md:w-auto"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            {/* {t("Cancel")} */}
            Cancel
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto bg-black hover:bg-rose-950"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting
              </>
            ) : (
              <span>
                {/* {t("Delete")} */}
                Delete
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
