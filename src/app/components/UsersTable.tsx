import UsersTableClient from "./UsersTableClient";
import { PAGINATION } from "../../lib/constants/pagination";
import { API } from "../../lib/constants/api";
import { translations } from "../../translations";

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

interface Country {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

interface FilterParams {
  search?: string;
  countryId?: string;
  roleName?: string;
}

async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.COUNTRIES}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

async function fetchRoles(): Promise<Role[]> {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.ROLES}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
}

async function fetchUsers(
  page: number = PAGINATION.DEFAULT_PAGE,
  limit: number = PAGINATION.DEFAULT_LIMIT,
  filters: FilterParams = {}
): Promise<{
  users: User[];
  totalCount: number;
}> {
  const params = new URLSearchParams();
  params.append("_page", page.toString());
  params.append("_limit", limit.toString());

  if (filters.search) {
    params.append("q", filters.search);
    console.log(params.toString(), "params");
  }

  if (filters.countryId) {
    params.append("country.id", filters.countryId);
  }

  if (filters.roleName) {
    params.append("role.name", filters.roleName);
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

interface UsersTableProps {
  page?: number;
  limit?: number;
  search?: string;
  countryId?: string;
  roleName?: string;
}

export default async function UsersTable({
  page = PAGINATION.DEFAULT_PAGE,
  limit = PAGINATION.DEFAULT_LIMIT,
  search,
  countryId,
  roleName,
}: UsersTableProps) {
  try {
    const [usersData, countries, roles] = await Promise.all([
      fetchUsers(page, limit, { search, countryId, roleName }),
      fetchCountries(),
      fetchRoles(),
    ]);

    return (
      <UsersTableClient
        users={usersData.users}
        totalCount={usersData.totalCount}
        page={page}
        limit={limit}
        countries={countries}
        roles={roles}
        initialSearch={search || ""}
        initialCountryId={countryId || ""}
        initialRoleName={roleName || ""}
      />
    );
  } catch (error) {
    console.error("Error in UsersTable:", error);
    return <div>{translations.errors.loadUsersError}</div>;
  }
}
