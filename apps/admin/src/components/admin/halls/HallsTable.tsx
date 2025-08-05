import ListOfHalls from "./ListOfHalls";
import SearchActivity from "./SearchActivity";
import HallsFilter from "./HallsFilter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";

export default function HallsTable() {
  const [search, setSearch] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Halls</h1>
        <div className="flex mb-6 items-center">
          <div className="relative w-64 mr-2">
            <SearchActivity placeholder="Search..." onSearch={setSearch} />
          </div>

          <HallsFilter onFilter={setCurrentFilters} />

          <Link
            to="/admin/halls/add-hall"
            className="flex items-center ml-auto"
          >
            <Button>
              <IoIosAddCircleOutline className="mr-2 w-4 h-4" />
              Add Halls
            </Button>
          </Link>
        </div>

        <div className="rounded-lg"></div>
        <ListOfHalls search={search} filters={currentFilters} />
      </div>
    </>
  );
}
