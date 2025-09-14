import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import ListOfHallownerScreens from "./ListOfHallownerScreen";
import SearchActivity from "./SearchActivity";
import ScreensFilter from "./ScreensFilter";

export default function HallownerScreensTable() {
  const [search, setSearch] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Screens</h1>
        <div className="flex mb-6 items-center">
          <div className="relative w-64 mr-2">
            <SearchActivity placeholder="Search..." onSearch={setSearch} />
          </div>

          <ScreensFilter onFilter={setCurrentFilters} />

          <Link
            to="/admin/screens/add-screen"
            className="flex items-center ml-auto"
          >
            <Button>
              <IoIosAddCircleOutline className="mr-2 w-4 h-4" />
              Add Screens
            </Button>
          </Link>
        </div>

        <div className="rounded-lg"></div>
        <ListOfHallownerScreens search={search} filters={currentFilters} />
      </div>
    </>
  );
}
