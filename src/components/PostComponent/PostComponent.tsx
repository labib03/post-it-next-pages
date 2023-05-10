/* eslint-disable react-hooks/exhaustive-deps */
import { Post } from "@/helpers/types";
import {
  ArrowUturnLeftIcon,
  HeartIcon as HeartOutlineIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleLeftRightIcon,
  HeartIcon as HeartSolidIcon,
} from "@heroicons/react/24/solid";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  item: Post;
  handleLikePost: (params: {
    name: string | undefined;
    postId: string;
  }) => void;
};

function PostComponent({ item, handleLikePost }: Props) {
  const session = useSession();
  const [isLike, setIsLike] = useState(false);
  const [totalLike, setTotalLike] = useState(0);

  useEffect(() => {
    if (item?.like) {
      setTotalLike(item?.like?.length);
      for (const key of item?.like) {
        if (key?.name === session?.data?.user?.name) {
          setIsLike(true);
        }
      }
    }
  }, []);

  const handleLike = () => {
    if (!isLike) {
      setIsLike(true);
      setTotalLike((like) => like + 1);
    } else {
      setIsLike(false);
      setTotalLike((like) => like - 1);
    }
  };

  const handleLikebackup = () => {
    if (item?.like?.length > 0) {
      for (const key of item?.like) {
        if (key?.name === session?.data?.user?.name) {
          return toast.error("Akun ini sudah memberi like pada postingan ini");
        } else {
          setIsLike(true);
          if (!isLike) {
            setTotalLike((like) => like + 1);
            handleLikePost({ name: item?.user?.name, postId: item?.id });
          }
        }
      }
    } else {
      setIsLike(true);
      if (!isLike) {
        setTotalLike((like) => like + 1);
        handleLikePost({ name: item?.user?.name, postId: item?.id });
      }
    }
  };

  return (
    <div
      key={item?.id}
      className="w-full bg-sage-100/80 rounded-lg shadow-lg shadow-sage-100 px-6 py-6"
    >
      <div className="flex items-center gap-2">
        <Image
          src={item?.user?.image || ""}
          alt="user-image"
          className="rounded-full"
          width={30}
          height={30}
        />

        <h2 className="text-lg tracking-wide text-gallery-950">
          {item?.user?.name}
        </h2>
      </div>

      <div className="text-xs tracking-wide mt-3 text-slate-500">
        <span className="font-semibold">
          {moment(item?.createdAt).fromNow()}
        </span>{" "}
        - <span className="text-black">{item?.user?.email}</span>
      </div>

      <div className="mt-4 w-full bg-light/60 px-4 py-2 rounded-lg">
        <pre
          className={`font-sans whitespace-pre-wrap leading-relaxed text-base tracking-wide`}
        >
          {item?.title}
        </pre>
      </div>

      <div className="flex items-center mt-4 gap-3">
        <Link
          className="flex flex-row items-center gap-1.5 text-sm tracking-wide bg-champagne-200/90 py-1 px-3 rounded-lg transition-all duration-200 hover:bg-champagne-300/80"
          href={{
            pathname: `/post/${item?.id}`,
            // query: { id: item?.id },
          }}
        >
          <span>
            <ArrowUturnLeftIcon className="w-4" />
          </span>
          Reply
        </Link>

        <h2 className="flex flex-row items-center gap-1 text-sm tracking-wide">
          {item?.comment?.length}
          <span>
            <ChatBubbleLeftRightIcon className="w-5 text-sage-400" />
          </span>
        </h2>

        <div className="hover:cursor-pointer" onClick={handleLike}>
          <h2 className="flex items-center gap-1 text-sm">
            {totalLike}
            {isLike ? (
              <span>
                <HeartSolidIcon className="w-5 text-red-400" />
              </span>
            ) : (
              <span>
                <HeartOutlineIcon className="w-5" />
              </span>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default PostComponent;
