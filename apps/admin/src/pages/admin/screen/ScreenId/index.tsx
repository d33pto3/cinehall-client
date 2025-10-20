import ScreenOverview, {
  ScreenProps,
} from "@/components/admin/screens/screenId/ScreenOverview";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Screen() {
  const { screenId } = useParams();

  const [screen, setScreen] = useState<ScreenProps | null>(null);

  useEffect(() => {
    const getHall = async () => {
      const res = await axios.get(`/screen/${screenId}`);

      setScreen(res.data.data);
    };

    getHall();
  }, []);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <div className="flex gap-2">
        <ScreenOverview screenInfo={screen} />
      </div>
    </div>
  );
}

export default Screen;
