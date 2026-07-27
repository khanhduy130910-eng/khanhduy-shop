import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export async function getProductById(id) {
  const ref = doc(db, "products", id);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data(),
  };
}