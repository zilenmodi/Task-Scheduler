import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import {
  deleteIndProject,
  updateIndProjectDatabase,
  updateProjectsDatabase,
} from "./firebasedb";

export const useCreateProjectsMutation = () => {
  return useMutation({
    mutationFn: (body) => updateProjectsDatabase(body),
    onError: () => {
      // toast.error('Category update failed !');
      console.log("Project added failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      console.log("Project added successfully !");
      navigate("/admin/dashboard");
    },
  });
};

export const useUpdateProjectsMutation = () => {
  return useMutation({
    mutationFn: (body) => updateIndProjectDatabase(body),
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
    mutationFn: (body) => deleteIndProject(body),
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
