import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { database } from "./firebasedb";

/* Users Methods */
const getMultipleDocumentsUser = async (assignedProjects, newUser) => {
  const documents = [];
  for (const projectId of assignedProjects) {
    try {
      const docRef = doc(database, "projects", projectId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists) {
        const projectData = snapshot.data();
        const updatedProjectData = {
          ...projectData,
          assignTo: [...projectData.assignTo, newUser.userId],
        };
        documents.push(updatedProjectData);
      } else {
        console.log(`Document with ID ${id} does not exist.`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return documents;
};

const updateMultipleDocumentsUser = async (documents) => {
  for (const project of documents) {
    try {
      const docRef = doc(database, "projects", project.projectId);
      await updateDoc(docRef, project);
    } catch (error) {
      console.error(`Error updating document with ID ${doc.id}:`, error);
    }
  }
};

export const addUserToAssignedProjects = async (newUser) => {
  try {
    const assignedProjects = newUser.assignProjects;
    const documents = await getMultipleDocumentsUser(assignedProjects, newUser);
    await updateMultipleDocumentsUser(documents);
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserFromAssignedProjects = async (uid) => {
  try {
    const projectsCollection = collection(database, "projects");
    const querySnapshot = await getDocs(projectsCollection);
    const documents = querySnapshot.docs.map((doc) => {
      return { ...doc.data() };
    });

    for (const currProjectData of documents) {
      const assignedUsers = currProjectData.assignTo || [];
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
    }
  } catch (error) {
    console.error("Error deleting user from assigned projects:", error);
  }
};

export const updateUserToAssignedProjects = async (updatedUser) => {
  try {
    await deleteUserFromAssignedProjects(updatedUser.userId);
    await addUserToAssignedProjects(updatedUser);
  } catch (err) {
    console.log(err);
  }
};

/* Projects Methods */
const getMultipleDocumentsProject = async (assignedUsers, newProject) => {
  const documents = [];
  for (const userId of assignedUsers) {
    try {
      const docRef = doc(database, "users", userId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists) {
        const userData = snapshot.data();
        const updatedUserData = {
          ...userData,
          assignProjects: [...userData.assignProjects, newProject.projectId],
        };
        documents.push(updatedUserData);
      } else {
        console.log(`Document with ID ${id} does not exist.`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return documents;
};

const updateMultipleDocumentsProject = async (documents) => {
  for (const user of documents) {
    try {
      const docRef = doc(database, "users", user.userId);
      await updateDoc(docRef, user);
    } catch (error) {
      console.error(`Error updating document with ID ${doc.id}:`, error);
    }
  }
};

export const addProjectToAssignedUsers = async (newProject) => {
  try {
    const assignedUsers = newProject.assignTo;
    const documents = await getMultipleDocumentsProject(
      assignedUsers,
      newProject
    );
    await updateMultipleDocumentsProject(documents);
  } catch (err) {
    console.log(err);
  }
};

export const deleteProjectFromAssignedUsers = async (pid) => {
  try {
    const usersCollection = collection(database, "users");
    const querySnapshot = await getDocs(usersCollection);
    const documents = querySnapshot.docs.map((doc) => {
      return { ...doc.data() };
    });

    for (const currUserData of documents) {
      const assignedProjects = currUserData.assignProjects || [];
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
    }
  } catch (error) {
    console.error("Error deleting project from assigned users:", error);
  }
};

export const updateProjectToAssignedUsers = async (updatedProject) => {
  try {
    await deleteProjectFromAssignedUsers(updatedProject.projectId);
    await addProjectToAssignedUsers(updatedProject);
  } catch (err) {
    console.log(err);
  }
};
