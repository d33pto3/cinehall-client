import { LoginForm } from "@/components/forms/login-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-md p-6 rounded-lg">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
