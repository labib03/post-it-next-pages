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
      <div>All Post in This Account</div>
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
          user={query?.data?.data || []}
          data={query?.data?.data?.post || []}
          deleteHandler={(payload: string) => deleteHandler(payload)}
        />
      ) : null}
    </RootLayout>
  );
}

export default Dashboard;
