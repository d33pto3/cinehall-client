import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  ticketId: z.string(),
});

export default function ViewTicketForm({
  ticketId,
  setIsOpen,
}: {
  ticketId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // const t = useTranslations("HallPage");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketId,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      navigate(`/admin/ticket/${ticketId}`);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
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
            Cancel
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={isLoading}
            className="w-full md:w-auto bg-black hover:bg-red-950"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Opening overview
              </>
            ) : (
              <span>View</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
