import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import "@chore-champ/mirage/init";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    olive: {
      50: "#f9fbf7",
      100: "#edf3e6",
      200: "#d6e2c9",
      300: "#b8cda7",
      400: "#8faa78",
      500: "#6B7A5A",
      600: "#49553d",
      700: "#343e2c",
      800: "#21281c",
      900: "#0f140e",
    },

    beige: {
      50: "#fffdfb",
      100: "#f9f1e7",
      200: "#efdcc8",
      300: "#e4c6a7",
      400: "#d3a77f",
      500: "#DAC4AA",
      600: "#b28f72",
      700: "#8a6a54",
      800: "#5e473a",
      900: "#352720",
    },

    dark: {
      50: "#f5f5f5",
      100: "#e6e6e6",
      200: "#cccccc",
      300: "#a8a8a8",
      400: "#7a7a7a",
      500: "#1F1F1F",
      600: "#141414",
      700: "#0e0e0e",
      800: "#070707",
      900: "#020202",
    },
  },
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
