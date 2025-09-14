// ScreenOverview.tsx
import EditScreenForm from "./EditScreenForm";

export type ScreenProps = {
  _id: string;
  name: string;
  hallId: {
    _id: string;
    name: string;
  };
  rows: number;
  columns: number;
  capacity: number;
};

export default function ScreenOverview({
  screenInfo,
}: {
  screenInfo: ScreenProps | null;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Screen Overview</h1>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden">
        <EditScreenForm screenInfo={screenInfo} />
      </div>
    </div>
  );
}
