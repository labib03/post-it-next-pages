import { Post, User } from "@/helpers/types";
import { ArrowUturnLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import NoDataComponent from "../NoDataComponent/NoDataComponent";
import { ChatBubbleLeftRightIcon, HeartIcon } from "@heroicons/react/24/solid";

type Props = {
  data: Post[];
  user?: User;
  deleteHandler: (payload: string) => void;
};

function AllPostDashboard({ data, user, deleteHandler }: Props) {
  return (
    <div className="flex flex-col gap-10 mt-10 ">
      {data.length > 0 ? (
        data?.map((item) => (
          <div
            key={item?.id}
            className="w-full bg-sage-100 rounded-lg shadow-lg shadow-sage-100 px-6 py-6"
          >
            <div className="flex items-center gap-2">
              <Image
                src={user?.image || ""}
                alt="user-image"
                className="rounded-full"
                width={30}
                height={30}
              />

              <h2 className="text-lg tracking-wide text-gallery-950">
                {user?.name}
              </h2>
            </div>

            <div className="text-xs tracking-wide mt-3 text-slate-500">
              <span className="font-semibold">
                {moment(item?.createdAt).fromNow()}
              </span>{" "}
              - <span className="text-black">{user?.email}</span>
            </div>

            <div className="mt-4 w-full bg-light/60 px-4 py-2 rounded-lg">
              <pre
                className={`font-sans whitespace-pre-wrap leading-relaxed text-base tracking-wide`}
              >
                {item?.title}
              </pre>
            </div>

            <div className="flex flex-row items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <Link
                  className="flex items-center gap-1 text-sm tracking-wide bg-champagne-200/90 py-1 px-3 rounded-lg transition-all duration-200 hover:bg-champagne-300"
                  href={{
                    pathname: `/post/${item?.id}`,
                    query: { id: item?.id },
                  }}
                >
                  <span>
                    <ArrowUturnLeftIcon className="w-4" />
                  </span>
                  Reply
                </Link>
                <h2 className="flex items-center gap-1 text-sm tracking-wide">
                  <span>
                    <ChatBubbleLeftRightIcon className="w-5 text-sage-400" />
                  </span>
                  {item?.comment?.length}
                  <span>Komentar</span>
                </h2>
                <h2 className="flex items-center gap-1 text-sm">
                  <span>
                    <HeartIcon className="w-5 text-red-400" />
                  </span>
                  {item?.like?.length}
                  <span>Like</span>
                </h2>
              </div>

              <div>
                <button
                  onClick={() => deleteHandler(item?.id)}
                  className="flex items-center gap-1 text-sm bg-red-200 px-3 py-1 rounded-md text-red-400 transition-all duration-200 hover:bg-red-400 hover:text-white"
                >
                  <span>
                    <TrashIcon className="w-4" />
                  </span>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <NoDataComponent type="post" />
      )}
    </div>
  );
}

export default AllPostDashboard;
