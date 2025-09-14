// HallownerScreen.tsx
import ScreenOverview, {
  ScreenProps,
} from "@/components/hallowner/screens/screenId/ScreenOverview";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function HallownerScreen() {
  const { screenId } = useParams();

  const [screen, setScreen] = useState<ScreenProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getScreen = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/screen/hallowner/${screenId}`);

        setScreen(res.data.data);
      } catch (error: any) {
        console.error("Error fetching screen:", error);
        setError(error.response?.data?.message || "Failed to fetch screen");
      } finally {
        setLoading(false);
      }
    };

    if (screenId) {
      getScreen();
    }
  }, [screenId]);

  if (loading) {
    return <div className="p-8">Loading screen details...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <div className="flex gap-2">
        <ScreenOverview screenInfo={screen} />
      </div>
    </div>
  );
}

export default HallownerScreen;
