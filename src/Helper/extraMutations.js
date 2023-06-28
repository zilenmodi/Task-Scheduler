import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { database } from "./firebasedb";

export const addUserToAssignedProjects = async (newUser) => {
  const assignedProjects = newUser.assignProjects;
  assignedProjects?.map(async (projectId) => {
    const docRef = doc(database, "projects", projectId);
    const projectData = (await getDoc(docRef)).data();
    const updatedProjectData = {
      ...projectData,
      assignTo: [...projectData.assignTo, newUser.userId],
    };
    await updateDoc(docRef, updatedProjectData);
  });
  console.log("yesss updated");
};

export const deleteUserFromAssignedProjects = async (uid) => {
  const projectsCollections = collection(database, "projects");
  const querySnapshot = await getDocs(projectsCollections);
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data() });
  });

  documents.map(async (currProjectData) => {
    const assignedUsers = currProjectData.assignTo;
    if (assignedUsers.includes(uid)) {
      const index = assignedUsers.indexOf(uid);
      assignedUsers.splice(index, 1);

      const updatedProjectData = {
        ...currProjectData,
        assignTo: assignedUsers,
      };

      const docRef = doc(database, "projects", currProjectData.projectId);
      await updateDoc(docRef, updatedProjectData);
    }
  });
};

export const updateUserToAssignedProjects = async (updatedUser) => {
  await deleteUserFromAssignedProjects(updatedUser.userId);
  await addUserToAssignedProjects(updatedUser);
};

export const addProjectToAssignedUsers = async (newProject) => {
  const assignedUsers = newProject.assignTo;
  assignedUsers?.map(async (userId) => {
    const docRef = doc(database, "users", userId);
    const userData = (await getDoc(docRef)).data();
    const updatedUserData = {
      ...userData,
      assignProjects: [...userData.assignProjects, newProject.projectId],
    };
    await updateDoc(docRef, updatedUserData);
  });
};

export const deleteProjectFromAssignedUsers = async (pid) => {
  const usersCollections = collection(database, "users");
  const querySnapshot = await getDocs(usersCollections);
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ ...doc.data() });
  });

  documents.map(async (currUserData) => {
    const assignedProjects = currUserData.assignProjects;
    if (assignedProjects.includes(pid)) {
      const index = assignedProjects.indexOf(pid);
      assignedProjects.splice(index, 1);

      const updatedUserData = {
        ...currUserData,
        assignProjects: assignedProjects,
      };

      const docRef = doc(database, "users", currUserData.userId);
      await updateDoc(docRef, updatedUserData);
    }
  });
};

export const updateProjectToAssignedUsers = async (updatedProject) => {
  await deleteProjectFromAssignedUsers(updatedProject.projectId);
  await addProjectToAssignedUsers(updatedProject);
};
