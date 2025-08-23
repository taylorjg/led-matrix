import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { App } from "@app/app.jsx";

const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: "dark",
    },
  })
);

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
