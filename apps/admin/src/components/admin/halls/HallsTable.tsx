import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import ListOfHalls from "./ListOfHalls";
import SearchActivity from "./SearchActivity";
import { Button } from "@/components/ui/button";
import { LuFilter } from "react-icons/lu";
import { Link } from "react-router-dom";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";

export default function HallsTable() {
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch contacts with their assigned users in a single query
  //       const contactsData = await readContacts("");
  //       setContacts(contactsData);

  //       // Fetch users
  //       const usersData = await readUsers();
  //       setUsers(usersData.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // async function onSubmit(data: FilterFormValues) {
  //   setFilterState(data);
  //   setShouldFetchInvoices((prev) => prev + 1);
  // }

  // const resetFilters = () => {
  //   form.reset(defaultValues);
  //   setFilterState(defaultValues);
  //   setShouldFetchInvoices((prev) => prev + 1);
  // };

  // console.log("filter", filterState);

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Halls</h1>
        <div className="flex mb-6 items-center">
          <div className="relative w-64 mr-2">
            <SearchActivity placeholder="Search..." onSearch={setSearchQuery} />
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
        <ListOfHalls query={searchQuery} />
      </div>
    </>
  );
}
