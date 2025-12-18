"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
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
