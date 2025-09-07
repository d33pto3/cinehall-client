import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import SearchActivity from "../halls/SearchActivity";
import { useState } from "react";
import HallownerFilter from "./HallownerFilter";
import ListOfHallowners from "./ListOfHallowners";

function HallownerTable() {
  const [search, setSearch] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">HallOwners</h1>
        <div className="flex mb-6 items-center">
          <div className="relative w-64 mr-2">
            <SearchActivity placeholder="Search..." onSearch={setSearch} />
          </div>
          <HallownerFilter onFilter={setCurrentFilters} />
          <Link
            to="/admin/users/add-hallowner"
            className="flex items-center ml-auto"
          >
            <Button>
              <IoIosAddCircleOutline className="mr-2 w-4 h-4" />
              Add Hallowners
            </Button>
          </Link>
        </div>
        <div className="rounded-lg overflow-hidden"></div>
        <ListOfHallowners search={search} filters={currentFilters} />
      </div>
    </>
  );
}

export default HallownerTable;
