import AddNewMovieForm from "@/components/admin/movies/add-new-movie/AddNewMovieForm";

export default function AddMovie() {
  return (
    <>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex justify-center gap-2">
          <AddNewMovieForm />
        </div>
      </div>
    </>
  );
}
