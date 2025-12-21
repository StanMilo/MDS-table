import { TableSortLabel, styled } from "@mui/material";

export const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  "& .MuiTableSortLabel-icon": {
    opacity: 1,
    fontSize: "1.2rem",
  },
  "&:hover": {
    color:
      theme.palette.mode === "light"
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    "& .MuiTableSortLabel-icon": {
      opacity: 1,
    },
  },
  cursor: "pointer",
  "&.Mui-active": {
    color: "#ff9b4f",
    fontWeight: 700,
    "& .MuiTableSortLabel-icon": {
      opacity: 1,
      color: "#ff9b4f",
    },
  },
}));
