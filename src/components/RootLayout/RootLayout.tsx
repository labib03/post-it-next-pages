"use client";

import React from "react";
import Navbar from "../Navbar/Navbar";

type Props = {
  children?: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      <main className="mx-8 xl:mx-72 mb-12 bg-white px-4 py-6 rounded-lg">
        {children}
      </main>
    </div>
  );
}

export default RootLayout;
