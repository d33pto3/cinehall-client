import { useAuth } from "@/context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  console.log(user);

  return (
    <div>
      <h1>{user?.role} Dashboard</h1>
    </div>
  );
}

export default Dashboard;
