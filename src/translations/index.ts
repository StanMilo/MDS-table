export const translations = {
  // Page metadata
  metadata: {
    title: "MDS task",
    description: "Responsive table frontend",
  },
  // Page content
  page: {
    title: "MDS task",
    subtitle: "Users table",
  },
  // Table headers
  table: {
    avatar: "Avatar",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    country: "Country",
    role: "Role",
    actions: "Actions",
  },
  // Error messages
  errors: {
    fetchUsersFailed: "Failed to fetch users:",
    fetchUsersError: "Error fetching users:",
    loadUsersError: "Error loading users:",
  },
  // Filter labels
  filters: {
    search: "Search",
    searchPlaceholder: "Search by name or email...",
    country: "Country",
    role: "Role",
    allCountries: "All Countries",
    allRoles: "All Roles",
    clearFilters: "Clear Filters",
  },
  // Dialog labels
  dialog: {
    deleteTitle: "Delete User",
    deleteMessage: "Are you sure you want to delete this user:",
    cancel: "Cancel",
    delete: "Delete",
  },
} as const;

export type TranslationKeys = typeof translations;
