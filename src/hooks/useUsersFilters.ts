import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { PAGINATION, DEBOUNCE } from "../lib/constants/pagination";
import { buildQueryParams } from "../lib/navigation/queryParams";
import { useDebounce } from "./useDebounce";

interface UseUsersFiltersProps {
  initialSearch: string;
  initialCountryId: string;
  initialRoleName: string;
  initialSortBy: string;
  initialSortOrder: "asc" | "desc";
  limit: number;
}

export function useUsersFilters({
  initialSearch,
  initialCountryId,
  initialRoleName,
  initialSortBy,
  initialSortOrder,
  limit,
}: UseUsersFiltersProps) {
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

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

  const handleCountryChange = useCallback(
    (event: any) => {
      const newCountryId = event.target.value as string;
      setCountryId(newCountryId);
      updateURL(1, limit, search, newCountryId, roleName, sortBy, sortOrder);
    },
    [limit, search, roleName, sortBy, sortOrder, updateURL]
  );

  const handleRoleChange = useCallback(
    (event: any) => {
      const newRoleName = event.target.value as string;
      setRoleName(newRoleName);
      updateURL(1, limit, search, countryId, newRoleName, sortBy, sortOrder);
    },
    [limit, search, countryId, sortBy, sortOrder, updateURL]
  );

  const handleSort = useCallback(
    (field: string) => {
      if (sortBy === field) {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
        updateURL(1, limit, search, countryId, roleName, field, newSortOrder);
      } else {
        setSortBy(field);
        setSortOrder("asc");
        updateURL(1, limit, search, countryId, roleName, field, "asc");
      }
    },
    [sortBy, sortOrder, limit, search, countryId, roleName, updateURL]
  );

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setCountryId("");
    setRoleName("");
    setSortBy("");
    setSortOrder("asc");
    updateURL(PAGINATION.DEFAULT_PAGE, limit, "", "", "", "", "asc");
  }, [limit, updateURL]);

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      updateURL(
        newPage + 1,
        limit,
        search,
        countryId,
        roleName,
        sortBy,
        sortOrder
      );
    },
    [limit, search, countryId, roleName, sortBy, sortOrder, updateURL]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newLimit = parseInt(event.target.value, 10);
      updateURL(1, newLimit, search, countryId, roleName, sortBy, sortOrder);
    },
    [search, countryId, roleName, sortBy, sortOrder, updateURL]
  );

  const hasActiveFilters = !!(search || countryId || roleName || sortBy);

  return {
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
  };
}
