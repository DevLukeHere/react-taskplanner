import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "1rem"
        }
      }
    }
  },
  palette: {
    primary: {
      light: "ff9b3f",
      main: "#ff6a00",
      dark: "c43800",
    },
    secondary: {
      light: "#4f5b62",
      main: "#263238",
      dark: "#000a12",
    },
    tertiary: {
      light: "#ffffff",
      main: "#f5f5f5",
      dark: "#c2c2c2",
    },
  },
});
