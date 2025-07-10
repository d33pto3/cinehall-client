import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LuFilter } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import SearchActivity from "../halls/SearchActivity";
import ListOfHalls from "../halls/ListOfHalls";

function HallownerTable() {
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">HallOwners</h1>
        <div className="flex mb-6 items-center">
          <div className="relative w-64 mr-2">
            <SearchActivity placeholder="Search..." />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center text-gray-400 mr-2"
              >
                <LuFilter className="mr-2 w-4 h-4" />
                Filter
              </Button>
            </SheetTrigger>
          </Sheet>
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
        <div className="rounded-lg overflow-hidden"></div>
        {/* <ListOfListings
                listing_tab_type="sell"
                query={query}
                filters={filterState}
                fetchTrigger={shouldFetchInvoices}
              /> */}
        <ListOfHalls />
      </div>
    </>
  );
}

export default HallownerTable;
