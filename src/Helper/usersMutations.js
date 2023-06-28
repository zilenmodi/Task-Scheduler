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
    mutationFn: async (body) => {
      const userId = await createNewUser(body);
      await addUserToAssignedProjects({ ...body, userId });
    },
    onError: () => {
      console.log("User added failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("User added successfully !");
    },
  });
};

export const useUpdateUsersMutation = () => {
  return useMutation({
    mutationFn: async (body) => {
      await updateIndUserDatabase(body);
      await updateUserToAssignedProjects(body);
    },
    onError: () => {
      console.log("User updated failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("User updated successfully !");
    },
  });
};

export const useDeleteUsersMutation = () => {
  return useMutation({
    mutationFn: async (body) => {
      await deleteIndUser(body);
      await deleteUserFromAssignedProjects(body);
    },
    onError: () => {
      console.log("User deleted failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("User deleted successfully !");
    },
  });
};
