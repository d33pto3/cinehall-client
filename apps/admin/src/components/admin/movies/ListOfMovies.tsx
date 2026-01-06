import { useEffect, useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TSTable from "@/components/common/TSTable";
import axios from "@/lib/axios";
import MovieMoreAction from "./MoreAction";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  duration: number;
  genre: string;
  releaseDate: string;
  director: string;
}

// export default function ListOfMovies({ query }: { query: string }) {
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

export default function ListOfMovies({ search, filters }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(10); // items per page
  const [pageCount, setPageCount] = useState(0); // total number of pages

  const fetchMovies = async () => {
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

      const res = await axios.get(`/movie`, { params });
      setMovies(res.data.data);
      setPageCount(res.data.pages); // from backend
    } catch (error) {
      console.error("Failed to fetch movies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [search, pageIndex, pageSize, filters]);

  const columns: ColumnDef<Movie>[] = [
    {
      accessorKey: "title",
      header: "Movie Title",
      cell: ({ row }) => row.original.title,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => row.original.duration,
    },
    {
      accessorKey: "genre",
      header: "Genre",
      cell: ({ row }) => row.original.genre,
    },
    {
      accessorKey: "releaseDate",
      header: "Release Date",
      cell: ({ row }) => row.original.releaseDate,
    },
    {
      accessorKey: "director",
      header: "Director",
      cell: ({ row }) => row.original.director,
    },
    {
      accessorKey: "image",
      header: "Poster",
      cell: ({ row }) => (
        <div className="w-12 aspect-movie overflow-hidden border border-border/50">
          <img
            src={row.original.imageUrl || "/public/fallback_img.png"}
            className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-500"
            alt={row.original.title}
            loading="lazy"
            decoding="async"
          />
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <MovieMoreAction movieId={row.original._id} onDeleted={fetchMovies} />
      ),
    },
  ];

  const table = useReactTable<Movie>({
    data: movies,
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

  return <TSTable<Movie> loading={loading} table={table} />;
}
