import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { FiSearch } from "react-icons/fi";

export default function SearchActivity({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch: (query: string) => void;
}) {
  const handleSearch = useDebouncedCallback((term: string) => {
    onSearch(term);
  }, 300);

  return (
    <div>
      <Input
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        className="w-full pl-10 text-gray-400"
      />
      <FiSearch className="absolute top-2.5 left-2.5 w-5 h-5 text-gray-400" />
    </div>
  );
}
