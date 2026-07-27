import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export async function addProduct(product) {
  const docRef = await addDoc(collection(db, "products"), {
    ...product,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}