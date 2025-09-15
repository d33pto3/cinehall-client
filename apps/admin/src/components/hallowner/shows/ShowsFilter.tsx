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
  basePriceRange: z.object({
    min: z.number().min(0).nullable(),
    max: z.number().min(0).nullable(),
  }),
  // Optional: filter by screen capacity
  capacityRange: z.object({
    min: z.number().min(0).nullable(),
    max: z.number().min(0).nullable(),
  }),
});

type FilterFormValues = z.infer<typeof filterFormSchema>;

const defaultValues: FilterFormValues = {
  dateRange: { from: null, to: null },
  basePriceRange: { min: null, max: null },
  capacityRange: { min: null, max: null },
};

interface ShowsFilterProps {
  onFilter: (filters: {
    dateRange?: { from: Date | null; to: Date | null };
    basePriceRange?: { min: number | null; max: number | null };
    capacityRange?: { min: number | null; max: number | null };
  }) => void;
}

function ShowsFilter({ onFilter }: ShowsFilterProps) {
  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues,
  });

  const onSubmit = (data: FilterFormValues) => {
    onFilter(data);
  };

  const resetFilters = () => {
    form.reset(defaultValues);
    onFilter(defaultValues);
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
          <SheetTitle>Filter Shows</SheetTitle>
          <SheetDescription>
            Use filters to narrow down the list of shows.
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
                {/* Date Range */}
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Show Date Range</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value.from && "text-muted-foreground"
                              )}
                            >
                              {field.value.from
                                ? field.value.to
                                  ? `${format(
                                      field.value.from,
                                      "MMM dd, yyyy"
                                    )} - ${format(
                                      field.value.to,
                                      "MMM dd, yyyy"
                                    )}`
                                  : format(field.value.from, "MMM dd, yyyy")
                                : "Select date range"}
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
                            onSelect={(range) =>
                              field.onChange({
                                from: range?.from || null,
                                to: range?.to || null,
                              })
                            }
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                {/* Base Price Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Base Price Range
                  </label>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="basePriceRange.min"
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Min"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : parseInt(e.target.value)
                            )
                          }
                          className="flex-1"
                        />
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="basePriceRange.max"
                      render={({ field }) => (
                        <Input
                          type="number"
                          placeholder="Max"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : parseInt(e.target.value)
                            )
                          }
                          className="flex-1"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Screen Capacity Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Screen Capacity
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
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : parseInt(e.target.value)
                            )
                          }
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
                          onChange={(e) =>
                            field.onChange(
                              e.target.value === ""
                                ? null
                                : parseInt(e.target.value)
                            )
                          }
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

export default ShowsFilter;
