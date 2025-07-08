import ListOfHalls from "./ListOfHalls";

export default function HallsTable() {
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
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">Halls</h1>
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
