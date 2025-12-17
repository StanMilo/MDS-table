"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { PAGINATION, DEBOUNCE } from "../../lib/constants/pagination";
import { translations } from "../../translations";
import { useDebounce } from "../../hooks/useDebounce";
import { User, Country, Role } from "../../types/user";
import { buildQueryParams } from "../../lib/navigation/queryParams";
import { StyledTableSortLabel } from "../components/ui/StyledTableSortLabel";
import { ActionButton } from "../components/ui/ActionButton";

interface UsersTableClientProps {
  users: User[];
  totalCount: number;
  page: number;
  limit: number;
  countries: Country[];
  roles: Role[];
  initialSearch: string;
  initialCountryId: string;
  initialRoleName: string;
  initialSortBy: string;
  initialSortOrder: "asc" | "desc";
}

export default function UsersTableClient({
  users,
  totalCount,
  page,
  limit,
  countries,
  roles,
  initialSearch,
  initialCountryId,
  initialRoleName,
  initialSortBy,
  initialSortOrder,
}: UsersTableClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);
  const [countryId, setCountryId] = useState(initialCountryId);
  const [roleName, setRoleName] = useState(initialRoleName);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(initialSortOrder);

  const debouncedSearch = useDebounce(search, DEBOUNCE.SEARCH_DELAY);
  const isInitialMount = useRef(true);

  const updateURL = useCallback(
    (
      newPage: number,
      newLimit: number,
      newSearch: string,
      newCountryId: string,
      newRoleName: string,
      newSortBy: string,
      newSortOrder: "asc" | "desc"
    ) => {
      const params = buildQueryParams({
        page: newPage,
        limit: newLimit,
        search: newSearch,
        countryId: newCountryId,
        roleName: newRoleName,
        sortBy: newSortBy || undefined,
        sortOrder: newSortBy ? newSortOrder : undefined,
      });

      router.push(`/users?${params.toString()}`);
    },
    [router]
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    updateURL(
      newPage + 1,
      limit,
      search,
      countryId,
      roleName,
      sortBy,
      sortOrder
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    updateURL(1, newLimit, search, countryId, roleName, sortBy, sortOrder);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    updateURL(
      1,
      limit,
      debouncedSearch,
      countryId,
      roleName,
      sortBy,
      sortOrder
    );
  }, [debouncedSearch]);

  const handleCountryChange = (event: any) => {
    const newCountryId = event.target.value as string;
    setCountryId(newCountryId);
    updateURL(1, limit, search, newCountryId, roleName, sortBy, sortOrder);
  };

  const handleRoleChange = (event: any) => {
    const newRoleName = event.target.value as string;
    setRoleName(newRoleName);
    updateURL(1, limit, search, countryId, newRoleName, sortBy, sortOrder);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
      updateURL(1, limit, search, countryId, roleName, field, newSortOrder);
    } else {
      setSortBy(field);
      setSortOrder("asc");
      updateURL(1, limit, search, countryId, roleName, field, "asc");
    }
  };

  const createSortHandler = (field: string) => () => {
    handleSort(field);
  };

  const handleClearFilters = () => {
    setSearch("");
    setCountryId("");
    setRoleName("");
    setSortBy("");
    setSortOrder("asc");
    updateURL(PAGINATION.DEFAULT_PAGE, limit, "", "", "", "", "asc");
  };

  const hasActiveFilters = search || countryId || roleName || sortBy;

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: { xs: "stretch", md: "flex-end" },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              label={translations.filters.search}
              placeholder={translations.filters.searchPlaceholder}
              value={search}
              onChange={handleSearchChange}
              size="small"
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel>{translations.filters.country}</InputLabel>
              <Select
                value={countryId}
                label={translations.filters.country}
                onChange={handleCountryChange}
              >
                <MenuItem value="">
                  <em>{translations.filters.allCountries}</em>
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id.toString()}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormControl fullWidth size="small">
              <InputLabel>{translations.filters.role}</InputLabel>
              <Select
                value={roleName}
                label={translations.filters.role}
                onChange={handleRoleChange}
              >
                <MenuItem value="">
                  <em>{translations.filters.allRoles}</em>
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <ActionButton
              text={translations.filters.clearFilters}
              onClick={handleClearFilters}
              disabled={!hasActiveFilters}
            />
          </Box>
        </Box>
      </Paper>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
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
              <TableCell>
                <StyledTableSortLabel
                  active={sortBy === "country.name"}
                  direction={sortBy === "country.name" ? sortOrder : "asc"}
                  onClick={createSortHandler("country.name")}
                >
                  {translations.table.country}
                </StyledTableSortLabel>
              </TableCell>
              <TableCell>
                <StyledTableSortLabel
                  active={sortBy === "role.name"}
                  direction={sortBy === "role.name" ? sortOrder : "asc"}
                  onClick={createSortHandler("role.name")}
                >
                  {translations.table.role}
                </StyledTableSortLabel>
              </TableCell>
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
    </Box>
  );
}
