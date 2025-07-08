import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TSTable from "@/components/common/TSTable";
import axios from "../../../utils/axios";

// import { HallsTableActions } from "@/components/HallsTableActions"; // create this

interface Hall {
  _id: string;
  name: string;
  address: string;
  screens: number;
  owner: string;
}

export default function ListOfHalls() {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);
  // const [sorting, setSorting] = useState([]);

  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const res = await axios.get("/hall"); // replace with your actual API
        setHalls(res.data);
      } catch (error) {
        console.error("Failed to fetch halls", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

  console.log(halls);

  const columns: ColumnDef<Hall>[] = [
    {
      accessorKey: "name",
      header: "Hall Name",
      cell: ({ row }) => row.original.name,
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => row.original.address,
    },
    {
      accessorKey: "screens",
      header: "Screen",
      cell: ({ row }) => row.original.screens,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => row.original.name,
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        // <HallsTableActions hallId={row.original._id}
        <></>
      ),
    },
  ];

  const table = useReactTable<Hall>({
    data: halls,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // state: {
    //   sorting,
    // },
    // onSortingChange: setSorting,
  });

  if (loading) return <div>Loading...</div>;

  return <TSTable<Hall> table={table} />;
}
