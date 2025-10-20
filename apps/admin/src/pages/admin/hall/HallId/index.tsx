import HallOverview, {
  HallProps,
} from "@/components/admin/halls/hallId/HallOverview";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Hall() {
  const { hallId } = useParams();

  const [hall, setHall] = useState<HallProps | null>(null);

  useEffect(() => {
    const getHall = async () => {
      const res = await axios.get(`/hall/${hallId}`);

      setHall(res.data);
    };

    getHall();
  }, []);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <div className="flex gap-2">
        <HallOverview hallInfo={hall} />
      </div>
    </div>
  );
}

export default Hall;
