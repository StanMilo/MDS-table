import { Container, Typography, Box } from "@mui/material";
import UsersTable from "./UsersTable";
import { PAGINATION } from "../../lib/constants/pagination";
import { translations } from "../../translations";
import { parseQueryParams } from "../../lib/navigation/queryParams";

interface UsersPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    countryId?: string;
    roleName?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const queryParams = parseQueryParams(params);

  const page = queryParams.page || PAGINATION.DEFAULT_PAGE;
  const limit = queryParams.limit || PAGINATION.DEFAULT_LIMIT;
  const search = queryParams.search;
  const countryId = queryParams.countryId;
  const roleName = queryParams.roleName;
  const sortBy = queryParams.sortBy;
  const sortOrder = queryParams.sortOrder;

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            {translations.page.title}
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            {translations.page.subtitle}
          </Typography>
        </Box>
        <UsersTable
          page={page}
          limit={limit}
          search={search}
          countryId={countryId}
          roleName={roleName}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </Box>
    </Container>
  );
}
