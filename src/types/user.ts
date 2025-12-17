export interface User {
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

export interface Country {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FilterParams {
  search?: string;
  countryId?: string;
  roleName?: string;
}

export type FilterParamsWithSort = FilterParams & SortParams;
