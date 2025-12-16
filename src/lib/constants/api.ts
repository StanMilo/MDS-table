export const API = {
  BASE_URL: process.env.API_URL || "http://localhost:1008",
  ENDPOINTS: {
    USERS: "/users",
    COUNTRIES: "/countries",
    ROLES: "/roles",
  },
} as const;
