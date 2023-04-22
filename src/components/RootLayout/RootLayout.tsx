"use client";

import React from "react";
import Navbar from "../Navbar/Navbar";

type Props = {
  children?: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <div className="mx-8 xl:mx-72 mb-12">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default RootLayout;
