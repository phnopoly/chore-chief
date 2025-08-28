import type { AppProps } from "next/app";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider value={defaultSystem}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default App;
