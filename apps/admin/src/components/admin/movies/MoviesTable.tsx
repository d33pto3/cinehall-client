import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import SearchActivity from "./SearchActivity";
import MoviesFilter from "./MoviesFilter";
import ListOfMovies from "./ListOfMovies";

export default function MoviesTable() {
  const [search, setSearch] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Movies</h1>
        <div className="flex mb-6 items-center">
          <div className="relative w-64 mr-2">
            <SearchActivity placeholder="Search..." onSearch={setSearch} />
          </div>

          <MoviesFilter onFilter={setCurrentFilters} />

          <Link
            to="/admin/movies/add-movie"
            className="flex items-center ml-auto"
          >
            <Button>
              <IoIosAddCircleOutline className="mr-2 w-4 h-4" />
              Add Movies
            </Button>
          </Link>
        </div>

        <div className="rounded-lg"></div>
        <ListOfMovies search={search} filters={currentFilters} />
      </div>
    </>
  );
}
