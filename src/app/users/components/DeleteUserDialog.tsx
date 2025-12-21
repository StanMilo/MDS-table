import { User } from "../../../types/user";
import { translations } from "../../../translations";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";

interface DeleteUserDialogProps {
  open: boolean;
  userIdToDelete: string | null;
  users: User[];
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteUserDialog({
  open,
  userIdToDelete,
  users,
  onConfirm,
  onCancel,
}: DeleteUserDialogProps) {
  const deleteMessage =
    userIdToDelete &&
    (() => {
      const user = users.find((u) => u.id.toString() === userIdToDelete);
      if (!user) return "";
      return `${translations.dialog.deleteMessage} ${user.firstName} ${user.lastName}?`;
    })();

  return (
    <ConfirmDialog
      open={open}
      title={translations.dialog.deleteTitle}
      message={deleteMessage || ""}
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmText={translations.dialog.delete}
      cancelText={translations.dialog.cancel}
      confirmColor="error"
    />
  );
}
