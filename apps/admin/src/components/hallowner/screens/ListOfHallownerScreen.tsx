// ListOfHallownerScreens.tsx
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
    address?: string;
  };
  rows: number;
  columns: number;
  capacity: number;
  createdAt: string;
}

interface Props {
  search: string;
  filters: {
    dateRange?: {
      from: Date | null;
      to: Date | null;
    };
    capacityRange?: {
      min: number | null;
      max: number | null;
    };
    rowsRange?: {
      min: number | null;
      max: number | null;
    };
    columnsRange?: {
      min: number | null;
      max: number | null;
    };
  };
}

export default function ListOfHallownerScreens({ search, filters }: Props) {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchScreens = async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = {
        search,
        page: pageIndex + 1,
        limit: pageSize,
      };

      // Add filter parameters
      if (filters.dateRange?.from)
        params.dateFrom = filters.dateRange.from.toISOString();
      if (filters.dateRange?.to)
        params.dateTo = filters.dateRange.to.toISOString();
      if (filters.capacityRange?.min !== null)
        params.capacityMin = filters.capacityRange?.min;
      if (filters.capacityRange?.max !== null)
        params.capacityMax = filters.capacityRange?.max;
      if (filters.rowsRange?.min !== null)
        params.rowsMin = filters.rowsRange?.min;
      if (filters.rowsRange?.max !== null)
        params.rowsMax = filters.rowsRange?.max;
      if (filters.columnsRange?.min !== null)
        params.columnsMin = filters.columnsRange?.min;
      if (filters.columnsRange?.max !== null)
        params.columnsMax = filters.columnsRange?.max;

      const res = await axios.get(`/screen/hallowner`, { params });
      setScreens(res.data.data);
      setPageCount(res.data.pages);
      setTotalCount(res.data.count);
    } catch (error) {
      console.error("Failed to fetch screens", error);
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
      cell: ({ row }) => row.original.hallId.name,
    },
    {
      accessorKey: "hallAddress",
      header: "Hall Address",
      cell: ({ row }) => row.original.hallId.address || "N/A",
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
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
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
    <TSTable<Screen>
      loading={loading}
      table={table}
      pagination={{
        pageIndex: pageIndex + 1,
        pageSize: pageCount,
      }}
    />
  );
}
