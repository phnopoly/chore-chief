import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import "@chore-chief/mirage";
import { uiTheme } from "@chore-chief/config";
import { SetupProvider } from "@chore-chief/forms";
import GlobalLayout from "../src/GlobalLayout";

const App = ({ Component, pageProps, router }: AppProps) => {
  const isSetupRoute = router.pathname.startsWith("/setup");

  return (
    <ChakraProvider theme={uiTheme}>
      <GlobalLayout>
        {isSetupRoute ? (
          <SetupProvider>
            <Component {...pageProps} />
          </SetupProvider>
        ) : (
          <Component {...pageProps} />
        )}
      </GlobalLayout>
    </ChakraProvider>
  );
};

export default App;
