"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // verify token if present move to movies route otherwise redirect to sign-in route
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/movies");
    } else {
      router.push("/signin");
    }
  }, [router]);

  return (
      <div className="text-center">
        <p>Redirecting...</p>
      </div>
  );
}
