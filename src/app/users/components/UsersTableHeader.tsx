import { TableHead, TableRow, TableCell } from "@mui/material";
import { translations } from "../../../translations";
import { StyledTableSortLabel } from "../../components/ui/StyledTableSortLabel";
import { hideOnMobile } from "./tableStyles";

interface UsersTableHeaderProps {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
}

export function UsersTableHeader({
  sortBy,
  sortOrder,
  onSort,
}: UsersTableHeaderProps) {
  const createSortHandler = (field: string) => () => {
    onSort(field);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          backgroundColor: "primary.main",
          "& .MuiTableCell-root": {
            color: "primary.contrastText",
            fontWeight: 600,
            backgroundColor: "primary.main",
          },
        }}
      >
        <TableCell>{translations.table.avatar}</TableCell>
        <TableCell>
          <StyledTableSortLabel
            active={sortBy === "firstName"}
            direction={sortBy === "firstName" ? sortOrder : "asc"}
            onClick={createSortHandler("firstName")}
          >
            {translations.table.firstName}
          </StyledTableSortLabel>
        </TableCell>
        <TableCell>
          <StyledTableSortLabel
            active={sortBy === "lastName"}
            direction={sortBy === "lastName" ? sortOrder : "asc"}
            onClick={createSortHandler("lastName")}
          >
            {translations.table.lastName}
          </StyledTableSortLabel>
        </TableCell>
        <TableCell>
          <StyledTableSortLabel
            active={sortBy === "email"}
            direction={sortBy === "email" ? sortOrder : "asc"}
            onClick={createSortHandler("email")}
          >
            {translations.table.email}
          </StyledTableSortLabel>
        </TableCell>
        <TableCell sx={hideOnMobile}>
          <StyledTableSortLabel
            active={sortBy === "country.name"}
            direction={sortBy === "country.name" ? sortOrder : "asc"}
            onClick={createSortHandler("country.name")}
          >
            {translations.table.country}
          </StyledTableSortLabel>
        </TableCell>
        <TableCell sx={hideOnMobile}>
          <StyledTableSortLabel
            active={sortBy === "role.name"}
            direction={sortBy === "role.name" ? sortOrder : "asc"}
            onClick={createSortHandler("role.name")}
          >
            {translations.table.role}
          </StyledTableSortLabel>
        </TableCell>
        <TableCell>{translations.table.actions}</TableCell>
      </TableRow>
    </TableHead>
  );
}
