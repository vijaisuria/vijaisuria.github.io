import "@/common/styles/global.css";

import localFont from "@next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { MotionConfig } from "framer-motion";
import type { AppProps } from "next/app";
import Head from "next/head";

import { ThemeProvider } from "@/modules/themeContext";
import { MouseVariantProvider } from "@/modules/customMouse";

const ArticulatCF = localFont({
  src: "../common/fonts/ArticulatCF-Bold.otf",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Vijai Suria | SDE</title>
        <meta
          name="description"
          content="Portoflio site of Software Developer Vijai Suria."
        />
        <meta
          name="keywords"
          content="vijaisuria, vijai suria, vijai, suria, sde, anna, university, mit"
        />
        <meta
          name="google-site-verification"
          content="fZIGN9tZ-qZQT9oPQRkI0K-gzZc4XkbzeJmMHUH0hoc"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="__font" className={ArticulatCF.className}>
        <MotionConfig
          transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1 }}
        >
          <ThemeProvider>
            <MouseVariantProvider>
              <Component {...pageProps} />
            </MouseVariantProvider>
          </ThemeProvider>
        </MotionConfig>
      </div>
      <Analytics />
    </>
  );
}
