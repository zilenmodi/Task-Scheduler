import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  arrayRemove,
  arrayUnion,
  addDoc,
  collection,
  query,
  where,
  deleteDoc,
  DocumentReference,
  CollectionReference,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebase from "firebase/compat/app";
import { createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBFrVe1wGGl6Yu-Uicgew09oxkOMsCxcZo",
  authDomain: "task-scheduler-501aa.firebaseapp.com",
  projectId: "task-scheduler-501aa",
  storageBucket: "task-scheduler-501aa.appspot.com",
  messagingSenderId: "301180657856",
  appId: "1:301180657856:web:76f7e7969b26c1bb300d25",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

const updateAdminsDatabase = async (user, uid) => {
  if (typeof user !== "object") return;

  const docRef = doc(database, `admins`, uid);
  await setDoc(docRef, { ...user, uid });
};

const updateUsersDatabase = async (user, uid) => {
  if (typeof user !== "object") return;

  const docRef = doc(database, "users", uid);
  await setDoc(docRef, { ...user, userId: uid });
};

const createNewUser = async (user) => {
  const response = await createUserWithEmailAndPassword(
    auth,
    user.email,
    "12345678"
  );
  const userId = response.user.uid;
  await updateUsersDatabase(user, userId);
  return userId;
};

const getUsersFromDatabase = async (adminId) => {
  try {
    const usersCollections = collection(database, "users");
    const querySnapshot = await getDocs(usersCollections);
    const documents = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().createdBy === adminId) {
        documents.push({ ...doc.data() });
      }
    });
    return documents;
  } catch (err) {
    console.log(err);
  }
};

const updateIndUserDatabase = async (user) => {
  try {
    const docRef = doc(database, "users", user.userId);
    await updateDoc(docRef, user);
  } catch (err) {
    console.log(err);
  }
};

const deleteIndUser = async (uid) => {
  try {
    const docRef = doc(database, "users", uid);
    await deleteDoc(docRef);
  } catch (err) {
    console.log(err);
  }
};

const updateProjectsDatabase = async (project) => {
  try {
    const docRef = doc(database, `projects`, project.projectId);
    await setDoc(docRef, project);
  } catch (err) {
    console.log(err);
  }
};

const getProjectFromDatabase = async (adminId) => {
  try {
    const projectsCollections = collection(database, "projects");
    const querySnapshot = await getDocs(projectsCollections);
    const documents = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().createdBy === adminId) {
        documents.push({ ...doc.data() });
      }
    });
    return documents;
  } catch (err) {
    console.log(err);
  }
};

const updateIndProjectDatabase = async (project) => {
  try {
    const docRef = doc(database, "projects", project.projectId);
    await updateDoc(docRef, project);
  } catch (err) {
    console.log(err);
  }
};

const deleteIndProject = async (pid) => {
  try {
    const docRef = doc(database, "projects", pid);
    await deleteDoc(docRef);
  } catch (err) {
    console.log(err);
  }
};

const createNewBoardInProject = async (pid, newBoardObject) => {
  try {
    const docRef = doc(database, "projects", pid);

    const documentSnapshot = await getDoc(docRef);
    const documentData = documentSnapshot.data();

    const newArray = [...documentData["boards"], newBoardObject];

    await updateDoc(docRef, {
      ["boards"]: newArray,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateBoardInProject = async (pid, boardId, updatedValues) => {
  try {
    const docRef = doc(database, "projects", pid);

    const documentSnapshot = await getDoc(docRef);
    const documentData = documentSnapshot.data();

    const newArray = documentData["boards"].map((obj) => {
      if (obj.boardId === boardId) {
        return { ...obj, ...updatedValues };
      }
      return obj;
    });

    await updateDoc(docRef, {
      ["boards"]: newArray,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateBoardPositionInProject = async (pid, newBoardsPositions) => {
  try {
    const docRef = doc(database, "projects", pid);
    await updateDoc(docRef, {
      ["boards"]: newBoardsPositions,
    });
  } catch (err) {
    console.log(err);
  }
};

const createNewTaskInBoard = async (pid, boardId, newTaskObject) => {
  try {
    const docRef = doc(database, "projects", pid);

    const documentSnapshot = await getDoc(docRef);
    const documentData = documentSnapshot.data();

    const newArrayTasks = [...documentData["tasks"], newTaskObject];
    const newArrayBoards = documentData["boards"].map((obj) => {
      if (obj.boardId === boardId) {
        return { ...obj, itemsList: [...obj.itemsList, newTaskObject.taskId] };
      }
      return obj;
    });

    await updateDoc(docRef, {
      ["tasks"]: newArrayTasks,
      ["boards"]: newArrayBoards,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateTaskInBoard = async (pid, taskId, updatedValues) => {
  try {
    const docRef = doc(database, "projects", pid);

    const documentSnapshot = await getDoc(docRef);
    const documentData = documentSnapshot.data();

    const newArray = documentData["tasks"].map((obj) => {
      if (obj.taskId === taskId) {
        return { ...obj, ...updatedValues };
      }
      return obj;
    });

    console.log(newArray);

    await updateDoc(docRef, {
      ["tasks"]: newArray,
    });
  } catch (err) {
    console.log(err);
  }
};

export {
  auth,
  database,
  updateAdminsDatabase,
  updateUsersDatabase,
  createNewUser,
  getUsersFromDatabase,
  updateIndUserDatabase,
  deleteIndUser,
  updateProjectsDatabase,
  getProjectFromDatabase,
  updateIndProjectDatabase,
  deleteIndProject,
  createNewBoardInProject,
  updateBoardInProject,
  updateBoardPositionInProject,
  createNewTaskInBoard,
  updateTaskInBoard,
};
