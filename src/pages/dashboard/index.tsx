"use client";

import {
  AllPostDashboard,
  ModalConfirmationDelete,
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

function Dashboard() {
  const session = useSession();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState("");

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["posts-by-id"],
    queryFn: () => {
      return axios.get("/api/posts/getPostsByUserId");
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
    mutationFn: () => {
      return axios.post("/api/posts/deletePost", { id: postId });
    },
    onSuccess: () => {
      toast.success("Post berhasil dihapus", {
        id: "success",
      });
      setShowModal(false);
      queryClient.invalidateQueries({ queryKey: ["posts-by-id"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        const lengthChar = err.response?.data?.message?.length || "";
        toast.error(err?.response?.data?.message, {
          id: "error",
          duration: lengthChar * 100,
        });
        setShowModal(false);
      }
    },
  });

  const deleteHandler = (payload: string) => {
    setShowModal(!showModal);
    setPostId(payload);
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
      <div className="bg-white px-4 py-6 rounded-lg">
        <div className="w-full text-center">
          <h1 className="font-semibold text-lg tracking-wide">
            All Post in This Account
          </h1>
        </div>
        {showModal && (
          <ModalConfirmationDelete
            showModal={showModal}
            setShowModal={setShowModal}
            onDelete={() => mutation.mutate()}
            isLoading={mutation?.status === "loading"}
            type="postingan"
          />
        )}
        {query.isFetching ? (
          <div className="flex flex-col gap-10 mt-10">
            <Skeleton type="post" total={3} />
          </div>
        ) : query.status === "success" ? (
          <AllPostDashboard
            data={query?.data?.data || []}
            deleteHandler={(payload: string) => deleteHandler(payload)}
          />
        ) : query?.isLoading ? (
          <div className="flex flex-col gap-10 mt-10">
            <Skeleton type="post" total={2} />
          </div>
        ) : (
          <h2 className="bg-red-200 text-center py-4 mt-10">
            Something went wrong :({" "}
          </h2>
        )}
      </div>
    </RootLayout>
  );
}

export default Dashboard;
