"use client";

import {
  AllPostDashboard,
  RootLayout,
  Skeleton,
  SplashScreen,
} from "@/components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

function Dashboard() {
  const session = useSession();
  const router = useRouter();

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["posts-by-id"],
    queryFn: () => {
      return axios.get("/api/posts/getPostsById");
    },
  });

  const mutation = useMutation({
    mutationFn: (payload) => {
      return axios.post("/api/posts/deletePost", payload);
    },
    onSuccess: (data) => {
      toast.success("Yeay, post berhasil dihapus", {
        id: "success",
        position: "top-right",
      });
      // setIsLoading(false);
      // setInputValue("");
      queryClient.invalidateQueries({ queryKey: ["posts-by-id"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        const lengthChar = err.response?.data?.message?.length || "";
        toast.error(err?.response?.data?.message, {
          id: "error",
          duration: lengthChar * 100,
          position: "top-right",
        });
        // setIsLoading(false);
      }
    },
  });

  const deleteHandler = (payload: string) => {
    mutation.mutate({ id: payload });
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
      <div>All Post in This Account</div>
      {query.status === "loading" ? <Skeleton total={3} /> : null}
      {query.status === "success" && (
        <AllPostDashboard
          user={query?.data?.data || []}
          data={query?.data?.data?.post || []}
          deleteHandler={deleteHandler}
        />
      )}
    </RootLayout>
  );
}

export default Dashboard;
