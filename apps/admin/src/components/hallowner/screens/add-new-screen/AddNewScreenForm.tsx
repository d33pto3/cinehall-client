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
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { sleep } from "@/lib/sleep";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation

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
    required_error: "Please select a hall",
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

export default function HallOwnerAddScreenForm() {
  const navigate = useNavigate();
  const location = useLocation(); // Get location to access state
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);

  // Get hallId from location state if available
  const hallIdFromState = location.state?.hallId || "";

  const form = useForm<ScreenFormValues>({
    resolver: zodResolver(screenFormSchema),
    defaultValues: {
      name: "",
      hallId: hallIdFromState, // Pre-fill if hallId provided in state
      rows: 10,
      columns: 10,
    },
  });

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await axios.get("/hall/hallowner");
        setHalls(response.data.data);

        // If hallId is provided in state, validate it and set selected hall
        if (hallIdFromState) {
          const hallFromState = response.data.data.find(
            (hall: Hall) => hall._id === hallIdFromState
          );
          if (hallFromState) {
            setSelectedHall(hallFromState);
            form.setValue("hallId", hallIdFromState);
          } else {
            toast.error("Invalid hall selected");
            form.setValue("hallId", "");
          }
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch halls");
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, [hallIdFromState, form]);

  const onSubmit = async (screenInfo: ScreenFormValues) => {
    setSubmitLoading(true);
    try {
      const { data: res } = await axios.post(
        `/screen/hall/${screenInfo.hallId}`,
        {
          name: screenInfo.name,
          capacity: screenInfo.rows * screenInfo.columns,
          rows: screenInfo.rows,
          columns: screenInfo.columns,
        }
      );

      await sleep(500);

      if (res.success) {
        toast.success(res.message);
        form.reset();

        // Redirect based on how user arrived
        if (hallIdFromState) {
          navigate(`/hallowner/halls/${hallIdFromState}`);
        } else {
          navigate("/hallowner/screens");
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleHallChange = (value: string) => {
    form.setValue("hallId", value);
    const hall = halls.find((h) => h._id === value);
    setSelectedHall(hall || null);
  };

  if (loading) {
    return (
      <div className="w-full max-w-[1000px]">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1000px]">
      <h1 className="text-4xl font-bold mb-2">Add Screen</h1>

      {hallIdFromState && selectedHall ? (
        <p className="text-muted-foreground mb-6">
          Adding screen to: <strong>{selectedHall.name}</strong>
        </p>
      ) : (
        <p className="text-muted-foreground mb-6">
          Select a hall to add a screen
        </p>
      )}

      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                {/* Always show the hall selection dropdown */}
                <FormField
                  control={form.control}
                  name="hallId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Hall</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={handleHallChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a hall" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Your Halls</SelectLabel>
                              {halls.length > 0 ? (
                                halls.map((hall) => (
                                  <SelectItem key={hall._id} value={hall._id}>
                                    {hall.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem disabled value="">
                                  No halls found
                                </SelectItem>
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Screen Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter screen name" {...field} />
                      </FormControl>
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
                      placeholder="Enter number of rows"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
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
                      placeholder="Enter number of columns"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={submitLoading || !form.watch("hallId")}
              >
                {submitLoading ? "Adding Screen..." : "Add Screen"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
