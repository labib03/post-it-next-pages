import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="mx-4 md:mx-48 xl:mx-96 bg-light">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
