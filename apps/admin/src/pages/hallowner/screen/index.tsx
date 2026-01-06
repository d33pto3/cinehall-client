import HallownerScreensTable from "@/components/hallowner/screens/HallownerScreensTable";

import { useDocumentTitle } from "@/hooks/useDocumentTitle";

function HallownerScreens() {
  useDocumentTitle("Screens");
  return (
    <div>
      <div className="space-y-5 w-full overflow-y-auto px-3">
        <div className="flex gap-2">
          <HallownerScreensTable
          //  query={query}
          />
        </div>
      </div>
    </div>
  );
}

export default HallownerScreens;
