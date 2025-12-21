import { TableRow, TableCell, Avatar, Box } from "@mui/material";
import { User } from "../../../types/user";
import { ActionButton } from "../../components/ui/ActionButton";
import { translations } from "../../../translations";
import { hideOnMobile } from "./tableStyles";

interface UserTableRowProps {
  user: User;
  onDelete: (
    userId: string,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function UserTableRow({ user, onDelete }: UserTableRowProps) {
  return (
    <TableRow
      hover
      sx={{
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <TableCell>
        <Avatar
          src={user.avatar || undefined}
          alt={`${user.firstName} ${user.lastName}`}
        >
          {user.firstName[0]}
          {user.lastName[0]}
        </Avatar>
      </TableCell>
      <TableCell sx={{ wordBreak: "break-word" }}>{user.firstName}</TableCell>
      <TableCell sx={{ wordBreak: "break-word" }}>{user.lastName}</TableCell>
      <TableCell sx={{ wordBreak: "break-word", maxWidth: "200px" }}>
        <Box
          component="a"
          href={`mailto:${user.email}`}
          sx={{
            color: "primary.main",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {user.email}
        </Box>
      </TableCell>
      <TableCell sx={{ wordBreak: "break-word", ...hideOnMobile }}>
        {user.country.name}
      </TableCell>
      <TableCell sx={{ wordBreak: "break-word", ...hideOnMobile }}>
        {user.role.name}
      </TableCell>
      <TableCell>
        <ActionButton
          text={translations.dialog.delete}
          onClick={(e) => onDelete(user.id.toString(), e)}
          variant="table"
        />
      </TableCell>
    </TableRow>
  );
}
