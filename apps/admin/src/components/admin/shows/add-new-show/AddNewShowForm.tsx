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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { sleep } from "@/lib/sleep";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const showFormSchema = z.object({
  hallId: z.string().min(1, { message: "Please select a hall." }),
  screenId: z.string().min(1, { message: "Please select a screen." }),
  movieId: z.string().min(1, { message: "Please select a movie." }),
  startTime: z.date({ required_error: "Start time is required" }),
  endTime: z.date({ required_error: "End time is required" }),
  basePrice: z.coerce
    .number()
    .min(1, { message: "Base price must be at least 1" }),
});

type ShowFormValues = z.infer<typeof showFormSchema>;

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
  hallId: string;
}

export default function AddNewShowForm() {
  const [movieList, setMovieList] = useState<MovieProp[]>([]);
  const [hallList, setHallList] = useState<HallProp[]>([]);
  const [screenList, setScreenList] = useState<ScreenProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [screenLoading, setScreenLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const form = useForm<ShowFormValues>({
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

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch screens for selected hall
  const fetchScreensByHall = async (hallId: string) => {
    if (!hallId) {
      setScreenList([]);
      return;
    }

    setScreenLoading(true);
    try {
      const response = await axios.get(`/screen/hall/${hallId}`);
      setScreenList(response.data.data);
    } catch (error) {
      console.error("Error fetching screens:", error);
      toast.error("Failed to fetch screens for this hall");
      setScreenList([]);
    } finally {
      setScreenLoading(false);
    }
  };

  // Fetch screens when hall selection changes
  useEffect(() => {
    if (selectedHallId) {
      fetchScreensByHall(selectedHallId);
    } else {
      setScreenList([]);
      form.setValue("screenId", "");
    }
  }, [selectedHallId, form]);

  const onSubmit = async (data: ShowFormValues) => {
    setSubmitLoading(true);
    try {
      const payload = {
        ...data,
        startTime: data.startTime.toISOString(),
        endTime: data.endTime.toISOString(),
      };

      const { data: res } = await axios.post("/show", payload);
      await sleep(500);

      if (res.success) {
        toast.success(res.message);
        form.reset();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[1000px]">
      <h1 className="text-4xl font-bold mb-6">Add Show</h1>
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hall Selection */}
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
                            <SelectValue placeholder="Select a hall" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {hallList.length > 0 ? (
                                hallList.map((hall) => (
                                  <SelectItem key={hall._id} value={hall._id}>
                                    {hall.name}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem disabled value="no-halls">
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

              {/* Screen Selection */}
              <FormField
                control={form.control}
                name="screenId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Screen</FormLabel>
                    {screenLoading ? (
                      <Skeleton className="h-10 w-full rounded-md" />
                    ) : (
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={
                            !selectedHallId ||
                            screenList.length === 0 ||
                            screenLoading
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={
                                screenLoading
                                  ? "Loading screens..."
                                  : !selectedHallId
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
                              ) : null}
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
              <FormField
                control={form.control}
                name="movieId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Movie</FormLabel>
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
                            <SelectValue placeholder="Select a movie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {movieList.length > 0 ? (
                                movieList.map((movie) => (
                                  <SelectItem key={movie._id} value={movie._id}>
                                    {movie.title}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem disabled value="no-movies">
                                  No movies found
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

              {/* Base Price */}
              <FormField
                control={form.control}
                name="basePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter base price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum price for this show
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
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
                              <span>Pick a date and time</span>
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
                              <span>Pick a date and time</span>
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
            </div>

            <Button
              type="submit"
              className="w-full hover:cursor-pointer"
              disabled={submitLoading || !form.formState.isValid}
            >
              {submitLoading ? "Creating Show..." : "Create Show"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
