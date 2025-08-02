import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TSTable from "@/components/common/TSTable";
import axios from "../../../lib/axios";
import HallMoreAction from "./MoreAction";

interface Hall {
  _id: string;
  name: string;
  address: string;
  screens: number;
  owner: string;
}

interface Props {
  search: string;
  filters: {
    screens?: string[];
    owners?: string[];
    dateRange?: {
      from: Date | null;
      to: Date | null;
    };
  };
}

export default function ListOfHalls({ search, filters }: Props{ query }: { query: string }) {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(10); // items per page
  const [pageCount, setPageCount] = useState(0); // total number of pages

  console.log(halls);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await axios.get("/hall/admin", {
          params: { search: query },
        });
        setHalls(res.data.data);
      } catch (error) {
        console.error("Failed to fetch halls", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, [search, pageIndex, pageSize, filtersquery]);

  const columns: ColumnDef<Hall>[] = [
    {
      accessorKey: "name",
      header: "Hall Name",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "address",
      header: "Location",
      cell: ({ row }) => row.original.address,
    },
    {
      accessorKey: "screens",
      header: "Screens",
      cell: ({ row }) => row.original.screens,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => row.original.owner,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => <HallMoreAction hallId={row.original._id} />,
    },
  ];

  const table = useReactTable<Hall>({
    data: halls,
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

  if (loading) return <div>Loading...</div>;

  return (
    <TSTable<Hall>
      table={table}
      pagination={{
        pageIndex: pageIndex + 1,
        pageSize: pageCount,
      }}
    />
  );
}
