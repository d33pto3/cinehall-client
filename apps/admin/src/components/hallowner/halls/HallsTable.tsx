import { useState } from "react";
import HallsFilter from "./HallsFilter";
import SearchActivity from "./SearchActivity";
import ListOfHalls from "./ListOfHalls";

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
        </div>

        <div className="rounded-lg"></div>
        <ListOfHalls search={search} filters={currentFilters} />
      </div>
    </>
  );
}
