export const translations = {
  // Page metadata
  metadata: {
    title: "MDS task",
    description: "Responsive table frontend",
  },
  // Page content
  page: {
    title: "MDS task",
    subtitle: "Responsive table frontend",
  },
  // Table headers
  table: {
    avatar: "Avatar",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    country: "Country",
    role: "Role",
  },
  // Error messages
  errors: {
    fetchUsersFailed: "Failed to fetch users:",
    fetchUsersError: "Error fetching users:",
  },
} as const;

export type TranslationKeys = typeof translations;
