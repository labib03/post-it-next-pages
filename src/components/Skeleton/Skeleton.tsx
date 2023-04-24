"use client";

import CommentSkeleton from "./CommentSkeleton";
import InputCommentSkeleton from "./InputCommentSkeleton";
import InputPostSkeleton from "./InputPostSkeleton";
import PostSkeleton from "./PostSkeleton";

type Props = {
  total?: number;
  type: "post" | "comment" | "input-post" | "input-comment";
};

function Skeleton({ total, type }: Props) {
  switch (type) {
    case "post":
      return (
        <>
          {[...Array(total)]?.map((item, idx) => (
            <PostSkeleton key={idx} />
          ))}
        </>
      );

    case "comment":
      return (
        <div className="flex flex-col gap-4">
          {[...Array(total)]?.map((item, idx) => (
            <CommentSkeleton key={idx} />
          ))}
        </div>
      );
    case "input-post":
      return <InputPostSkeleton />;

    case "input-comment":
      return <InputCommentSkeleton />;

    default:
      return <h1>Loading ...</h1>;
  }
}

export default Skeleton;
