import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { makeServer } from "@chore-champ/mirage";

declare global {
  interface Window {
    __mirage__?: unknown;
  }
}

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (typeof window === "undefined") return;
    if (!window.__mirage__) {
      console.log("a");
      window.__mirage__ = makeServer({
        sheetUrl: process.env.NEXT_PUBLIC_CHOREHCAMP_SHEET_URL,
      });
      console.log("b");
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
