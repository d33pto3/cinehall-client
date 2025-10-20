import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

function TableLoading({ columnLength }: { columnLength: number }) {
  return (
    <>
      {[...Array(10)].map((_, rowIdx) => (
        <TableRow key={`skeleton-row-${rowIdx}`}>
          {[...Array(columnLength)].map((_, colIdx) => (
            <TableCell key={`skeleton-cell-${rowIdx}-${colIdx}`}>
              <Skeleton className="bg-gray-300 h-8 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export default TableLoading;
