import { TextInputField } from "@/components/common/TextInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// Schema for movie creation
export const movieFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(100, { message: "Title must not be longer than 100 characters" }),
  duration: z
    .string()
    .min(1, { message: "Duration is required" })
    .regex(/^\d+$/, { message: "Duration must be a number in minutes" }),
  genre: z
    .string()
    .min(2, { message: "Genre must be at least 2 characters" })
    .max(50, { message: "Genre must not be longer than 50 characters" }),
  releaseDate: z
    .string()
    .min(1, { message: "Release date is required" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, {
      message: "Release date must be in YYYY-MM-DD format",
    }),
  director: z
    .string()
    .min(2, { message: "Director name must be at least 2 characters" })
    .max(50, {
      message: "Director name must not be longer than 50 characters",
    }),
});

type MovieFormValues = z.infer<typeof movieFormSchema>;

interface AddMovieFormProps {
  onSuccess?: () => void;
}

function AddMovieForm({ onSuccess }: AddMovieFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<MovieFormValues>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      title: "",
      duration: "",
      genre: "",
      releaseDate: "",
      director: "",
      // imageUrl: "",
    },
  });

  async function onSubmit(data: MovieFormValues) {
    setIsSubmitting(true);
    try {
      let imageUrl = ""; // Initialize image URL

      // Upload image to Cloudinary if selected
      if (selectedImage) {
        const imgData = new FormData();
        imgData.append("file", selectedImage);
        imgData.append("upload_preset", "cinehall");
        imgData.append("cloud_name", "dgrna1ki2");

        const imgUploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dgrna1ki2/image/upload`,
          { method: "POST", body: imgData }
        );

        const imgUploadData = await imgUploadResponse.json();
        imageUrl = imgUploadData.url;
      } else {
        toast.error("Please select an image");
        setIsSubmitting(false);
        return;
      }

      // Convert duration to number and prepare payload
      const payload = {
        ...data,
        duration: parseInt(data.duration),
        imageUrl,
      };

      // Create the movie
      const response = await axios.post("/movie", payload);

      if (response.data.success) {
        toast.success("Movie created successfully!");
        if (onSuccess) onSuccess();
      } else {
        toast.error(response.data.message || "Failed to create movie");
      }
    } catch (error: any) {
      console.error("Create movie error:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        Object.keys(errors).forEach((key) => {
          toast.error(errors[key]);
        });
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setSelectedImage(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Add New Movie</h1>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden">
        <div className="space-y-6 px-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {/* Movie Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Movie Information
                </h3>

                <TextInputField
                  name="title"
                  label="Movie Title"
                  placeholder="Enter movie title"
                  form={form}
                  isDisabled={isSubmitting}
                  autoComplete="off"
                />

                <TextInputField
                  name="duration"
                  label="Duration (minutes)"
                  placeholder="Enter duration in minutes"
                  form={form}
                  type="number"
                  isDisabled={isSubmitting}
                  //   autoComplete="off"
                />

                <TextInputField
                  name="genre"
                  label="Genre"
                  placeholder="Enter genre (e.g., Action, Drama)"
                  form={form}
                  isDisabled={isSubmitting}
                  //   autoComplete="off"
                />

                <TextInputField
                  name="releaseDate"
                  label="Release Date"
                  placeholder="YYYY-MM-DD"
                  form={form}
                  isDisabled={isSubmitting}
                  //   autoComplete="off"
                />
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Additional Information
                </h3>

                <TextInputField
                  name="director"
                  label="Director"
                  placeholder="Enter director's name"
                  form={form}
                  isDisabled={isSubmitting}
                  //   autoComplete="off"
                />

                {/* <TextInputField
                  name="imageUrl"
                  label="Image URL"
                  placeholder="Enter movie poster URL"
                  form={form}
                  isDisabled={isSubmitting}
                  //   autoComplete="off"
                /> */}
                <Label>Upload Image</Label>
                <Input
                  type="file"
                  className="cursor-pointer"
                  onChange={handleFileChange}
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <Button
                  type="submit"
                  className="flex items-center space-between w-[50%] relative"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Movie...
                    </>
                  ) : (
                    "Create Movie"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddMovieForm;
