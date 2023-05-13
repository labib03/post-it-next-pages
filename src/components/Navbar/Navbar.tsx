"use client";

import { AUTHENTICATED } from "@/helpers/constants";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Loader from "../Loader/Loader";
import {
  ArrowLeftOnRectangleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const data = useSession();
  const [isLoading, setIsloading] = useState(false);

  const signOutHandler = async () => {
    setIsloading(true);

    await signOut().then(() => {
      setTimeout(() => {
        setIsloading(false);
      }, 100);
    });
  };

  const renderComponent =
    data?.status?.toLowerCase() === AUTHENTICATED ? (
      isLoading ? (
        <Loader borderColor="border-sage-400" text="Loading" />
      ) : (
        <>
          <li className="md:bg-slate-100 md:px-3 md:py-2 md:rounded-full md:border md:border-slate-200/60 transition-all duration-200 md:hover:bg-slate-200/80 hover:cursor-pointer">
            <Link className="flex gap-2" href={"/dashboard"}>
              <Image
                src={data?.data?.user?.image || ""}
                width={100}
                height={100}
                alt="user-image"
                className="rounded-full w-9 h-9 md:w-6 md:h-6"
              />

              <h1 className="hidden md:flex">{data?.data?.user?.name}</h1>
            </Link>
          </li>
          <li>
            <button
              onClick={signOutHandler}
              className="flex flex-row items-center gap-2 bg-red-200 border border-red-300 p-2 md:px-5 md:py-2 text-sm rounded-full tracking-wide transition-all duration-200 hover:bg-red-300"
            >
              <ArrowLeftOnRectangleIcon className="w-5" />
              <span className="hidden md:block">Sign Out</span>
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
    <nav className="sticky top-4 z-[9999] flex justify-between items-center mt-4 mb-6 mx-4 rounded-full py-3 px-8 bg-white/50 backdrop-blur-sm">
      {isLoading && (
        <div className="fixed inset-0 bg-slate-50 opacity-50 z-50"></div>
      )}
      <Link className="flex flex-row items-center gap-2" href={"/"}>
        <PaperAirplaneIcon className="w-6 h-6 md:w-7 md:h-7" />
        <h1 className="font-bold text-xl md:text-2xl">Post it.</h1>
      </Link>

      <ul className="list-none flex gap-2 items-center">
        {data?.status === "loading" ? (
          <Loader borderColor="border-sage-300" text="Loading" />
        ) : (
          renderComponent
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
