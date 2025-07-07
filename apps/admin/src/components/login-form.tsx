import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ILoginFormInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    try {
      const user = await login(data.email, data.password);
      if (user?.role === "admin") {
        navigate("/admin");
      } else if (user?.role === "hallowner") {
        navigate("/hall");
      } else {
        toast.error("Unauthenticated user!");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-1">
                <Label className="text-gray-700" htmlFor="email">
                  Email
                </Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label className="text-gray-700" htmlFor="password">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register("password")}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message || "Email is required"}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <Checkbox id="rememberMe" {...register("rememberMe")} />
                  <span className="ml-2">Remember me</span>
                </div>
                <Button variant={"outline"} type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
