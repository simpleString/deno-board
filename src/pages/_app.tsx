import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api, getBaseUrlAbsolute } from "Y/utils/api";

import { ThemeProvider } from "Y/components/theme-provider";
import "Y/styles/globals.css";
import { JetBrains_Mono as JetBrains } from "next/font/google";
import Head from "next/head";

export const jetBrains = JetBrains({
  subsets: ["latin", "cyrillic"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <div className={jetBrains.className}>
      <Head>
        <title>Deno board</title>
        <meta
          name="description"
          content="Deno board - a simple editor with markdown support"
        />
        <meta name="keywords" content="note, markdown, editor, offline" />

        <meta
          property="og:title"
          content="Deno board - a simple editor with markdown support"
        />
        <meta
          property="og:image"
          content={`${getBaseUrlAbsolute()}/assets/dino.png`}
        />

        <meta
          property="og:description"
          content="And a social description for our cool page"
        />
        <meta property="og:image:alt" content="Deno board" />

        <meta
          property="twitter:title"
          content="Deno board - a simple editor with markdown support"
        />
        <meta
          name="twitter:image"
          content={`${getBaseUrlAbsolute()}/assets/dino.png`}
        />
        <meta property="twitter:image:alt" content="Deno board" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="favicons/favicon-16x16.png"
        />
        <link rel="manifest" href="favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
