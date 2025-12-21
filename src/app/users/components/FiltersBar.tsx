import {
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { translations } from "../../../translations";
import { ActionButton } from "../../components/ui/ActionButton";
import { Country, Role } from "../../../types/user";

interface FiltersBarProps {
  search: string;
  countryId: string;
  roleName: string;
  countries: Country[];
  roles: Role[];
  hasActiveFilters: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange: (event: any) => void;
  onRoleChange: (event: any) => void;
  onClearFilters: () => void;
}

export function FiltersBar({
  search,
  countryId,
  roleName,
  countries,
  roles,
  hasActiveFilters,
  onSearchChange,
  onCountryChange,
  onRoleChange,
  onClearFilters,
}: FiltersBarProps) {
  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 2 },
        mb: { xs: 1.5, sm: 2 },
        boxShadow: 2,
        backgroundColor: "background.paper",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1.5, sm: 2 },
          alignItems: { xs: "stretch", md: "flex-end" },
        }}
      >
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            label={translations.filters.search}
            placeholder={translations.filters.searchPlaceholder}
            value={search}
            onChange={onSearchChange}
            size="small"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel>{translations.filters.country}</InputLabel>
            <Select
              value={countryId}
              label={translations.filters.country}
              onChange={onCountryChange}
            >
              <MenuItem value="">
                <em>{translations.filters.allCountries}</em>
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id.toString()}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ flex: 1 }}>
          <FormControl fullWidth size="small">
            <InputLabel>{translations.filters.role}</InputLabel>
            <Select
              value={roleName}
              label={translations.filters.role}
              onChange={onRoleChange}
            >
              <MenuItem value="">
                <em>{translations.filters.allRoles}</em>
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <ActionButton
            text={translations.filters.clearFilters}
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
          />
        </Box>
      </Box>
    </Paper>
  );
}
