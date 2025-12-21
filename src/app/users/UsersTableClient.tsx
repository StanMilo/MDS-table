"use client";

import { Box, useMediaQuery } from "@mui/material";
import { User, Country, Role } from "../../types/user";
import { useUsersFilters } from "../../hooks/useUsersFilters";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { FiltersBar } from "./components/FiltersBar";
import { MobileUsersView } from "./components/MobileUsersView";
import { DesktopUsersTable } from "./components/DesktopUsersTable";
import { DeleteUserDialog } from "./components/DeleteUserDialog";

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
  const isMobile = useMediaQuery("(max-width: 799px)");

  const {
    search,
    countryId,
    roleName,
    sortBy,
    sortOrder,
    hasActiveFilters,
    handleSearchChange,
    handleCountryChange,
    handleRoleChange,
    handleSort,
    handleClearFilters,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useUsersFilters({
    initialSearch,
    initialCountryId,
    initialRoleName,
    initialSortBy,
    initialSortOrder,
    limit,
  });

  const {
    deleteDialogOpen,
    userIdToDelete,
    handleDeleteUser,
    handleConfirmDelete,
    handleCancelDelete,
  } = useDeleteUser();

  return (
    <Box>
      <FiltersBar
        search={search}
        countryId={countryId}
        roleName={roleName}
        countries={countries}
        roles={roles}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={handleSearchChange}
        onCountryChange={handleCountryChange}
        onRoleChange={handleRoleChange}
        onClearFilters={handleClearFilters}
      />

      {isMobile ? (
        <MobileUsersView
          users={users}
          totalCount={totalCount}
          page={page}
          limit={limit}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDelete={handleDeleteUser}
        />
      ) : (
        <DesktopUsersTable
          users={users}
          totalCount={totalCount}
          page={page}
          limit={limit}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onDelete={handleDeleteUser}
        />
      )}

      <DeleteUserDialog
        open={deleteDialogOpen}
        userIdToDelete={userIdToDelete}
        users={users}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
}
