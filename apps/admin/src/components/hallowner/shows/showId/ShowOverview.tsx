// ShowOverview.tsx
import EditShowForm from "./EditShowForm"; // You need to create this for editing a show

export type ShowProps = {
  _id: string;
  movieId: {
    _id: string;
    title: string;
  };
  screenId: {
    _id: string;
    name: string;
  };
  startTime: string;
  endTime: string;
  basePrice: number;
};

export default function ShowOverview({
  showInfo,
}: {
  showInfo: ShowProps | null;
}) {
  if (!showInfo) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>No show selected.</p>
      </div>
    );
  }

  console.log(showInfo);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Show Overview</h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <strong>Movie:</strong> {showInfo.movieId.title}
        </div>
        <div>
          <strong>Screen:</strong> {showInfo.screenId.name}
        </div>
        <div>
          <strong>Start Time:</strong>{" "}
          {new Date(showInfo.startTime).toLocaleString()}
        </div>
        <div>
          <strong>End Time:</strong>{" "}
          {new Date(showInfo.endTime).toLocaleString()}
        </div>
        <div>
          <strong>Base Price:</strong> ${showInfo.basePrice}
        </div>

        {/* Optional: Edit form */}
        <div className="mt-6">
          <EditShowForm showInfo={showInfo} />
        </div>
      </div>
    </div>
  );
}
