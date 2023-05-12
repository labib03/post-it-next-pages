import { User } from "@/helpers/types";
import Image from "next/image";
import React from "react";

type Props = {
  data: User[];
};

export default function ListUserComponent({ data }: Props) {
  return (
    <div className="bg-slate-100 h-max w-64 rounded-lg px-4 py-4 absolute top-24 right-4">
      <h1 className="text-lg font-semibold text-center mb-3">List of Users</h1>
      <ul className="flex flex-col gap-2">
        {data?.map((user) => (
          <li
            key={user.id}
            className="flex gap-2 items-center border px-2 py-1 bg-slate-200 rounded-xl"
          >
            <Image
              src={user.image}
              alt="user-image"
              width={30}
              height={30}
              className="rounded-full"
            />
            <h2 className="text-sm tracking-wide">{user.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
