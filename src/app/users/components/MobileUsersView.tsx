import { Box, Paper, TablePagination } from "@mui/material";
import { User } from "../../../types/user";
import { PAGINATION } from "../../../lib/constants/pagination";
import { MobileSortHeader } from "./MobileSortHeader";
import { UserCard } from "./UserCard";

interface MobileUsersViewProps {
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

export function MobileUsersView({
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
}: MobileUsersViewProps) {
  return (
    <Box>
      <MobileSortHeader sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete} />
      ))}
      <Paper sx={{ p: 2, mt: 2 }}>
        <TablePagination
          component="div"
          count={totalCount}
          page={page - 1}
          onPageChange={onPageChange}
          rowsPerPage={limit}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={PAGINATION.ROWS_PER_PAGE_OPTIONS}
          labelRowsPerPage="Rows:"
        />
      </Paper>
    </Box>
  );
}
