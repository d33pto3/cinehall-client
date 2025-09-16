import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TSTable from "@/components/common/TSTable";
import axios from "@/lib/axios";
import TicketMoreAction from "./TicketMoreAction";

interface Ticket {
  _id: string;
  booking_id: string;
  userId: {
    _id: string;
    username: string;
  };
  seatId: {
    _id: string;
    seatNumber: string;
  };
  ticketId: string;
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

export default function ListOfTickets({ search, filters }: Props) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(10); // items per page
  const [pageCount, setPageCount] = useState(0); // total number of pages

  const fetchTickets = async () => {
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

      const res = await axios.get(`/ticket`, { params });
      setTickets(res.data.data);
      setPageCount(res.data.pages); // from backend
    } catch (error) {
      console.error("Failed to fetch tickets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search, pageIndex, pageSize, filters]);

  const columns: ColumnDef<Ticket>[] = [
    {
      accessorKey: "_id",
      header: "Ticket ID",
      cell: ({ row }) => `${row.original.ticketId}`,
    },
    {
      accessorKey: "userId",
      header: "User Name",
      cell: ({ row }) => row.original.userId.username,
    },
    {
      accessorKey: "seatId",
      header: "Seat Number",
      cell: ({ row }) => row.original.seatId.seatNumber,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <TicketMoreAction
          ticketId={row.original._id}
          onDeleted={fetchTickets}
        />
      ),
    },
  ];

  const table = useReactTable<Ticket>({
    data: tickets,
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
    <TSTable<Ticket>
      loading={loading}
      table={table}
      pagination={{
        pageIndex: pageIndex + 1,
        pageSize: pageCount,
      }}
    />
  );
}
