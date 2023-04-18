import { AUTHENTICATED } from "@/helpers/constants";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Loader from "../Loader/Loader";

function Navbar() {
  const data = useSession();

  const renderComponent =
    data?.status?.toLowerCase() === AUTHENTICATED ? (
      <>
        <li>
          <h1>{data?.data?.user?.name}</h1>
        </li>
        <li>
          <Image
            src={data?.data?.user?.image || ""}
            width={24}
            height={24}
            alt="user-image"
            className="rounded-full"
          />
        </li>
        <li>
          <button
            onClick={() => signOut()}
            className="bg-light px-6 py-2 text-primary rounded-lg tracking-wide transition-all duration-200 hover:bg-primary hover:text-light"
          >
            Sign Out
          </button>
        </li>
      </>
    ) : (
      <button
        onClick={() => signIn()}
        className="bg-dark px-6 py-2 text-white rounded-lg tracking-wide transition-all duration-200 hover:bg-secondary"
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
