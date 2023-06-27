import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import {
  deleteIndUser,
  createNewUser,
  updateIndUserDatabase,
} from "./firebasedb";

export const useCreateUsersMutation = () => {
  return useMutation({
    mutationFn: (body) => createNewUser(body),
    onError: () => {
      // toast.error('Category update failed !');
      console.log("User added failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      console.log("User added successfully !");
      navigate("/admin/dashboard");
    },
  });
};

// export const useUpdateProjectsMutation = () => {
//   return useMutation({
//     mutationFn: (body) => updateIndProjectDatabase(body),
//     onError: () => {
//       // toast.error('Category update failed !');
//       console.log("Project updated failed");
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["projects", adminId],
//       });
//       console.log("Project updated successfully !");
//     },
//   });
// };

// export const useDeleteProjectsMutation = () => {
//   return useMutation({
//     mutationFn: (body) => deleteIndProject(body),
//     onError: () => {
//       // toast.error('Category update failed !');
//       console.log("Project deleted failed");
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["projects", adminId],
//       });
//       console.log("Project deleted successfully !");
//     },
//   });
// };
