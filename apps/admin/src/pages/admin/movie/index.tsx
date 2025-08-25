import MoviesTable from "@/components/admin/movies/MoviesTable";

function Movies() {
  return (
    <div>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex gap-2">
          <MoviesTable
          //  query={query}
          />
        </div>
      </div>
    </div>
  );
}

export default Movies;
