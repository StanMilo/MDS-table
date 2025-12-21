import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";
import { User } from "../../../types/user";
import { PAGINATION } from "../../../lib/constants/pagination";
import { UsersTableHeader } from "./UsersTableHeader";
import { UserTableRow } from "./UserTableRow";

interface DesktopUsersTableProps {
  users: User[];
  totalCount: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (
    userId: string,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function DesktopUsersTable({
  users,
  totalCount,
  page,
  limit,
  sortBy,
  sortOrder,
  onSort,
  onPageChange,
  onRowsPerPageChange,
  onDelete,
}: DesktopUsersTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflowX: "auto",
        maxWidth: "100%",
        boxShadow: 2,
      }}
    >
      <Table size="small">
        <UsersTableHeader
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={onSort}
        />
        <TableBody>
          {users.map((user) => (
            <UserTableRow key={user.id} user={user} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalCount}
        page={page - 1}
        onPageChange={onPageChange}
        rowsPerPage={limit}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={PAGINATION.ROWS_PER_PAGE_OPTIONS}
      />
    </TableContainer>
  );
}
