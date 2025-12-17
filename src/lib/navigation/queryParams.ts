import { SortParams } from "../../types/user";

export interface QueryParams extends SortParams {
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
  if (params.search?.trim()) {
    urlParams.set("search", params.search.trim());
  }
  if (params.countryId?.trim()) {
    urlParams.set("countryId", params.countryId.trim());
  }
  if (params.roleName?.trim()) {
    urlParams.set("roleName", params.roleName.trim());
  }
  if (params.sortBy?.trim()) {
    urlParams.set("sortBy", params.sortBy.trim());
  }
  if (params.sortOrder) {
    urlParams.set("sortOrder", params.sortOrder);
  }

  return urlParams;
}

const getParam = (value: string | string[] | undefined): string | undefined => {
  return Array.isArray(value) ? value[0] : value;
};

export function parseQueryParams(
  params: Record<string, string | string[] | undefined>
): QueryParams {
  const result: QueryParams = {};

  const pageStr = getParam(params.page);
  if (pageStr) {
    result.page = parseInt(pageStr, 10);
  }

  const limitStr = getParam(params.limit);
  if (limitStr) {
    result.limit = parseInt(limitStr, 10);
  }

  result.search = getParam(params.search);
  result.countryId = getParam(params.countryId);
  result.roleName = getParam(params.roleName);
  result.sortBy = getParam(params.sortBy);

  const sortOrderStr = getParam(params.sortOrder);
  if (sortOrderStr === "asc" || sortOrderStr === "desc") {
    result.sortOrder = sortOrderStr;
  }

  return result;
}
