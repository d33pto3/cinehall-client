// EditShowForm.tsx
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";

import { ShowProps } from "./ShowOverview";

export const showFormSchema = z.object({
  movieId: z.string().nonempty("Select a movie"),
  screenId: z.string().nonempty("Select a screen"),
  date: z.string().nonempty("Select date"),
  slot: z.enum(["MORNING", "NOON", "AFTERNOON", "EVENING"]),
  basePrice: z.coerce.number().min(1, "Base price must be at least 1"),
});

type UpdatedShowFormValues = z.infer<typeof showFormSchema>;

function EditShowForm({ showInfo }: { showInfo: ShowProps | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [movies, setMovies] = useState<{ _id: string; title: string }[]>([]);
  const [screens, setScreens] = useState<{ _id: string; name: string }[]>([]);

  const form = useForm<UpdatedShowFormValues>({
    resolver: zodResolver(showFormSchema),
    defaultValues: {
      movieId: "",
      screenId: "",
      date: "",
      slot: "MORNING",
      basePrice: 0,
    },
  });

  useEffect(() => {
    // Fetch movies and screens
    const fetchData = async () => {
      const movieRes = await axios.get("/movie");
      setMovies(movieRes.data.data || []);

      const screenRes = await axios.get("/screen/hallowner");
      setScreens(screenRes.data.data || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showInfo) {
      form.reset({
        movieId: showInfo.movieId._id,
        screenId: showInfo.screenId._id,
        date: new Date(showInfo.startTime).toISOString().slice(0, 10), // yyyy-mm-dd
        slot: "MORNING", // Optional: convert startTime to closest slot
        basePrice: showInfo.basePrice,
      });
    }
  }, [showInfo, form]);

  const onSubmit = async (data: UpdatedShowFormValues) => {
    try {
      setIsSubmitting(true);
      const res = await axios.put(`/show/hallowner/${showInfo?._id}`, data);
      if (res.data.success) toast.success("Show updated successfully!");
      else toast.error("Failed to update show");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error updating show");
    } finally {
      setIsSubmitting(false);
    }
  };

  //   TODO: The screen select is not working

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Edit Show</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2"
        >
          {/* Movie Select */}
          <div>
            <label className="block mb-1 font-medium">Movie</label>
            <select
              {...form.register("movieId")}
              className="w-full border rounded p-2"
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>

          {/* Screen Select */}
          <div>
            <label className="block mb-1 font-medium">Screen</label>
            <select
              {...form.register("screenId")}
              className="w-full border rounded p-2"
            >
              <option value="">Select a screen</option>
              {screens.map((screen) => (
                <option key={screen._id} value={screen._id}>
                  {screen.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1 font-medium">Date</label>
            <input
              type="date"
              {...form.register("date")}
              className="w-full border rounded p-2"
            />
          </div>

          {/* Slot */}
          <div>
            <label className="block mb-1 font-medium">Slot</label>
            <select
              {...form.register("slot")}
              className="w-full border rounded p-2"
            >
              <option value="MORNING">Morning (10:00)</option>
              <option value="NOON">Noon (13:00)</option>
              <option value="AFTERNOON">Afternoon (16:00)</option>
              <option value="EVENING">Evening (19:00)</option>
            </select>
          </div>

          {/* Base Price */}
          <div>
            <label className="block mb-1 font-medium">Base Price</label>
            <input
              type="number"
              {...form.register("basePrice")}
              min={1}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Show"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EditShowForm;
