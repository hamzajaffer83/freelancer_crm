"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const data = response.data;
      Cookies.set("token", data.token, {
        expires: 1,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });

      localStorage.setItem("user", JSON.stringify(data.user))

      router.push("/admin/dashboard");

    } catch (err: any) {
      // Axios error handling
      if (err.response) {
        // Laravel validation error
        if (err.response.status === 422) {
          const validationErrors: any = err.response.data.errors;
          const firstError = Object.values<any>(validationErrors)[0][0];
          setError(firstError);
        }
        // Unauthorized (wrong login)
        else if (err.response.status === 401) {
          setError("Invalid email or password.");
        }
        // Other backend errors
        else {
          setError(err.response.data.message || "Something went wrong.");
        }
      } else {
        // Network / unexpected error
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required />
              </Field>

              {/* Show error message */}
              {error && (
                <div className="text-red-500 text-sm font-medium">{error}</div>
              )}

              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
