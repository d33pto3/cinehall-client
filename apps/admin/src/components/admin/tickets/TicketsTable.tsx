import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import SearchActivity from "./SearchActivity";
import TicketsFilter from "./TicketsFilter";
import ListOfTickets from "./ListOfTickets";

export default function TicketsTable() {
  const [search, setSearch] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Tickets</h1>
        <div className="flex mb-6 items-center">
          <div className="relative w-64 mr-2">
            <SearchActivity placeholder="Search..." onSearch={setSearch} />
          </div>

          <TicketsFilter onFilter={setCurrentFilters} />

          <Link
            to="/admin/shows/add-show"
            className="flex items-center ml-auto"
          >
            <Button>
              <IoIosAddCircleOutline className="mr-2 w-4 h-4" />
              Add Tickets
            </Button>
          </Link>
        </div>

        <div className="rounded-lg"></div>
        <ListOfTickets search={search} filters={currentFilters} />
      </div>
    </>
  );
}
