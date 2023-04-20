"use client";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Montserrat, Roboto } from "next/font/google";

interface User {
  email: string;
  emailVerified: any;
  id: string;
  image: string;
  name: string;
}

interface Post {
  createdAt: string;
  id: string;
  published: boolean;
  title: string;
  updatedAt: string;
  userId: string;
  user: User;
}

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
    <div ref={parent} className="flex flex-col gap-10 mt-10 ">
      {data.length > 0 &&
        data?.map((item) => (
          <div
            key={item?.id}
            className="w-full bg-sage-100 border-2 border-sage-200 rounded-lg shadow-lg shadow-sage-100 px-6 py-6"
          >
            <div className="flex items-center gap-2">
              <Image
                src={item?.user?.image}
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
                {moment(item?.createdAt).startOf("day").fromNow()}
              </span>{" "}
              - <span className="text-black">{item?.user?.email}</span>
            </div>

            <div className="mt-4 w-full bg-light border-2 border-sage-200 px-4 py-2 rounded-lg">
              <pre
                className={`${montserrat.variable} font-sans whitespace-pre-wrap leading-relaxed text-base tracking-wide`}
              >
                {item?.title}
              </pre>
            </div>

            <Link
              className="text-sm tracking-wide inline-block mt-5 bg-champagne-200 border border-champagne-300 py-1 px-2 rounded-lg transition-all duration-200 hover:bg-champagne-300"
              href={`/posts/${item?.id}`}
            >
              Comment
            </Link>
          </div>
        ))}
    </div>
  );
}

export default AllPost;
