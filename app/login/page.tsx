"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Item, ItemTitle } from "@/components/ui/item";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { SignInFormData } from "@/lib/validation/auth.validation";
import { baseUrl } from "@/utils/baseUrl";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>();

  const loginMutation = useMutation({
    mutationFn: async (data: SignInFormData) => {
      const isEmail = data.identifier.includes("@");
      const payload = isEmail
        ? { email: data.identifier, password: data.password }
        : { phone: data.identifier, password: data.password };

      const res = await axios.post(`${baseUrl}/api/auth/login`, payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Login successful");
      router.push("/dashboard");
    },
    onError: (data) => {
      toast.error(data?.message || "Login failed. Please try again.");
    },
  });
  const onSubmit = (data: SignInFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <section className=" min-h-screen flex items-center justify-center min-w-screen ">
      <Card className="w-full max-w-md ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login to your account
          </CardTitle>
          <CardDescription className="text-center text-sm">
            Enter Your email / phone number below to login your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <Label htmlFor="username">Email / Phone Number</Label>
              <Input id="username" type="string" {...register("identifier")} />
              {errors.identifier && (
                <p className="text-red-500 text-xs">
                  {errors.identifier.message}
                </p>
              )}
            </div>
            <div className="space-y-1 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <div className="absolute top-6 right-3">
                {showPassword ? (
                  <EyeOff
                    className="text-zinc-500 cursor-pointer"
                    size={22}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="text-zinc-500 cursor-pointer"
                    size={22}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {isSubmitting ? (
                <Item>
                  <Spinner />
                  <ItemTitle> Signing in.... </ItemTitle>
                </Item>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <p className="text-muted-foreground">
            forget password{" "}
            <a
              href="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              forget password
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}

export default Page;
