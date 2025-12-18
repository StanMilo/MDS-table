import { API } from "../constants/api";
import { PAGINATION } from "../constants/pagination";
import { User, FilterParamsWithSort } from "../../types/user";
import { translations } from "../../translations";

export async function fetchUsers(
  page: number = PAGINATION.DEFAULT_PAGE,
  limit: number = PAGINATION.DEFAULT_LIMIT,
  filters: FilterParamsWithSort = {}
): Promise<{
  users: User[];
  totalCount: number;
}> {
  const params = new URLSearchParams();
  params.append("_page", page.toString());
  params.append("_limit", limit.toString());

  if (filters.search) {
    params.append("q", filters.search);
  }

  if (filters.countryId) {
    params.append("country.id", filters.countryId);
  }

  if (filters.roleName) {
    params.append("role.name", filters.roleName);
  }

  if (filters.sortBy) {
    params.append("_sort", filters.sortBy);
    params.append("_order", filters.sortOrder || "asc");
  }

  const url = `${API.BASE_URL}${API.ENDPOINTS.USERS}?${params.toString()}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(
        `${translations.errors.fetchUsersFailed} ${response.statusText}`
      );
    }

    const users: User[] = await response.json();
    const totalCount = parseInt(
      response.headers.get("X-Total-Count") || "0",
      10
    );

    return { users, totalCount };
  } catch (error) {
    console.error(translations.errors.fetchUsersError, error);
    return { users: [], totalCount: 0 };
  }
}

export async function deleteUser(userId: string): Promise<void> {
  const url = `${API.BASE_URL}${API.ENDPOINTS.USERS}/${userId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
