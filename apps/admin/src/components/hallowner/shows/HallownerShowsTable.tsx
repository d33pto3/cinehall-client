import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import ListOfHallownerShows from "./ListOfHallownerShows";
import SearchActivity from "./SearchActivity";
import ShowsFilter from "./ShowsFilter";

export default function HallownerShowsTable() {
  const [search, setSearch] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Shows</h1>
        <div className="flex mb-6 items-center">
          <div className="relative w-64 mr-2">
            <SearchActivity placeholder="Search..." onSearch={setSearch} />
          </div>

          <ShowsFilter onFilter={setCurrentFilters} />

          <Link
            to="/hallowner/screens/add-screen"
            className="flex items-center ml-auto"
          >
            <Button>
              <IoIosAddCircleOutline className="mr-2 w-4 h-4" />
              Add Shows
            </Button>
          </Link>
        </div>

        <div className="rounded-lg"></div>
        <ListOfHallownerShows search={search} filters={currentFilters} />
      </div>
    </>
  );
}
