import ShowOverview, {
  ShowProps,
} from "@/components/admin/shows/showId/ShowOverview";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Show() {
  const { showId } = useParams();

  const [show, setShow] = useState<ShowProps | null>(null);

  useEffect(() => {
    const getShow = async () => {
      const res = await axios.get(`/show/${showId}`);

      setShow(res.data.data);
    };

    getShow();
  }, []);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <div className="flex gap-2">
        <ShowOverview showInfo={show} />
      </div>
    </div>
  );
}

export default Show;
