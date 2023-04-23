import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";

type Props = {
  postId?: string | string[] | undefined;
};

function CreateComment({ postId }: Props) {
  const [inputValue, setInputValue] = useState("");

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/posts/addComment", {
        message: inputValue,
        postId: postId,
      });
    },
    onSuccess: () => {
      setInputValue("");
      toast?.success("Berhasil mengirim komentar");
      client.invalidateQueries({ queryKey: ["post-detail"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <div className="w-auto bg-sage-100 border-2 border-sage-200 px-6 py-3 rounded-lg">
      <textarea
        placeholder="write a comment ..."
        rows={2}
        value={inputValue}
        className="w-full px-4 py-2 bg-light shadow-md shadow-sage-100 rounded-lg border-2 border-sage-200 transition-all duration-200 focus:outline-none focus:border-light placeholder:italic"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setInputValue(e?.target?.value)
        }
      />
      <button
        onClick={submitHandler}
        disabled={mutation?.isLoading}
        className="bg-sage-300 px-3 py-1 rounded-md border border-sage-400 mt-2 transition-all duration-200 hover:bg-sage-200 disabled:cursor-auto disabled:bg-stone-300 disabled:border-stone-400/50"
      >
        {mutation?.status === "loading" ? (
          <Loader borderColor="border-white" text="Loading" />
        ) : (
          "Post a comment"
        )}
      </button>
    </div>
  );
}

export default CreateComment;
