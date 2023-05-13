"use client";

import Image from "next/image";
import { FormEvent, ReactElement, useEffect } from "react";
import bgAuth from "../../../public/assets/bg-login.jpg";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { SplashScreen } from "@/components";

function AuthScreen() {
  const router = useRouter();
  const session = useSession();

  const signInHandler = async (event: FormEvent) => {
    event.preventDefault();
    signIn();
  };

  if (session.status === "loading") {
    return <SplashScreen />;
  }

  if (session.status === "authenticated") {
    setTimeout(() => {
      router.push({
        pathname: "/",
      });
    }, 1000);

    return <SplashScreen />;
  }

  return (
    <div className="w-screen h-screen flex overflow-hidden">
      <div className="bg-champagne-200 flex-1 flex flex-col justify-center items-center px-6">
        <div className="flex flex-col gap-3 items-start">
          <h1 className="text-3xl font-semibold">Selamat Datang</h1>
          <h1 className="tracking-wide text-base md:w-4/5">
            Anda harus login terlebih dahulu untuk melanjutkan
          </h1>
          <button
            onClick={signInHandler}
            className="px-5 py-2 border-2 mt-3  w-4/5 border-champagne-200 bg-champagne-400 rounded-md tracking-wide"
          >
            Login
          </button>
        </div>
      </div>
      <div className="bg-champagne-50 flex-1 hidden md:block">
        <Image src={bgAuth} alt="bg-auth-image" className="w-full h-screen" />
      </div>
    </div>
  );
}

AuthScreen.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default AuthScreen;
