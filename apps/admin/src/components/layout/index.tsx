import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex min-h-screen w-full">
      <main className="flex-1 p-6 bg-muted/40 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
