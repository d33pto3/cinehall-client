import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TSTable from "@/components/common/TSTable";
import axios from "@/lib/axios";
import ScreenMoreAction from "./ScreenMoreAction";

interface Screen {
  _id: string;
  name: string;
  hallId: {
    _id: string;
    name: string;
  };
  rows: number;
  columns: number;
  capacity: number;
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

export default function ListOfScreens({ search, filters }: Props) {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(10); // items per page
  const [pageCount, setPageCount] = useState(0); // total number of pages

  const fetchScreens = async () => {
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

      const res = await axios.get(`/screen`, { params });
      setScreens(res.data.data);
      setPageCount(res.data.pages); // from backend
    } catch (error) {
      console.error("Failed to fetch halls", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScreens();
  }, [search, pageIndex, pageSize, filters]);

  const columns: ColumnDef<Screen>[] = [
    {
      accessorKey: "name",
      header: "Screen Name",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "hall",
      header: "Hall Name",
      cell: ({ row }) => row.original.hallId?.name || "N/A",
    },
    {
      accessorKey: "rows",
      header: "Rows",
      cell: ({ row }) => row.original.rows,
    },
    {
      accessorKey: "columns",
      header: "Columns",
      cell: ({ row }) => row.original.columns,
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
      cell: ({ row }) => row.original.capacity,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <ScreenMoreAction
          screenId={row.original._id}
          onDeleted={fetchScreens}
        />
      ),
    },
  ];

  const table = useReactTable<Screen>({
    data: screens,
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

  return <TSTable<Screen> loading={loading} table={table} />;
}
