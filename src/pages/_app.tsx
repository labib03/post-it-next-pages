import { Navbar } from "@/components";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "700", "300"],
  subsets: ["latin"],
});

const client = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
