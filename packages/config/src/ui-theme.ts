import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const uiTheme = extendTheme({
  config,
  colors: {
    olive: {
      50: "#fbfbf6",
      100: "#f2f3e3",
      200: "#e2e5b8",
      300: "#cfd68a",
      400: "#aeb85f",
      500: "#878c45",
      600: "#6e7238",
      700: "#56592c",
      800: "#3e401f",
      900: "#262813",
    },

    beige: {
      50: "#fffcf9",
      100: "#fdf7f1",
      200: "#f9ede2",
      300: "#f4e2d2",
      400: "#eed6c1",
      500: "#fbf1e8",
      600: "#d9cfc6",
      700: "#b3a79f",
      800: "#8c817b",
      900: "#5e5550",
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
