"use client";

import { AUTHENTICATED } from "@/helpers/constants";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Loader from "../Loader/Loader";

function Navbar() {
  const data = useSession();
  const [isLoading, setIsloading] = useState(false);

  const signOutHandler = async () => {
    setIsloading(true);

    await signOut().then(() => {
      setIsloading(false);
    });
  };

  const renderComponent =
    data?.status?.toLowerCase() === AUTHENTICATED ? (
      isLoading ? (
        <Loader />
      ) : (
        <>
          <li className="flex gap-2">
            <Image
              src={data?.data?.user?.image || ""}
              width={24}
              height={24}
              alt="user-image"
              className="rounded-full"
            />

            <h1>{data?.data?.user?.name}</h1>
          </li>
          <li>
            <button
              onClick={signOutHandler}
              className="bg-red-200 border border-red-300 px-6 py-2 text-sm rounded-lg tracking-wide transition-all duration-200 hover:bg-red-300"
            >
              Sign Out
            </button>
          </li>
        </>
      )
    ) : (
      <button
        onClick={() => signIn()}
        className="bg-sage-200 border border-sage-300 px-6 py-2 rounded-lg tracking-wide transition-all duration-200 hover:bg-sage-100"
      >
        Sign In
      </button>
    );

  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-bold text-2xl">Send it.</h1>
      </Link>

      <ul className="list-none flex gap-6 items-center">
        {data?.status === "loading" ? <Loader /> : renderComponent}
      </ul>
    </nav>
  );
}

export default Navbar;
