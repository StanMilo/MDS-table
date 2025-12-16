import UsersTableClient from "./UsersTableClient";
import { PAGINATION } from "../../lib/constants/pagination";
import { translations } from "../../translations";
import { fetchUsers } from "../../lib/api/users";
import { fetchCountries } from "../../lib/api/countries";
import { fetchRoles } from "../../lib/api/roles";

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
