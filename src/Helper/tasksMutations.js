import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { createNewTaskInBoard, updateTaskInBoard } from "./firebasedb";

export const useCreateTasksMutation = (pid) => {
  return useMutation({
    mutationFn: async (body) => {
      await createNewTaskInBoard(pid, body.boardId, body.newTask);
    },
    onError: () => {
      console.log("Task added failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      console.log("Task added successfully !");
    },
  });
};

export const useUpdateTasksMutation = (pid) => {
  return useMutation({
    mutationFn: async (body) => {
      await updateTaskInBoard(pid, body.taskId, body.updatedValues);
    },
    onError: () => {
      console.log("Task updated failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      console.log("Task updated successfully !");
    },
  });
};
