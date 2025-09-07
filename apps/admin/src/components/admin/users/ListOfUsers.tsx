import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TSTable from "@/components/common/TSTable";
import UserMoreAction from "./UserMoreAction";
import { getUsersByRole } from "./actions";

export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
}

// export default function ListOfUsers({ query }: { query: string }) {
interface Props {
  search: string;
  filters: {
    dateRange?: {
      from: Date | null;
      to: Date | null;
    };
  };
}

export default function ListOfUsers({ search, filters }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(5); // items per page
  const [pageCount, setPageCount] = useState(0); // total number of pages

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const params: Record<string, any> = {
          search,
          page: pageIndex + 1,
          limit: pageSize,
        };

        // if (filters.screens && filters.screens.length > 0) {
        //   params.screens = filters.screens.join(",");
        // }

        // if (filters.dateRange?.from)
        //   params.dateFrom = filters.dateRange.from.toISOString();

        // if (filters.dateRange?.to)
        //   params.dateTo = filters.dateRange.to.toISOString();

        const res = await getUsersByRole("user", params);
        setUsers(res.users);
        setPageCount(res.pages); // from backend
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search, pageIndex, pageSize, filters]);

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "User Name",
      cell: ({ row }) => row.original.username,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.original.phone,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <UserMoreAction userId={row.original._id} />,
    },
  ];

  const table = useReactTable<User>({
    data: users,
    columns,
    pageCount, // needed for manual pagination
    manualPagination: true,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(next.pageIndex);
      setPageSize(next.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TSTable<User>
      loading={loading}
      table={table}
      pagination={{
        pageIndex: pageIndex + 1,
        pageSize: pageCount,
      }}
    />
  );
}
