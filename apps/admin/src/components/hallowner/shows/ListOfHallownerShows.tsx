import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TSTable from "@/components/common/TSTable";
import axios from "@/lib/axios";
import ShowMoreAction from "./ShowMoreAction";

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
  startTime: string;
  endTime: string;
  basePrice: number;
}

interface Props {
  search: string;
  filters: {
    dateRange?: {
      from: Date | null;
      to: Date | null;
    };
  };
}

export default function ListOfHallownerShows({ search, filters }: Props) {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const fetchShows = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        search,
        page: pageIndex + 1,
        limit: pageSize,
      };

      if (filters.dateRange?.from)
        params.dateFrom = filters.dateRange.from.toISOString();
      if (filters.dateRange?.to)
        params.dateTo = filters.dateRange.to.toISOString();

      const res = await axios.get(`/show/hallowner`, { params });
      setShows(res.data.data);
      setPageCount(res.data.pages);
    } catch (error) {
      console.error("Failed to fetch shows", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, [search, pageIndex, pageSize, filters]);

  const columns: ColumnDef<Show>[] = [
    {
      accessorKey: "movieId",
      header: "Movie",
      cell: ({ row }) => row.original.movieId.title,
    },
    {
      accessorKey: "screenId",
      header: "Screen",
      cell: ({ row }) => row.original.screenId.name,
    },
    {
      accessorKey: "startTime",
      header: "Start Time",
      cell: ({ row }) => new Date(row.original.startTime).toLocaleString(),
    },
    {
      accessorKey: "endTime",
      header: "End Time",
      cell: ({ row }) => new Date(row.original.endTime).toLocaleString(),
    },
    {
      accessorKey: "basePrice",
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
    pageCount,
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
        pageSize,
      }}
    />
  );
}
