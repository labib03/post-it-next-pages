import { User } from "@/helpers/types";
import { UserIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mantine/core";
import Image from "next/image";

type Props = {
  data: User[];
};

export default function ListUserComponent({ data }: Props) {
  return (
    // <div className="bg-white h-max w-max rounded-full xl:rounded-lg px-4 py-4 static xl:absolute xl:top-0 xl:right-0">
    <div className="flex xl:flex-col items-center gap-2 bg-white h-max w-max rounded-full xl:rounded-lg px-4 py-4">
      {/* <div className="bg-slate-100 h-max w-64 rounded-lg px-4 py-4"> */}
      <h1 className="text-md xl:text-lg xl:font-semibold tracking-wide text-center xl:mb-3 hidden sm:block lg:hidden xl:block">
        List of Users
      </h1>
      <ul className="flex flex-row lg:flex-col items-center xl:items-start gap-4 overflow-auto xl:overflow-hidden">
        <li className="border-0 lg:border-b lg:border-b-black lg:pb-3 hidden lg:block xl:hidden">
          <Tooltip label="List of users" position="left">
            <UserIcon className="w-8" />
          </Tooltip>
        </li>

        {data?.map((user) => (
          <li key={user.id}>
            <Tooltip
              label={user?.name}
              position="left"
              sx={{
                "@media (min-width: 1280px)": {
                  display: "none",
                },
              }}
            >
              <div className="flex gap-2 items-center">
                <Image
                  src={user.image}
                  alt="user-image"
                  width={100}
                  height={100}
                  quality={100}
                  className="rounded-full w-10"
                />
                <h2 className="text-sm tracking-wide hidden xl:block">
                  {user.name}
                </h2>
              </div>
            </Tooltip>
          </li>
        ))}
      </ul>
    </div>
  );
}
