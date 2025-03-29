import { LoginForm } from "@/components/forms/login-form";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
      <div className="w-full max-w-md p-6 rounded-lg">
        <LoginForm />
      </div>
    </div>
  );
}
