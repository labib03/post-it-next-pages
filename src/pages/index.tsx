"use client";

import {
  AllPost,
  CreatePost,
  RootLayout,
  Skeleton,
  SplashScreen,
} from "@/components";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

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

  if (query?.isError) {
    if (query?.error instanceof AxiosError) {
      toast.error(query?.error?.response?.data?.message);
    }
  }

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
      {!query?.isFetchedAfterMount ? (
        <Skeleton total={3} />
      ) : query.status === "success" ? (
        <AllPost data={query?.data?.data} />
      ) : null}
    </RootLayout>
  );
}
