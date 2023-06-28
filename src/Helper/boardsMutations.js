import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { createNewBoardInProject, updateBoardInProject } from "./firebasedb";

export const useCreateBoardsMutation = (pid) => {
  return useMutation({
    mutationFn: async (body) => {
      await createNewBoardInProject(pid, body);
    },
    onError: () => {
      console.log("Board added failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      console.log("Board added successfully !");
    },
  });
};

export const useUpdateBoardsMutation = (pid) => {
  return useMutation({
    mutationFn: async (body) => {
      await updateBoardInProject(pid, body.boardId, body.updatedValues);
    },
    onError: () => {
      console.log("Board updated failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      console.log("Board updated successfully !");
    },
  });
};
