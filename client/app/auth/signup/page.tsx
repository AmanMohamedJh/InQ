"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="flex items-center justify-center w-full">
        <Card className="w-full max-w-xl bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_0_rgba(255,255,255,0.12)] border border-white/10 px-8 py-10">
          <CardHeader className="p-0 mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 text-left">
              Create an account
            </h1>
            <p className="text-base text-gray-400 mb-2 text-left">
              Let's get started. Fill in the details below to create your
              account.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-white font-semibold">
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  required
                  className="bg-transparent border border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-white font-semibold">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  className="bg-transparent border border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-white font-semibold">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                  minLength={8}
                  className="bg-transparent border border-gray-700 text-white placeholder:text-gray-400"
                />
                <span className="text-sm text-gray-400 mt-1">
                  Minimum 8 characters.
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="telephone" className="text-white font-semibold">Telephone</Label>
                <Input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  placeholder="Enter your phone number"
                  required
                  className="bg-transparent border border-gray-700 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Role selection field and drawer */}
              <div className="flex flex-col gap-2">
                <Label className="text-white font-semibold">Join to InQ as ...</Label>
                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                  <DrawerTrigger asChild>
                    <button
                      type="button"
                      className="bg-transparent border border-gray-700 text-white rounded-lg px-4 py-3 text-left hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      onClick={() => setDrawerOpen(true)}
                    >
                      {selectedRole ? `Joining as: ${selectedRole}` : "Select role (Owner or Customer)"}
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Select your role</DrawerTitle>
                      <DrawerDescription>Choose how you want to use InQ</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 px-4">
                      <button
                        type="button"
                        className={`border rounded-lg p-4 text-left transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 ${selectedRole === 'Owner' ? 'border-white bg-white/10' : 'border-gray-700 bg-transparent'} text-white`}
                        onClick={() => setSelectedRole('Owner')}
                      >
                        <div className="font-bold text-lg mb-1">Owner</div>
                        <div className="text-gray-300 text-sm">
                          Owner can add stores, clinics, or any institute where they can manage the crowd and queues.
                        </div>
                      </button>
                      <button
                        type="button"
                        className={`border rounded-lg p-4 text-left transition hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 ${selectedRole === 'Customer' ? 'border-white bg-white/10' : 'border-gray-700 bg-transparent'} text-white`}
                        onClick={() => setSelectedRole('Customer')}
                      >
                        <div className="font-bold text-lg mb-1">Customer</div>
                        <div className="text-gray-300 text-sm">
                          Here customer can join the queue in any place where InQ is available.
                        </div>
                      </button>
                    </div>
                    <DrawerFooter>
  <div className="flex flex-row gap-3 justify-end">
    <Button
      type="button"
      className="px-6"
      onClick={() => {
        setDrawerOpen(false);
      }}
      disabled={!selectedRole}
    >
      Submit
    </Button>
    <DrawerClose asChild>
      <Button type="button" variant="outline" className="px-6 text-gray-200 border-gray-400 hover:text-black">Cancel</Button>
    </DrawerClose>
  </div>
</DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="accent-white bg-black border-gray-700 rounded"
                />
                <Label
                  htmlFor="terms"
                  className="text-gray-300 text-sm font-normal"
                >
                  I agree to the{" "}
                  <a
                    href="#"
                    className="underline text-gray-100 hover:text-white"
                  >
                    Terms & Conditions
                  </a>
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black font-semibold text-lg py-3 rounded-lg mt-4 hover:bg-gray-100 transition"
              >
                Sign up
              </Button>
            </form>
            <div className="text-center mt-7 text-gray-400 text-base">
              Already have account?{" "}
              <a
                href="/auth/login"
                className="text-white underline hover:text-gray-200"
              >
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
