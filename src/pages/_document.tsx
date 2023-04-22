/* eslint-disable @next/next/no-title-in-document-head */
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Post It.</title>
      </Head>
      <body className=" bg-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
