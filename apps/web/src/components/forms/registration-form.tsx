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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import InputFormField from "../shared/InputFormField";
import axios from "axios";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least two characters."),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().regex(/^\d{11}$/, "Phone number must be exactly 11 digits"),
});

type RegistrationFormData = z.infer<typeof formSchema>;

// TODO: Email verification (using RESEND or NODEMAILER)

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const url =
        process.env.NEXT_PUBLIC_API_URL ??
        (() => {
          throw new Error(
            "NEXT_PUBLIC_API_URL is not defined in the environment variables."
          );
        })();
      console.log("Form Submitted:", data);

      const response = await axios.post(`${url}/auth/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("response: ", response);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your new account</CardTitle>
          <CardDescription>
            Enter details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <InputFormField
                  form={form}
                  name="username"
                  label="Username"
                  placeholder="John Toe"
                />
                <InputFormField
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="toe@example.com"
                  type="email"
                />
                <InputFormField
                  form={form}
                  name="password"
                  label="Password"
                  placeholder="******"
                  type="password"
                />
                <InputFormField
                  form={form}
                  name="phone"
                  label="Phone"
                  placeholder="+88013........"
                  type="text"
                />
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Signup
                  </Button>
                  <Button variant="outline" className="w-full cursor-pointer">
                    Login with Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
