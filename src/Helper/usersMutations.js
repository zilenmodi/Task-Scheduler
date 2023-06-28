import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import {
  deleteIndUser,
  createNewUser,
  updateIndUserDatabase,
} from "./firebasedb";
import {
  addUserToAssignedProjects,
  deleteUserFromAssignedProjects,
  updateUserToAssignedProjects,
} from "./extraMutations";

export const useCreateUsersMutation = () => {
  return useMutation({
    mutationFn: (body) => {
      createNewUser(body);
      addUserToAssignedProjects(body);
    },
    onError: () => {
      // toast.error('Category update failed !');
      console.log("User added failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("User added successfully !");
    },
  });
};

export const useUpdateUsersMutation = () => {
  return useMutation({
    mutationFn: (body) => {
      updateIndUserDatabase(body);
      updateUserToAssignedProjects(body);
    },
    onError: () => {
      // toast.error('Category update failed !');
      console.log("User updated failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("User updated successfully !");
    },
  });
};

export const useDeleteUsersMutation = () => {
  return useMutation({
    mutationFn: (body) => {
      deleteIndUser(body);
      deleteUserFromAssignedProjects(body);
    },
    onError: () => {
      // toast.error('Category update failed !');
      console.log("User deleted failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("User deleted successfully !");
    },
  });
};
