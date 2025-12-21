import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../../types/user";
import { translations } from "../../../translations";

interface UserCardProps {
  user: User;
  onDelete: (
    userId: string,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <Card
      sx={{
        mb: { xs: 1.5, sm: 2 },
        boxShadow: 2,
        position: "relative",
        transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
          transform: "translateY(-2px)",
        },
      }}
    >
      <IconButton
        onClick={(e) => onDelete(user.id.toString(), e)}
        sx={{
          position: "absolute",
          top: { xs: 6, sm: 8 },
          right: { xs: 6, sm: 8 },
          color: "error.main",
          padding: { xs: 0.75, sm: 1 },
          "& .MuiSvgIcon-root": {
            fontSize: { xs: "1.125rem", sm: "1.25rem" },
          },
          "&:hover": {
            backgroundColor: "rgba(211, 47, 47, 0.08)",
            color: "error.main",
          },
        }}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1.5, sm: 2 },
            alignItems: "flex-start",
          }}
        >
          <Avatar
            src={user.avatar || undefined}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: { xs: 48, sm: 56 }, height: { xs: 48, sm: 56 } }}
          >
            {user.firstName[0]}
            {user.lastName[0]}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0, pr: { xs: 3, sm: 4 } }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              variant="body2"
              component="a"
              href={`mailto:${user.email}`}
              sx={{
                mt: { xs: 0.25, sm: 0.5 },
                wordBreak: "break-word",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                color: "primary.main",
                textDecoration: "none",
                display: "block",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {user.email}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 1.5, sm: 2 },
                mt: { xs: 1, sm: 1.5 },
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                >
                  {translations.table.country}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {user.country.name}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ fontSize: { xs: "0.65rem", sm: "0.75rem" } }}
                >
                  {translations.table.role}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                >
                  {user.role.name}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
