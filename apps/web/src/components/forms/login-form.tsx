"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import InputFormField from "../shared/molecules/InputFormField";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { loginWithEmail, loginWithFirebase } from "@/lib/auth-actions";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be 6 characters"),
});

type LoginFormData = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { refreshUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const redirectUrl = searchParams.get("redirect") || "/";

  const form = useForm<LoginFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      const { email, password } = data;
      
      // 1. Perform Login Action
      await loginWithEmail(email, password);
      
      // 2. Refresh Auth Context to flip "user" state
      await refreshUser();
      
      // 3. Navigate
      router.push(redirectUrl);
    } catch (error) {
      console.error("Login failed:", error);
      if (axios.isAxiosError(error)) {
         setError(error.response?.data?.message || "Login failed. Please check your credentials.");
      } else {
         setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFirebaseLogin = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await loginWithFirebase();
      await refreshUser();
      
      router.push(redirectUrl);
    } catch (error) {
      console.error("Google login failed:", error);
      setError("Google login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <InputFormField
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="toe@gmail.com"
                />
                <InputFormField
                  form={form}
                  name="password"
                  label="Password"
                  placeholder="******"
                  type="password"
                />
                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:cursor-pointer"
                    type="button"
                    onClick={handleFirebaseLogin}
                    disabled={isSubmitting}
                  >
                    Login with Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
