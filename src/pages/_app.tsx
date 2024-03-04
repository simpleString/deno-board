import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "Y/utils/api";

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
        <meta property="og:image" content="/assets/dino.png" />
        <meta property="og:image:alt" content="Deno board" />

        <meta name="twitter:image" content="/assets/dino.png" />
        <meta property="twitter:image:alt" content="Deno board" />
      </Head>
      ;
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
