import { Paper, Box, Button, ButtonGroup } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { translations } from "../../../translations";

interface MobileSortHeaderProps {
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
}

export function MobileSortHeader({
  sortBy,
  sortOrder,
  onSort,
}: MobileSortHeaderProps) {
  const sortFields = [
    { field: "firstName", label: translations.table.firstName },
    { field: "lastName", label: translations.table.lastName },
    { field: "email", label: translations.table.email },
    { field: "country.name", label: translations.table.country },
    { field: "role.name", label: translations.table.role },
  ];

  const handleSort = (field: string) => {
    onSort(field);
  };

  return (
    <Paper
      sx={{
        p: { xs: 1, sm: 1.5 },
        mb: { xs: 1.5, sm: 2 },
        boxShadow: 2,
        backgroundColor: "primary.main",
        position: "sticky",
        top: { xs: 220, sm: 240 },
        zIndex: 99,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1.5, sm: 1 },
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Box
          component="span"
          sx={{
            color: "primary.contrastText",
            fontWeight: 600,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            mr: { xs: 0, sm: 1 },
          }}
        >
          Sort by:
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {sortFields.map(({ field, label }) => {
            const isActive = sortBy === field;
            return (
              <Button
                key={field}
                onClick={() => handleSort(field)}
                size="small"
                variant={isActive ? "contained" : "outlined"}
                sx={{
                  minWidth: "auto",
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 0.4, sm: 0.5 },
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  textTransform: "none",
                  color: "primary.contrastText",
                  backgroundColor: isActive
                    ? "rgba(255, 255, 255, 0.2)"
                    : "transparent",
                  borderColor: "primary.contrastText",
                  "&:hover": {
                    backgroundColor: isActive
                      ? "rgba(255, 255, 255, 0.3)"
                      : "rgba(255, 255, 255, 0.1)",
                    borderColor: "primary.contrastText",
                  },
                }}
                endIcon={
                  isActive ? (
                    sortOrder === "asc" ? (
                      <ArrowUpwardIcon sx={{ fontSize: "0.875rem" }} />
                    ) : (
                      <ArrowDownwardIcon sx={{ fontSize: "0.875rem" }} />
                    )
                  ) : null
                }
              >
                {label}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
}
