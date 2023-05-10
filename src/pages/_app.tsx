import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const client = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={client}>
      <SessionProvider session={session}>
        <MantineProvider
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
          }}
        >
          <Toaster position="bottom-center" />
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
