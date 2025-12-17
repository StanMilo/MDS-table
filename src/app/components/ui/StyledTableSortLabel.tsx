import { TableSortLabel, styled } from "@mui/material";

export const StyledTableSortLabel = styled(TableSortLabel)(({ theme }) => ({
  "& .MuiTableSortLabel-icon": {
    opacity: 1,
    fontSize: "1.2rem",
  },
  "&:hover": {
    color: theme.palette.primary.main,
  },
  cursor: "pointer",
}));
