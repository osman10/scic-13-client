"use client";

import { Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { useTransition } from "react";

interface DeleteButtonProps {
  action: () => Promise<void>;
}

export const DeleteButton = ({ action }: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this experience?")) {
      return;
    }

    startTransition(async () => {
      try {
        await action();
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Button
      color="danger"
      variant="flat"
      onPress={handleDelete}
      isLoading={isPending}
      startContent={!isPending ? <FaTrash size={18} /> : undefined}
      className="font-medium"
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
};