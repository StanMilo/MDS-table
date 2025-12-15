export const API = {
  BASE_URL: process.env.API_URL || "http://localhost:1008",
  ENDPOINTS: {
    USERS: "/users",
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  ROWS_PER_PAGE_OPTIONS: [10, 25, 50],
} as const;
