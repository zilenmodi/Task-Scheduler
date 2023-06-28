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
    mutationFn: (body) => {
      updateProjectsDatabase(body);
      addProjectToAssignedUsers(body);
    },
    onError: () => {
      // toast.error('Category update failed !');
      console.log("Project added failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      console.log("Project added successfully !");
    },
  });
};

export const useUpdateProjectsMutation = () => {
  return useMutation({
    mutationFn: async (body) => {
      updateIndProjectDatabase(body);
      updateProjectToAssignedUsers(body);
    },
    onError: () => {
      // toast.error('Category update failed !');
      console.log("Project updated failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      console.log("Project updated successfully !");
    },
  });
};

export const useDeleteProjectsMutation = () => {
  return useMutation({
    mutationFn: (body) => {
      deleteIndProject(body);
      deleteProjectFromAssignedUsers(body);
    },
    onError: () => {
      // toast.error('Category update failed !');
      console.log("Project deleted failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      console.log("Project deleted successfully !");
    },
  });
};
