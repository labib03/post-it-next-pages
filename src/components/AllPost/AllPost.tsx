"use client";

import { Post } from "@/helpers/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import moment from "moment";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: Post[];
};

const montserrat = Montserrat({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

function AllPost({ data }: Props) {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent} className="flex flex-col gap-10 mt-10">
      {data.length > 0 ? (
        data?.map((item) => (
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
                className={`${montserrat.variable} font-sans whitespace-pre-wrap leading-relaxed text-base tracking-wide`}
              >
                {item?.title}
              </pre>
            </div>

            <div className="flex items-center mt-4 gap-3">
              <Link
                className="text-sm tracking-wide inline-block bg-champagne-200/90 py-1 px-3 rounded-lg transition-all duration-200 hover:bg-champagne-300/80"
                href={{
                  pathname: `/post/${item?.id}`,
                  // query: { id: item?.id },
                }}
              >
                Reply
              </Link>
              <h2 className="text-sm tracking-wide">
                {item?.comment?.length} Comment
              </h2>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-champagne-200 border-2 border-champagne-400 py-4 rounded-lg">
          <h2 className="text-center">No post yet.</h2>
        </div>
      )}
    </div>
  );
}

export default AllPost;
