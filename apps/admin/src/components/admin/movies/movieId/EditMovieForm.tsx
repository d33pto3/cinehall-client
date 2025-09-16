import { TextInputField } from "@/components/common/TextInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MovieProps } from "./MovieOverview";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

type UpdatedMovieFormValues = z.infer<typeof movieFormSchema>;

export const movieFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(150, {
      message: "Title must not be longer than 100 characters",
    }),
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

function EditMovieForm({ movieInfo }: { movieInfo: MovieProps | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>("");

  const form = useForm<UpdatedMovieFormValues>({
    resolver: zodResolver(movieFormSchema),
    defaultValues: {
      title: "",
      duration: "",
      genre: "",
      releaseDate: "",
      director: "",
    },
  });

  // Function to delete image from Cloudinary
  const deleteImageFromCloudinary = async (): Promise<boolean> => {
    try {
      if (!movieInfo?.imageId) {
        console.warn("No imageId provided for deletion");
        return false;
      }

      const response = await fetch(
        "https://console.cloudinary.com/console/api/v1/operations/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            external_ids: [movieInfo.imageId],
          }),
        }
      );

      console.log(response);

      const result = await response.json();
      return result.result === "ok";
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      return false;
    }
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const imgData = new FormData();
    imgData.append("file", file);
    imgData.append("upload_preset", "cinehall");
    imgData.append("cloud_name", "dgrna1ki2");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dgrna1ki2/image/upload`,
      { method: "POST", body: imgData }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error(data.error?.message || "Image upload failed");
    }
    return data.secure_url;
  };

  async function onSubmit(data: UpdatedMovieFormValues) {
    setIsSubmitting(true);
    try {
      let imageUrl = currentImageUrl; // Start with current image URL

      // If a new image is selected, handle the image replacement
      if (selectedImage) {
        // Upload new image first
        const newImageUrl = await uploadImageToCloudinary(selectedImage);

        // If there was a previous image, delete it from Cloudinary
        if (currentImageUrl && currentImageUrl !== newImageUrl) {
          try {
            await deleteImageFromCloudinary();
            console.log("Old image deleted successfully");
          } catch (deleteError) {
            console.warn("Failed to delete old image:", deleteError);
            // Continue with the update even if deletion fails
          }
        }

        imageUrl = newImageUrl;
      }

      // Convert duration to number and prepare payload
      const payload = {
        ...data,
        duration: parseInt(data.duration),
        imageUrl,
      };

      // Update the movie using PUT request (since it's editing)
      const response = await axios.put(`/movie/${movieInfo?._id}`, payload);

      if (response.data.success) {
        toast.success("Movie updated successfully!");
        // Update current image URL if it was changed
        if (selectedImage) {
          setCurrentImageUrl(imageUrl);
          setSelectedImage(null);
        }
      } else {
        toast.error(response.data.message || "Failed to update movie");
      }
    } catch (error: any) {
      console.error("Update movie error:", error);

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

  useEffect(() => {
    if (movieInfo) {
      form.reset({
        title: movieInfo.title,
        duration: movieInfo.duration.toString(),
        genre: movieInfo.genre,
        releaseDate: movieInfo.releaseDate,
        director: movieInfo.director,
      });
      setCurrentImageUrl(movieInfo.imageUrl);
    }
  }, [movieInfo, form]);

  if (!movieInfo) {
    return <div>Movie information not available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-500">Edit Movie</h2>
      </div>

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
              placeholder="Enter Movie Title"
              form={form}
              autoComplete="off"
            />

            <TextInputField
              name="duration"
              label="Duration (minutes)"
              placeholder="Enter duration in minutes"
              form={form}
              type="number"
              autoComplete="off"
            />

            <TextInputField
              name="genre"
              label="Genre"
              placeholder="Enter genre (e.g., Action, Drama)"
              form={form}
              autoComplete="off"
            />

            <TextInputField
              name="releaseDate"
              label="Release Date"
              placeholder="YYYY-MM-DD"
              form={form}
              autoComplete="off"
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
              autoComplete="off"
            />

            <div>
              <Label>Current Image</Label>
              <img
                src={currentImageUrl || "/public/fallback_img.png"}
                alt={movieInfo.title}
                className="mt-2 rounded-lg border"
                style={{ height: "120px", width: "auto", objectFit: "cover" }}
              />
            </div>

            <div>
              <Label>Change Image</Label>
              <Input
                type="file"
                className="cursor-pointer mt-2"
                onChange={handleFileChange}
                accept="image/*"
              />
              {selectedImage && (
                <p className="text-sm text-green-600 mt-1">
                  New image selected: {selectedImage.name}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <Button
              type="submit"
              className="w-full md:w-auto relative"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Movie...
                </>
              ) : (
                "Update Movie"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EditMovieForm;
