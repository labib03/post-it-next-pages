import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export default function FetchLikePost() {
  const client = useQueryClient();
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

  return { mutation, handleLikePost, handleUnlikePost };
}
