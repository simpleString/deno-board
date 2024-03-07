import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { env } from "Y/env.js";
import { api } from "Y/utils/api";

import { PWALifeCycle } from "Y/components/PWALifeCycle";
import { ThemeProvider } from "Y/components/theme-provider";
import { TooltipProvider } from "Y/components/ui/tooltip";
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

        <meta property="og:title" content="Deno board" />
        <meta
          property="og:image"
          content={`https://${env.NEXT_PUBLIC_DOMAIN}/assets/dino.png`}
        />

        <meta
          property="og:description"
          content="Deno board - a simple editor with markdown support"
        />
        <meta property="og:image:alt" content="Deno board" />
        <meta property="og:url" content="Deno board" />

        <meta property="twitter:card" content="app" />
        <meta
          property="twitter:title"
          content="Deno board - a simple editor with markdown support"
        />
        <meta
          property="twitter:description"
          content="Deno board - a simple editor with markdown support"
        />
        <meta
          name="twitter:image"
          content={`https://${env.NEXT_PUBLIC_DOMAIN}/assets/dino.png`}
        />
        <meta property="twitter:image:alt" content="Deno board" />
        <meta property="og:url" content="Deno board" />

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
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <PWALifeCycle />
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Component {...pageProps} />
          </TooltipProvider>
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
};

export default api.withTRPC(MyApp);
