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
import { ShowProps } from "./ShowOverview";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UpdatedShowFormValues = z.infer<typeof showFormSchema>;

export const showFormSchema = z.object({
  hallId: z.string().min(1, { message: "Please select a hall." }),
  screenId: z.string().min(1, { message: "Please select a screen." }),
  movieId: z.string().min(1, { message: "Please select a movie." }),
  startTime: z.date({ required_error: "Start time is required" }),
  endTime: z.date({ required_error: "End time is required" }),
  basePrice: z.coerce
    .number()
    .min(1, { message: "Base price must be at least 1" }),
});

interface MovieProp {
  _id: string;
  title: string;
}

interface HallProp {
  _id: string;
  name: string;
}

interface ScreenProp {
  _id: string;
  name: string;
}

function EditShowForm({ showInfo }: { showInfo: ShowProps | null }) {
  console.log(showInfo);

  const [movieList, setMovieList] = useState<MovieProp[]>([]);
  const [hallList, setHallList] = useState<HallProp[]>([]);
  const [screenList, setScreenList] = useState<ScreenProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [screenLoading, setScreenLoading] = useState<boolean>(false);

  const form = useForm<UpdatedShowFormValues>({
    resolver: zodResolver(showFormSchema),
    defaultValues: {
      hallId: "",
      screenId: "",
      movieId: "",
      startTime: undefined,
      endTime: undefined,
      basePrice: 10,
    },
  });

  const selectedHallId = form.watch("hallId");

  // Fetch initial data (movies and halls)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [moviesResponse, hallsResponse] = await Promise.all([
          axios.get("/movie"),
          axios.get("/hall"),
        ]);

        setMovieList(moviesResponse.data.data);
        setHallList(hallsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch screens when hall selection changes
  useEffect(() => {
    const fetchScreensByHall = async () => {
      if (!selectedHallId) {
        setScreenList([]);
        form.setValue("screenId", "");
        return;
      }

      setScreenLoading(true);
      try {
        const response = await axios.get(`/screen/hall/${selectedHallId}`);
        setScreenList(response.data.data);
      } catch (error) {
        console.error("Error fetching screens:", error);
        toast.error("Failed to fetch screens for this hall");
        setScreenList([]);
      } finally {
        setScreenLoading(false);
      }
    };

    fetchScreensByHall();
  }, [selectedHallId, form]);

  // Set initial form values when data is loaded
  useEffect(() => {
    if (showInfo && movieList.length > 0 && hallList.length > 0) {
      form.reset({
        hallId: showInfo.hallId || "",
        screenId: showInfo.screenId || "",
        movieId: showInfo.movieId || "",
        startTime: new Date(showInfo.startTime),
        endTime: new Date(showInfo.endTime),
        basePrice: showInfo.basePrice || 10,
      });

      // Fetch screens for the initial hall
      if (showInfo.hallId) {
        const fetchInitialScreens = async () => {
          setScreenLoading(true);
          try {
            const response = await axios.get(`/screen/hall/${showInfo.hallId}`);
            setScreenList(response.data.data);
          } catch (error) {
            console.error("Error fetching initial screens:", error);
            toast.error("Failed to fetch screens");
          } finally {
            setScreenLoading(false);
          }
        };
        fetchInitialScreens();
      }
    }
  }, [showInfo, movieList, hallList, form]);

  async function onSubmit(data: UpdatedShowFormValues) {
    try {
      const payload = {
        ...data,
        startTime: data.startTime.toISOString(),
        endTime: data.endTime.toISOString(),
      };

      const res = await axios.put(`/show/${showInfo?._id}`, payload);

      if (res.data.success) {
        toast.success("Show updated successfully!");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-500">Edit Show</h2>
      </div>
      <div>
        <div className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {/* Hall Selection */}
              <SelectField
                name="hallId"
                label="Hall"
                form={form}
                formItemClassName="flex flex-col"
                options={hallList.map((hall) => ({
                  value: hall._id,
                  label: hall.name,
                }))}
                placeholder="Select a hall"
              />

              {/* Screen Selection */}
              <FormField
                control={form.control}
                name="screenId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Screen</FormLabel>
                    {screenLoading ? (
                      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        Loading screens...
                      </div>
                    ) : (
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={!selectedHallId || screenList.length === 0}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                !selectedHallId
                                  ? "Select a hall first"
                                  : screenList.length === 0
                                  ? "No screens available"
                                  : "Select a screen"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {screenList.length > 0 ? (
                                screenList.map((screen) => (
                                  <SelectItem
                                    key={screen._id}
                                    value={screen._id}
                                  >
                                    {screen.name}
                                  </SelectItem>
                                ))
                              ) : selectedHallId ? (
                                <SelectItem disabled value="no-screens">
                                  No screens found for this hall
                                </SelectItem>
                              ) : (
                                <SelectItem disabled value="select-hall-first">
                                  Select a hall first
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

              {/* Movie Selection */}
              <SelectField
                name="movieId"
                label="Movie"
                form={form}
                formItemClassName="flex flex-col"
                options={movieList.map((movie) => ({
                  value: movie._id,
                  label: movie.title,
                }))}
                placeholder="Select a movie"
              />

              {/* Start Time */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP HH:mm")
                            ) : (
                              <span>Pick start date and time</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <Input
                            type="time"
                            value={
                              field.value ? format(field.value, "HH:mm") : ""
                            }
                            onChange={(e) => {
                              const time = e.target.value;
                              if (field.value && time) {
                                const [hours, minutes] = time.split(":");
                                const newDate = new Date(field.value);
                                newDate.setHours(parseInt(hours));
                                newDate.setMinutes(parseInt(minutes));
                                field.onChange(newDate);
                              }
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Time */}
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP HH:mm")
                            ) : (
                              <span>Pick end date and time</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                        <div className="p-3 border-t border-border">
                          <Input
                            type="time"
                            value={
                              field.value ? format(field.value, "HH:mm") : ""
                            }
                            onChange={(e) => {
                              const time = e.target.value;
                              if (field.value && time) {
                                const [hours, minutes] = time.split(":");
                                const newDate = new Date(field.value);
                                newDate.setHours(parseInt(hours));
                                newDate.setMinutes(parseInt(minutes));
                                field.onChange(newDate);
                              }
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Base Price */}
              <TextInputField
                name="basePrice"
                label="Base Price"
                placeholder="Enter base price"
                type="number"
                form={form}
              />

              <div className="md:col-span-2">
                <Button type="submit" className="w-full">
                  Update Show
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default EditShowForm;
