"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
      light: "#e33371",
      dark: "#9a0036",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    error: {
      main: "#d32f2f",
    },
    text: {
      primary: "#1a202c",
      secondary: "#4a5568",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "action" },
          style: ({ theme }) => ({
            height: 40,
            border: `1px solid ${theme.palette.divider}`,
            "&:hover": {
              border: `1px solid ${theme.palette.text.primary}`,
            },
          }),
        },
        {
          props: { variant: "table" },
          style: {
            height: 28,
            minWidth: "auto",
            fontSize: "0.7rem",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            paddingX: 1,
          },
        },
      ],
    },
  },
});

export default theme;
