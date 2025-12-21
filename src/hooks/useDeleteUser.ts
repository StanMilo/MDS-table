import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { deleteUser as deleteUserAPI } from "../lib/api/users";

export function useDeleteUser() {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  const handleDeleteUser = useCallback(
    (userId: string, event?: React.MouseEvent<HTMLButtonElement>) => {
      if (event?.currentTarget) {
        event.currentTarget.blur();
      }
      setUserIdToDelete(userId);
      setDeleteDialogOpen(true);
    },
    []
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!userIdToDelete) return;

    try {
      await deleteUserAPI(userIdToDelete);
      setDeleteDialogOpen(false);
      setUserIdToDelete(null);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete user:", error);
      setDeleteDialogOpen(false);
      setUserIdToDelete(null);
    }
  }, [userIdToDelete, router]);

  const handleCancelDelete = useCallback(() => {
    setDeleteDialogOpen(false);
    setUserIdToDelete(null);
  }, []);

  return {
    deleteDialogOpen,
    userIdToDelete,
    handleDeleteUser,
    handleConfirmDelete,
    handleCancelDelete,
  };
}
