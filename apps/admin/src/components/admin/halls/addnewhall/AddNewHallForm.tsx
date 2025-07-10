import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { sleep } from "@/lib/sleep";

const hallFormSchema = z.object({
  name: z.string().min(1, {
    message: "Cannot be empty",
  }),
  address: z.string().min(1, {
    message: "Cannot be empty",
  }),
  ownerId: z.string().min(1, { message: "Please select a hallowner." }),
});

type HallFormValues = z.infer<typeof hallFormSchema>;

interface Owner {
  _id: string;
  username: string;
}

export default function AddNewHallForm() {
  const [hallOwnerList, setHallOwnerList] = useState<Owner[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const form = useForm<HallFormValues>({
    resolver: zodResolver(hallFormSchema),
    defaultValues: {
      name: "",
      address: "",
      ownerId: "",
    },
  });

  useEffect(() => {
    const fetchHallOwners = async () => {
      try {
        const response = await axios.get("/user?role=hallOwner");
        setHallOwnerList(response.data.data);
      } catch (error) {
        console.error("Error fetching hall owners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHallOwners();
  }, []);

  const onSubmit = async (hallInfo: HallFormValues) => {
    setSubmitLoading(true);
    try {
      const { data: res } = await axios.post("/hall", {
        ...hallInfo,
      });
      await sleep(700);

      if (res.success) {
        toast.success(res.message, {
          // theme: "colored",
        });
        // form.reset();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Add Hall</h1>
          <p className="text-muted-foreground">Fill out the form</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hall Name</FormLabel>
                      <FormControl>
                        <Input placeholder={"Enter hall name"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder={"Enter Address"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ownerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hallowner</FormLabel>
                      {loading ? (
                        <Skeleton className="h-10 w-full rounded-md" />
                      ) : (
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a hallowner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Hallowner List</SelectLabel>
                                {hallOwnerList.length > 0 ? (
                                  hallOwnerList.map((owner) => {
                                    return (
                                      <SelectItem
                                        key={owner._id}
                                        value={owner._id}
                                      >
                                        {owner.username}
                                      </SelectItem>
                                    );
                                  })
                                ) : (
                                  <SelectItem disabled value="">
                                    No owners found
                                  </SelectItem>
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full hover:cursor-pointer"
              disabled={submitLoading}
            >
              {submitLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
