import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import "../styles/globals.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider value={defaultSystem}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
