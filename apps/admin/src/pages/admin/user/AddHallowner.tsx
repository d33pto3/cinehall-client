import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddHallOwnerForm from "@/components/admin/users/add-new-hallowner/AddHallownerForm";

function AddHallOwner() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/admin/users");
  };

  const handleSuccess = () => {
    toast.success("Hall owner created successfully!");
  };

  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      {/* Back button */}
      <Button
        onClick={handleGoBack}
        variant="ghost"
        className="flex items-center gap-2 mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Users
      </Button>

      <div className="flex gap-2">
        <AddHallOwnerForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}

export default AddHallOwner;
