"use client";

import { Post } from "@/helpers/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NoDataComponent from "../NoDataComponent/NoDataComponent";
import PostComponent from "../PostComponent/PostComponent";
import { useEffect, useRef } from "react";
import autoAnimate from "@formkit/auto-animate";

type Params = {
  name: string | undefined | null;
  postId: string;
  type: string;
};

type Props = {
  data: Post[];
  handleLikePost: (params: Params) => void;
  handleUnlikePost: (params: Params) => void;
};

function AllPost({ data, handleLikePost, handleUnlikePost }: Props) {
  const parent = useRef(null);

  console.log("first");

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <div ref={parent} className="flex flex-col gap-10 mt-10">
      {data.length > 0 ? (
        data?.map((item) => (
          <PostComponent
            key={item?.id}
            item={item}
            handleLikePost={handleLikePost}
            handleUnlikePost={handleUnlikePost}
          />
        ))
      ) : (
        <NoDataComponent type="post" />
      )}
    </div>
  );
}

export default AllPost;
