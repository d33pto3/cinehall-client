import { HallProps } from "@/components/admin/halls/hallId/HallOverview";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Screen {
  _id: string;
  name: string;
  rows: number;
  columns: number;
  capacity: number;
  createdAt: string;
}

function HallownerHall() {
  const { hallId } = useParams();
  const [hall, setHall] = useState<HallProps | null>(null);
  const [screens, setScreens] = useState<Screen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHallData = async () => {
      try {
        setLoading(true);
        // Fetch hall details
        const hallRes = await axios.get(`/hall/${hallId}`);
        setHall(hallRes.data);

        // Fetch screens for this hall
        const screensRes = await axios.get(`/screen/hall/${hallId}`);
        setScreens(screensRes.data.data || []);
      } catch (error) {
        console.error("Error fetching hall data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (hallId) {
      getHallData();
    }
  }, [hallId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header with hall name and add screen button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">{hall?.name || "Hall Details"}</h1>
        <Link
          to={`/hallowner/screens/add-screen`}
          state={{ hallId }} // Pass hallId as state
          className="flex items-center"
        >
          <Button>
            <IoIosAddCircleOutline className="mr-2 w-4 h-4" />
            Add Screen
          </Button>
        </Link>
      </div>

      {/* Hall details summary */}
      {hall && (
        <div className="bg-muted p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Hall Information</h2>
          <p>Location: {hall.address}</p>
          <p>Total Screens: {screens.length}</p>
          {/* Add more hall details as needed */}
        </div>
      )}

      {/* Screens section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Screens</h2>

        {screens.length === 0 ? (
          <div className="text-center py-12 bg-muted rounded-lg">
            <p className="text-muted-foreground mb-4">No screens added yet</p>
            <Link to={`/hallowner/screens/add-screen`} state={{ hallId }}>
              <Button>
                <IoIosAddCircleOutline className="mr-2 w-4 h-4" />
                Add Your First Screen
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {screens.map((screen) => (
              <Card
                key={screen._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{screen.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Rows:</span> {screen.rows}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Columns:</span>{" "}
                      {screen.columns}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Capacity:</span>{" "}
                      {screen.capacity} seats
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Added on:{" "}
                      {new Date(screen.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Action buttons for each screen */}
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HallownerHall;
