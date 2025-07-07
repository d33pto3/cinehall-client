import { LoginForm } from "@/components/login-form";

function Login() {
  return (
    <div className="flex justify-around items-center min-h-screen">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-2xl">Cinehall</h1>
        <LoginForm className="sm:w-[400px]" />
      </div>
    </div>
  );
}

export default Login;
