import MoviesTable from "@/components/admin/movies/MoviesTable";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function Movies() {
  useDocumentTitle("Movies");
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
