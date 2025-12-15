import { Container, Typography, Box } from "@mui/material";
import UsersTable from "./components/UsersTable";
import { PAGINATION } from "./constants";
import { translations } from "./translations";

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const page = parseInt(params?.page || PAGINATION.DEFAULT_PAGE.toString(), 10);
  const limit = parseInt(
    params?.limit || PAGINATION.DEFAULT_LIMIT.toString(),
    10
  );

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
        <UsersTable page={page} limit={limit} />
      </Box>
    </Container>
  );
}
