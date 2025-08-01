"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import axios from "axios";
import { API } from "@/lib/api";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle } from "lucide-react";

// Simple eye icon SVGs
const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ) : (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="text-gray-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.873 6.872A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.953 9.953 0 01-4.043 5.306M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3l18 18"
      />
    </svg>
  );

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      try {
        const res = await axios.post(
          `${API}/auth/login`,
          { email, password },
          { withCredentials: true }
        );
        if (res.status === 200) {
          setSuccess("Login successful! Redirecting to home...");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          setError(res.data?.error || "Login failed");
        }
      } catch (err: any) {
        setError(err.response?.data?.error || err.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <h1
        className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight mb-13 text-center w-full py-8"
        style={{ letterSpacing: "0.04em" }}
      >
        JOIN TO{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
          InQ
        </span>
      </h1>
      <div className="flex items-center justify-center w-full">
        <Card className="w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] border border-white/10 px-8 py-10">
          <CardHeader>
            <CardTitle className="text-white font-extrabold">
              Login to your account
            </CardTitle>
            <CardDescription className="text-gray-300">
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button
                variant="link"
                className="text-gray-100 hover:text-white"
                onClick={() => router.push("/auth/signup")}
              >
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-white placeholder:text-white bg-transparent border border-gray-700"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="text-white font-semibold"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-white placeholder:text-white bg-transparent border border-gray-700 pr-10"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-transparent"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-zinc-900 text-white font-semibold text-lg py-3 rounded-lg hover:bg-zinc-800 transition mt-6"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            {success && (
              <Alert variant="default" className="mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button variant="outline" className="w-full google-login-btn">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
