"use client";

import { CreatePost, RootLayout, SplashScreen } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  if (session?.status?.toLowerCase() === "unauthenticated") {
    setTimeout(() => {
      router.push({
        pathname: "/auth",
      });
    }, 900);
    return <SplashScreen />;
  }

  if (session?.status === "loading") {
    return <SplashScreen />;
  }

  return (
    <RootLayout>
      <CreatePost />
    </RootLayout>
  );
}
