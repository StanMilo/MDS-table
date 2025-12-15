import UsersTableClient from "./UsersTableClient";
import { API, PAGINATION } from "../constants";
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

async function fetchUsers(
  page: number = PAGINATION.DEFAULT_PAGE,
  limit: number = PAGINATION.DEFAULT_LIMIT
): Promise<{
  users: User[];
  totalCount: number;
}> {
  const url = `${API.BASE_URL}${API.ENDPOINTS.USERS}?_page=${page}&_limit=${limit}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 0 },
    });
    console.log(response, "res");

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
}

export default async function UsersTable({
  page = PAGINATION.DEFAULT_PAGE,
  limit = PAGINATION.DEFAULT_LIMIT,
}: UsersTableProps) {
  const { users, totalCount } = await fetchUsers(page, limit);

  return (
    <UsersTableClient
      users={users}
      totalCount={totalCount}
      page={page}
      limit={limit}
    />
  );
}
