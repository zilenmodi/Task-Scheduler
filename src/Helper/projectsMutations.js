import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import {
  deleteIndProject,
  updateIndProjectDatabase,
  updateProjectsDatabase,
} from "./firebasedb";
import {
  addProjectToAssignedUsers,
  deleteProjectFromAssignedUsers,
  updateProjectToAssignedUsers,
} from "./extraMutations";

export const useCreateProjectsMutation = () => {
  return useMutation({
    mutationFn: async (body) => {
      await updateProjectsDatabase(body);
      await addProjectToAssignedUsers(body);
    },
    onError: () => {
      console.log("Project added failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("Project added successfully !");
    },
  });
};

export const useUpdateProjectsMutation = () => {
  return useMutation({
    mutationFn: async (body) => {
      await updateIndProjectDatabase(body);
      await updateProjectToAssignedUsers(body);
    },
    onError: () => {
      console.log("Project updated failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      console.log("Project updated successfully !");
    },
  });
};

export const useDeleteProjectsMutation = () => {
  return useMutation({
    mutationFn: async (body) => {
      await deleteIndProject(body);
      await deleteProjectFromAssignedUsers(body);
    },
    onError: () => {
      console.log("Project deleted failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("Project deleted successfully !");
    },
  });
};
