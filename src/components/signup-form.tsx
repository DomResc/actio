import { Link, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth/authClients";
import { cn } from "~/lib/utils";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;

    if (!name || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message || "");
      setIsLoading(false);
    }

    if (data) {
      navigate({ to: "/" });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create to your account</CardTitle>
          <CardDescription>
            Enter your information below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name Surname</Label>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  placeholder="name"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="***********"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                </div>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  type="confirm_password"
                  placeholder="***********"
                  required
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="mt-2 w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading && <LoaderCircle className="animate-spin" />}
                  {isLoading ? "Signing up..." : "Sign up"}
                </Button>
                {errorMessage && (
                  <span className="text-destructive text-center text-sm">
                    {errorMessage}
                  </span>
                )}
              </div>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
