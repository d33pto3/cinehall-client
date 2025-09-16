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
import { toast } from "react-toastify";
import { sleep } from "@/lib/sleep";
import { useNavigate } from "react-router-dom";

const showFormSchema = z.object({
  movieId: z.string().nonempty("Please select a movie"),
  hallId: z.string().nonempty("Please select a hall"),
  screenId: z.string().nonempty("Please select a screen"),
  date: z.string().nonempty("Please select a date"),
  slot: z.enum(["MORNING", "NOON", "AFTERNOON", "EVENING"]),
  basePrice: z.coerce.number().min(1, "Base price must be at least 1"),
});

type ShowFormValues = z.infer<typeof showFormSchema>;

interface Movie {
  _id: string;
  title: string;
}

interface Hall {
  _id: string;
  name: string;
}

interface Screen {
  _id: string;
  name: string;
}

export default function HallownerAddShowForm() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const form = useForm<ShowFormValues>({
    resolver: zodResolver(showFormSchema),
    defaultValues: {
      movieId: "",
      hallId: "",
      screenId: "",
      date: "",
      slot: "MORNING",
      basePrice: 100,
    },
  });

  useEffect(() => {
    const fetchMoviesAndHalls = async () => {
      try {
        const [moviesRes, hallsRes] = await Promise.all([
          axios.get("/movie"),
          axios.get("/hall/hallowner"),
        ]);
        setMovies(moviesRes.data.data || []);
        setHalls(hallsRes.data.data || []);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndHalls();
  }, []);

  // Fetch screens whenever hall changes
  useEffect(() => {
    const hallId = form.watch("hallId");
    if (!hallId) {
      setScreens([]);
      form.setValue("screenId", "");
      return;
    }

    const fetchScreens = async () => {
      try {
        const res = await axios.get(`/screen/hall/${hallId}`);
        setScreens(res.data.data || []);
        // reset selected screen if it no longer exists
        if (
          !res.data.data.find((s: Screen) => s._id === form.watch("screenId"))
        ) {
          form.setValue("screenId", "");
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to fetch screens");
      }
    };

    fetchScreens();
  }, [form.watch("hallId")]);

  const onSubmit = async (data: ShowFormValues) => {
    setSubmitLoading(true);
    try {
      const res = await axios.post("/show", data);
      await sleep(500);

      if (res.data.success) {
        toast.success(res.data.message);
        form.reset();
        navigate("/hallowner/shows");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full max-w-[800px]">
      <h1 className="text-4xl font-bold mb-4">Add Show</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Movie */}
          <FormField
            control={form.control}
            name="movieId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Movie</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a movie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Movies</SelectLabel>
                        {movies.length ? (
                          movies.map((m) => (
                            <SelectItem key={m._id} value={m._id}>
                              {m.title}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="none">
                            No movies found
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

          {/* Hall */}
          <FormField
            control={form.control}
            name="hallId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hall</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a hall" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Halls</SelectLabel>
                        {halls.length ? (
                          halls.map((h) => (
                            <SelectItem key={h._id} value={h._id}>
                              {h.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="none">
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

          {/* Screen */}
          <FormField
            control={form.control}
            name="screenId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Screen</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={!screens.length}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a screen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Screens</SelectLabel>
                        {screens.length ? (
                          screens.map((s) => (
                            <SelectItem key={s._id} value={s._id}>
                              {s.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="none">
                            No screens found
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

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slot */}
          <FormField
            control={form.control}
            name="slot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slot</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["MORNING", "NOON", "AFTERNOON", "EVENING"].map(
                          (slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          )
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
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
                <FormLabel>Base Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
              disabled={
                submitLoading ||
                !form.watch("movieId") ||
                !form.watch("hallId") ||
                !form.watch("screenId")
              }
            >
              {submitLoading ? "Adding Show..." : "Add Show"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
