import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { makeServer } from "../../../packages/mirage/src/server";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  makeServer();
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
