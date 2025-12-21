import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
} from "@mui/material";
import { useEffect, useRef } from "react";
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
  const tableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0;
    }
  }, [sortBy, sortOrder]);

  return (
    <TableContainer
      ref={tableContainerRef}
      component={Paper}
      sx={{
        maxHeight: "calc(100vh - 110px)",
        overflowY: "auto",
        overflowX: "auto",
        maxWidth: "100%",
        boxShadow: 2,
        position: "relative",
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
