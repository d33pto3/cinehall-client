import UserOverview, {
  UserProps,
} from "@/components/admin/users/userId/UserOverview";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function User() {
  const { userId } = useParams();

  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/user/${userId}`);

      setUser(res.data.data);
    };

    getUser();
  }, []);

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <div className="flex gap-2">
        <UserOverview userInfo={user} />
      </div>
    </div>
  );
}

export default User;
