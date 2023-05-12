"use client";

import React from "react";
import Navbar from "../Navbar/Navbar";

type Props = {
  children?: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <div className="relative">
      <Navbar />
      <main className="mx-8 xl:mx-72 mb-12 bg-white px-4 py-6 rounded-lg">
        {/* <main className="flex flex-row gap-4 relative mx-8 mb-12 bg-white px-4 py-6 rounded-lg"> */}
        {children}
      </main>
    </div>
  );
}

export default RootLayout;
