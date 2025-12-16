export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  countryId?: string;
  roleName?: string;
}

export function buildQueryParams(params: QueryParams): URLSearchParams {
  const urlParams = new URLSearchParams();

  if (params.page !== undefined) {
    urlParams.set("page", params.page.toString());
  }
  if (params.limit !== undefined) {
    urlParams.set("limit", params.limit.toString());
  }
  if (params.search && params.search.trim()) {
    urlParams.set("search", params.search.trim());
  }
  if (params.countryId && params.countryId.trim()) {
    urlParams.set("countryId", params.countryId.trim());
  }
  if (params.roleName && params.roleName.trim()) {
    urlParams.set("roleName", params.roleName.trim());
  }

  return urlParams;
}

export function parseQueryParams(
  params: Record<string, string | string[] | undefined>
): QueryParams {
  const result: QueryParams = {};

  if (params.page) {
    const page = Array.isArray(params.page) ? params.page[0] : params.page;
    result.page = parseInt(page, 10);
  }
  if (params.limit) {
    const limit = Array.isArray(params.limit) ? params.limit[0] : params.limit;
    result.limit = parseInt(limit, 10);
  }
  if (params.search) {
    result.search = Array.isArray(params.search)
      ? params.search[0]
      : params.search;
  }
  if (params.countryId) {
    result.countryId = Array.isArray(params.countryId)
      ? params.countryId[0]
      : params.countryId;
  }
  if (params.roleName) {
    result.roleName = Array.isArray(params.roleName)
      ? params.roleName[0]
      : params.roleName;
  }

  return result;
}
