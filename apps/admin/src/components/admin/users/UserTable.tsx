import SearchActivity from "../halls/SearchActivity";
import { useState } from "react";
import UserFilter from "./UserFilter";
import ListOfUsers from "./ListOfUsers";

function UserTable() {
  const [search, setSearch] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Users</h1>
        <div className="flex mb-6 items-center">
          <div className="relative w-64 mr-2">
            <SearchActivity placeholder="Search..." onSearch={setSearch} />
          </div>
          <UserFilter onFilter={setCurrentFilters} />
          {/* <Link
            to="/admin/halls/add-hall"
            className="flex items-center ml-auto"
          >
            <Button>
              <IoIosAddCircleOutline className="mr-2 w-4 h-4" />
              Add Users
            </Button>
          </Link> */}
        </div>
        <ListOfUsers search={search} filters={currentFilters} />
      </div>
    </>
  );
}

export default UserTable;
