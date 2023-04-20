"use client";

import {
  AllPost,
  CreatePost,
  RootLayout,
  Skeleton,
  SplashScreen,
} from "@/components";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const [isLoading, setIsloading] = useState(false);

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("/api/posts/getPosts");
    },
  });

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
      <CreatePost isLoading={isLoading} setIsLoading={setIsloading} />
      {isLoading || query.status === "loading" ? <Skeleton total={3} /> : null}
      {!isLoading && query.status === "success" && (
        <AllPost data={query?.data?.data || []} />
      )}
    </RootLayout>
  );
}
