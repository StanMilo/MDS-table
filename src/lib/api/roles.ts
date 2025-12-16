import { API } from "../constants/api";
import { Role } from "../../types/user";

export async function fetchRoles(): Promise<Role[]> {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.ROLES}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
}
