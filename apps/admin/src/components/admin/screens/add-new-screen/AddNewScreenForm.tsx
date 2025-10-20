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

const screenFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Cannot be empty",
    })
    .max(50, {
      message: "Cannot be larger than 50 characters",
    }),
  hallId: z.string({
    required_error: "Hall cannot be null",
  }),
  rows: z
    .number()
    .min(10, {
      message: "Rows cannot be less than 10",
    })
    .max(100, {
      message: "Rows cannot be more than 100",
    }),
  columns: z
    .number()
    .min(10, {
      message: "Columns cannot be less than 10",
    })
    .max(100, {
      message: "Columns cannot be more than 100",
    }),
});

type ScreenFormValues = z.infer<typeof screenFormSchema>;

interface Hall {
  _id: string;
  name: string;
}

export default function AddNewScreenForm() {
  const [hallList, setHallList] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const form = useForm<ScreenFormValues>({
    resolver: zodResolver(screenFormSchema),
    defaultValues: {
      name: "",
      hallId: "",
      rows: 10,
      columns: 10,
    },
  });

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axios.get("/hall");
        setHallList(response.data.data);
      } catch (error) {
        console.error("Error fetching hall owners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

  const onSubmit = async (screenInfo: ScreenFormValues) => {
    setSubmitLoading(true);
    try {
      const { data: res } = await axios.post("/screen", {
        ...screenInfo,
      });
      await sleep(500);

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
    <div className="w-full max-w-[1000px]">
      <h1 className="text-4xl font-bold mb-6">Add Screen</h1>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Screen Name</FormLabel>
                      <FormControl>
                        <Input placeholder={"Enter hall name"} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="hallId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hall</FormLabel>
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
                                <SelectLabel>Halls List</SelectLabel>
                                {hallList.length > 0 ? (
                                  hallList.map((hall) => {
                                    return (
                                      <SelectItem
                                        key={hall._id}
                                        value={hall._id}
                                      >
                                        {hall.name}
                                      </SelectItem>
                                    );
                                  })
                                ) : (
                                  <SelectItem disabled value="">
                                    No halls found
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

            <FormField
              control={form.control}
              name="rows"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rows</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter number of rows"}
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="columns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Columns</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter number of columns"}
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
