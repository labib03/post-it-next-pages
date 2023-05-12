"use client";

import {
  AllPost,
  CreatePost,
  ListUserComponent,
  RootLayout,
  Skeleton,
  SplashScreen,
} from "@/components";
import FetchLikePost from "@/handler/FetchLikePost";
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

  const { handleLikePost, handleUnlikePost } = FetchLikePost();

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("/api/posts/getPosts");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err?.response?.status === 400) {
          const lengthChar = err.response?.data?.message?.length || 5;
          toast.error(err?.response?.data?.message, {
            duration: lengthChar * 100,
          });
        } else {
          const lengthChar = err?.response?.statusText?.length || 5;
          toast.error(err?.response?.statusText, {
            duration: lengthChar * 100,
          });
        }
      }
    },
  });

  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get("/api/users/getUsers");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err?.response?.status === 400) {
          const lengthChar = err.response?.data?.message?.length || 5;
          toast.error(err?.response?.data?.message, {
            duration: lengthChar * 100,
          });
        } else {
          const lengthChar = err?.response?.statusText?.length || 5;
          toast.error(err?.response?.statusText, {
            duration: lengthChar * 100,
          });
        }
      }
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
      <div className="flex-1">
        <div>
          {!query?.isFetchedAfterMount ? (
            <Skeleton type="input-post" />
          ) : (
            <CreatePost isLoading={isLoading} setIsLoading={setIsloading} />
          )}
        </div>

        {!query?.isFetchedAfterMount ? (
          <div className="flex flex-col gap-10 mt-10">
            <Skeleton type="post" total={2} />
          </div>
        ) : query.status === "success" ? (
          <AllPost
            data={query?.data?.data}
            handleLikePost={handleLikePost}
            handleUnlikePost={handleUnlikePost}
          />
        ) : query?.isLoading ? (
          <div className="flex flex-col gap-10 mt-10">
            <Skeleton type="post" total={1} />
          </div>
        ) : (
          <h2 className="bg-red-200 text-center py-4 mt-10">
            Something went wrong :({" "}
          </h2>
        )}
      </div>

      <ListUserComponent data={userQuery?.data?.data} />
    </RootLayout>
  );
}
