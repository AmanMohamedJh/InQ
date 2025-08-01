"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  // Simple check for cookie/session (replace with real auth logic as needed)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example: check for a cookie (replace with real logic)
    // You can use cookies, localStorage, or fetch /auth/profile
    // For now, always guest
    setIsLoggedIn(false);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to InQ!</h1>
      {isLoggedIn ? (
        <div className="text-lg">
          <p className="mb-3">Welcome back! Go to your <Link href="/dashboard" className="underline">Dashboard</Link>.</p>
        </div>
      ) : (
        <div className="text-lg flex flex-col items-center gap-3">
          <p>Join the queue revolution!</p>
          <div className="flex gap-4">
            <Link href="/auth/login" className="px-4 py-2 bg-zinc-900 rounded hover:bg-zinc-800 transition">Login</Link>
            <Link href="/auth/signup" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">Sign Up</Link>
          </div>
        </div>
      )}
    </main>
  );
}
