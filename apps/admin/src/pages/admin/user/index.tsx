import HallownerTable from "@/components/admin/users/HallownerTable";
import UserTable from "@/components/admin/users/UserTable";

function Users() {
  //   {
  //   searchParams,
  // }: {
  //   searchParams?: {
  //     query?: string;
  //     page?: string;
  //   };
  // }
  // const query = searchParams?.query || "";

  return (
    <div>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex flex-col gap-2">
          <UserTable />
          <HallownerTable />
        </div>
      </div>
    </div>
  );
}

export default Users;
