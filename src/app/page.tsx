import { redirect } from "next/navigation";

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    countryId?: string;
    roleName?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const queryString = new URLSearchParams();

  if (params?.page) queryString.set("page", params.page);
  if (params?.limit) queryString.set("limit", params.limit);
  if (params?.search) queryString.set("search", params.search);
  if (params?.countryId) queryString.set("countryId", params.countryId);
  if (params?.roleName) queryString.set("roleName", params.roleName);

  const query = queryString.toString();
  redirect(`/users${query ? `?${query}` : ""}`);
}
