"use client";

import {
  AllPost,
  CreatePost,
  RootLayout,
  Skeleton,
  SplashScreen,
} from "@/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const client = useQueryClient();

  const [isLoading, setIsloading] = useState(false);

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

  const mutation = useMutation({
    mutationFn: (payload: {
      name: string | undefined | null;
      postId: string;
      type: string;
    }) => {
      return axios.post("/api/posts/handleLike", payload);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const handleLikePost = (payload: {
    name: string | undefined | null;
    postId: string;
    type: string;
  }) => {
    mutation.mutate(payload);
  };

  const handleUnlikePost = (payload: {
    name: string | undefined | null;
    postId: string;
    type: string;
  }) => {
    mutation.mutate(payload);
  };

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
    </RootLayout>
  );
}
