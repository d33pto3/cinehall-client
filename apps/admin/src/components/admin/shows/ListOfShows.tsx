import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TSTable from "@/components/common/TSTable";
import axios from "@/lib/axios";
import ShowMoreAction from "./MoreAction";

interface Show {
  _id: string;
  movieId: {
    _id: string;
    title: string;
  };
  screenId: {
    _id: string;
    name: string;
  };
  startTime: number;
  endTime: string;
  basePrice: string;
}

// export default function ListOfHalls({ query }: { query: string }) {
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

export default function ListOfShows({ search, filters }: Props) {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(10); // items per page
  const [pageCount, setPageCount] = useState(0); // total number of pages

  console.log(shows);

  const fetchShows = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        search,
        page: pageIndex + 1,
        limit: pageSize,
      };

      if (filters.screens && filters.screens.length > 0) {
        params.screens = filters.screens.join(",");
      }

      if (filters.dateRange?.from)
        params.dateFrom = filters.dateRange.from.toISOString();

      if (filters.dateRange?.to)
        params.dateTo = filters.dateRange.to.toISOString();

      const res = await axios.get(`/show`, { params });
      setShows(res.data.data);
      setPageCount(res.data.pages); // from backend
    } catch (error) {
      console.error("Failed to fetch halls", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, [search, pageIndex, pageSize, filters]);

  const columns: ColumnDef<Show>[] = [
    {
      accessorKey: "_id",
      header: "Show Id",
      cell: ({ row }) => `${row.original._id.slice(0, 10)}...`,
    },
    {
      accessorKey: "movie",
      header: "Movie",
      cell: ({ row }) => row.original.movieId.title,
    },
    {
      accessorKey: "screen",
      header: "Screen",
      cell: ({ row }) => row.original.screenId.name,
    },
    {
      accessorKey: "start_time",
      header: "Start Time",
      cell: ({ row }) => {
        const date = new Date(row.original.startTime);
        return (
          <div className="flex flex-col">
            <span>{date.toLocaleDateString()}</span>
            <span className="text-sm text-gray-500">
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "end_time",
      header: "End Time",
      cell: ({ row }) => {
        const date = new Date(row.original.endTime);
        return (
          <div className="flex flex-col">
            <span>{date.toLocaleDateString()}</span>
            <span className="text-sm text-gray-500">
              {date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "base_price",
      header: "Base Price",
      cell: ({ row }) => row.original.basePrice,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <ShowMoreAction showId={row.original._id} onDeleted={fetchShows} />
      ),
    },
  ];

  const table = useReactTable<Show>({
    data: shows,
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
    <TSTable<Show>
      loading={loading}
      table={table}
      pagination={{
        pageIndex: pageIndex + 1,
        pageSize: pageCount,
      }}
    />
  );
}
