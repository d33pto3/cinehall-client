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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { LuFilter } from "react-icons/lu";
import { MdOutlineCancel } from "react-icons/md";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

const filterFormSchema = z.object({
  dateRange: z.object({
    from: z.date().nullable(),
    to: z.date().nullable(),
  }),
  capacityRange: z.object({
    min: z.number().min(0).nullable(),
    max: z.number().min(0).nullable(),
  }),
  rowsRange: z.object({
    min: z.number().min(1).nullable(),
    max: z.number().min(1).nullable(),
  }),
  columnsRange: z.object({
    min: z.number().min(1).nullable(),
    max: z.number().min(1).nullable(),
  }),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

const defaultValues: FilterFormValues = {
  dateRange: {
    from: null,
    to: null,
  },
  capacityRange: {
    min: null,
    max: null,
  },
  rowsRange: {
    min: null,
    max: null,
  },
  columnsRange: {
    min: null,
    max: null,
  },
};

interface ScreensFilterProps {
  onFilter: (filters: {
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
  }) => void;
}

function ScreensFilter({ onFilter }: ScreensFilterProps) {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues,
  });

  async function onSubmit(data: FilterFormValues) {
    onFilter(data);
  }

  const resetFilters = () => {
    form.reset(defaultValues);
    onFilter({
      dateRange: { from: null, to: null },
      capacityRange: { min: null, max: null },
      rowsRange: { min: null, max: null },
      columnsRange: { min: null, max: null },
    });
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

      <SheetContent side="top" className="shadow-md rounded p-4 max-w-2xl">
        <SheetHeader>
          <SheetTitle>Filter Screens</SheetTitle>
          <SheetDescription>
            Use filters to narrow down the list of screens.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Date Range Picker */}
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Created Date Range</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value.from && "text-muted-foreground"
                              )}
                            >
                              {field.value.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, "MMM dd, yyyy")} -{" "}
                                    {format(field.value.to, "MMM dd, yyyy")}
                                  </>
                                ) : (
                                  format(field.value.from, "MMM dd, yyyy")
                                )
                              ) : (
                                "Select date range"
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field.value.from || undefined}
                            selected={{
                              from: field.value.from || undefined,
                              to: field.value.to || undefined,
                            }}
                            onSelect={(range) => {
                              field.onChange({
                                from: range?.from || null,
                                to: range?.to || null,
                              });
                            }}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                {/* Capacity Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Capacity Range
                  </label>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="capacityRange.min"
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Min"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? null : parseInt(value)
                            );
                          }}
                          className="flex-1"
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="capacityRange.max"
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Max"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? null : parseInt(value)
                            );
                          }}
                          className="flex-1"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Rows Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Rows Range
                  </label>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="rowsRange.min"
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Min"
                          min="1"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? null : parseInt(value)
                            );
                          }}
                          className="flex-1"
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rowsRange.max"
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Max"
                          min="1"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? null : parseInt(value)
                            );
                          }}
                          className="flex-1"
                        />
                      )}
                    />
                  </div>
                </div>

                {/* Columns Range Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Columns Range
                  </label>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="columnsRange.min"
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Min"
                          min="1"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? null : parseInt(value)
                            );
                          }}
                          className="flex-1"
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="columnsRange.max"
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Max"
                          min="1"
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? null : parseInt(value)
                            );
                          }}
                          className="flex-1"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <SheetFooter className="flex justify-end mt-6">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={resetFilters}
              >
                <MdOutlineCancel className="mr-2 w-4 h-4" />
                Reset Filters
              </Button>
              <SheetClose asChild>
                <Button type="submit">
                  <LuFilter className="mr-2 w-4 h-4" />
                  Apply Filters
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

export default ScreensFilter;
