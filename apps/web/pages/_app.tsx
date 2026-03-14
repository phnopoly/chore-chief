import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import "@chore-champ/mirage";
import { uiTheme } from "@chore-champ/config";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={uiTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
