import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { LuFilter } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import * as z from "zod";

// 👇 Add when you implement this
// import { DateRangePickerField } from "@/components/common/DateRangePicker";

const filterFormSchema = z.object({
  dateRange: z.object({
    from: z.date().nullable(),
    to: z.date().nullable(),
  }),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

const defaultValues: FilterFormValues = {
  dateRange: {
    from: null,
    to: null,
  },
};

function ShowsFilter({
  onFilter,
}: {
  onFilter?: (values: FilterFormValues) => void;
}) {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues,
  });

  async function onSubmit(data: FilterFormValues) {
    if (onFilter) onFilter(data);
  }

  const resetFilters = () => {
    form.reset(defaultValues);
    if (onFilter) onFilter(defaultValues);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center text-gray-400 mr-2"
        >
          <LuFilter className="mr-2 w-4 h-4" />
          Filter
        </Button>
      </SheetTrigger>

      <SheetContent side="top" className="shadow-md rounded p-4">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>
            Use filters to narrow down the list of Shows.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-10"
          >
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                {/* Date Range Picker */}
                {/* Uncomment when ready */}
                {/* 
                <DateRangePickerField
                  control={form.control}
                  name="dateRange"
                  label="Created Date"
                /> 
                */}
              </div>

              {/* Right Column (Future use for owners or other filters) */}
              <div>{/* Owner filter or additional filters can go here */}</div>
            </div>

            <SheetFooter className="flex justify-end mt-6">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={resetFilters}
              >
                <MdOutlineCancel className="mr-2 w-4 h-4" />
                Reset Filter
              </Button>
              <SheetClose asChild>
                <Button type="submit">
                  <LuFilter className="mr-2 w-4 h-4" />
                  Apply Filter
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default ShowsFilter;
