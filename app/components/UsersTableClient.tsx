"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Avatar,
} from "@mui/material";
import { PAGINATION } from "../constants";
import { translations } from "../translations";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
  country: {
    id: number;
    name: string;
  };
  role: {
    id: number;
    name: string;
  };
}

interface UsersTableClientProps {
  users: User[];
  totalCount: number;
  page: number;
  limit: number;
}

export default function UsersTableClient({
  users,
  totalCount,
  page,
  limit,
}: UsersTableClientProps) {
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    router.push(`/?page=${newPage + 1}&limit=${limit}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    router.push(`/?page=1&limit=${newLimit}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>{translations.table.avatar}</TableCell>
            <TableCell>{translations.table.firstName}</TableCell>
            <TableCell>{translations.table.lastName}</TableCell>
            <TableCell>{translations.table.email}</TableCell>
            <TableCell>{translations.table.country}</TableCell>
            <TableCell>{translations.table.role}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} hover>
              <TableCell>
                <Avatar
                  src={user.avatar || undefined}
                  alt={`${user.firstName} ${user.lastName}`}
                >
                  {user.firstName[0]}
                  {user.lastName[0]}
                </Avatar>
              </TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.country.name}</TableCell>
              <TableCell>{user.role.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalCount}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={PAGINATION.ROWS_PER_PAGE_OPTIONS}
      />
    </TableContainer>
  );
}
