import removeImports from "next-remove-imports";
import withPWAInit from "@ducanh2912/next-pwa";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const withPWA = withPWAInit({
  dest: "public",
});

/** @type {function(import("next").NextConfig): import("next").NextConfig}} */
const removeImportsFun = removeImports({
  // test: /node_modules([\s\S]*?)\.(tsx|ts|js|mjs|jsx)$/,
  // matchImports: "\\.(less|css|scss|sass|styl)$"
});

/** @type {import("next").NextConfig} */
const config = withPWA(
  removeImportsFun({
    reactStrictMode: true,

    /**
     * If you are using `appDir` then you must comment the below `i18n` config out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
      locales: ["en"],
      defaultLocale: "en",
    },
    webpack: function (config) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      config.module.rules.push({
        test: /\.md$/,
        use: "raw-loader",
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return config;
    },
  }),
);

export default config;
