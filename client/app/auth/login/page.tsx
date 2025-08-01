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

export default function LoginPage() {
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
            <CardTitle className="text-white font-extrabold">Login to your account</CardTitle>
            <CardDescription className="text-gray-300">
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button variant="link" className="text-gray-100 hover:text-white" onClick={() => router.push('/auth/signup')}>Sign Up</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-white font-semibold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" className="text-white font-semibold">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input id="password" type="password" required />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full bg-zinc-900 text-white font-semibold text-lg py-3 rounded-lg hover:bg-zinc-800 transition">
              Login
            </Button>
            <Button variant="outline" className="w-full google-login-btn">
              Login with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
