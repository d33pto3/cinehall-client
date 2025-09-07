import UserOverview, {
  UserProps,
} from "@/components/admin/users/userId/UserOverview";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Changed from Navigate to useNavigate
import { toast } from "react-toastify";
import { Loader2, ArrowLeft } from "lucide-react"; // Added ArrowLeft icon
import { Button } from "@/components/ui/button"; // Import Button component

function User() {
  const { userId } = useParams();
  const navigate = useNavigate(); // Use navigate for manual navigation
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      if (!userId) {
        setError("User ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/user/${userId}`);

        if (res.data.success) {
          setUser(res.data.data);
        } else {
          setError("User not found");
          toast.error("User not found");
        }
      } catch (error: any) {
        console.error("Failed to fetch user:", error);
        setError("Failed to load user");

        if (error.response?.status === 404) {
          toast.error("User not found");
        } else {
          toast.error("Failed to load user data");
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [userId]);

  const handleGoBack = () => {
    navigate("/admin/users");
  };

  // Show loading state
  if (loading) {
    return (
      <div className="h-64 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading user...</span>
      </div>
    );
  }

  // Show error state with Go Back button
  if (error || !user) {
    return (
      <div className="h-64 flex flex-col justify-center items-center p-4">
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          User Not Found
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          The requested user does not exist or you may not have permission to
          view it.
        </p>
        <Button
          onClick={handleGoBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      {/* Add a back button at the top too */}
      <Button
        onClick={handleGoBack}
        variant="ghost"
        className="flex items-center gap-2 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Users
      </Button>

      <div className="flex gap-2">
        <UserOverview userInfo={user} />
      </div>
    </div>
  );
}

export default User;
