import {
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";

const USERS = "users";

export async function getUsers() {
  const snapshot = await getDocs(collection(db, USERS));

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function updateUserRole(userId, role) {
  await updateDoc(doc(db, USERS, userId), {
    role,
  });
}

export async function setUserDisabled(userId, disabled) {
  await updateDoc(doc(db, USERS, userId), {
    disabled,
  });
}