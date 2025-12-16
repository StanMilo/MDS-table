import { API } from "../constants/api";
import { Country } from "../../types/user";

export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch(`${API.BASE_URL}${API.ENDPOINTS.COUNTRIES}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return [];
    return await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}
