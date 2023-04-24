import { Comment } from "@/helpers/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import "moment/locale/id";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {
  data: Comment[] | undefined;
  deleteHandler: (payload: string) => void;
};

function AllComment({ data, deleteHandler }: Props) {
  const [parent] = useAutoAnimate();
  const session = useSession();

  return (
    <div ref={parent} className="flex flex-col gap-4">
      {data?.map((item) => (
        <div key={item.id} className="w-fit">
          <div className="flex gap-3 items-start bg-sage-100/70 px-3 py-2 w-fit rounded-2xl">
            <Image
              src={item?.user?.image}
              alt="user-image"
              width={40}
              height={40}
              className="rounded-full"
            />

            <div className="flex-1">
              <div className="flex gap-2 items-center">
                <h2 className="text-sm tracking-wide font-bold">
                  {item?.user?.name}
                </h2>
              </div>

              <div>
                <h2 className="whitespace-pre-wrap">{item?.message}</h2>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-1 gap-2 px-3">
            <h2 className="text-xs tracking-wide">
              {moment(item?.createdAt).fromNow()}
            </h2>

            {session?.data?.user?.email === item?.user?.email ? (
              <div
                onClick={() => deleteHandler(item?.id)}
                className="hover:cursor-pointer flex items-center text-sm gap-1 px-1 rounded-full text-red-500 transition-all duration-200 hover:bg-red-200"
              >
                <TrashIcon className="h-3.5 w-3.5 text-red-500" /> delete
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllComment;
