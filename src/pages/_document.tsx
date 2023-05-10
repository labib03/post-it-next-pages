/* eslint-disable @next/next/no-title-in-document-head */
import { ServerStyles, createStylesServer } from "@mantine/next";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { rtlCache } from "./rtl-chache";

const stylesServer = createStylesServer(rtlCache);

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }

  render() {
    return (
      <Html>
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
}
