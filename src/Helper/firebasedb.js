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

  const docRef = doc(database, `users`, uid);
  await setDoc(docRef, { ...user.values, userId: uid });
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

export {
  auth,
  updateAdminsDatabase,
  updateUsersDatabase,
  getUsersFromDatabase,
  updateIndUserDatabase,
};
