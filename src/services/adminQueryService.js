import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";

export async function getProducts() {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, "products", id));
}

export async function updateProduct(id, data) {
  await updateDoc(doc(db, "products", id), data);
}