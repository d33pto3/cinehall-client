import ShowOverview, {
  ShowProps,
} from "@/components/hallowner/shows/showId/ShowOverview";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HallownerShow() {
  const { showId } = useParams();

  const [show, setShow] = useState<ShowProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getShow = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/show/hallowner/${showId}`);

        setShow(res.data.data);
      } catch (error: any) {
        console.error("Error fetching show:", error);
        setError(error.response?.data?.message || "Failed to fetch show");
      } finally {
        setLoading(false);
      }
    };

    if (showId) {
      getShow();
    }
  }, [showId]);

  if (loading) {
    return <div className="p-8">Loading screen details...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <div className="flex gap-2">
        <ShowOverview showInfo={show} />
      </div>
    </div>
  );
}
