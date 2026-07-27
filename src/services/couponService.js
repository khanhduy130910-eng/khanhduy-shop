import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";

const COLLECTION = "coupons";

export async function createCoupon(data) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    used: 0,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getCoupons() {
  const snapshot = await getDocs(
    collection(db, COLLECTION)
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getCouponByCode(code) {
  const q = query(
    collection(db, COLLECTION),
    where("code", "==", code.toUpperCase()),
    where("active", "==", true)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}

export async function increaseCouponUsed(coupon) {
  await updateDoc(
    doc(db, COLLECTION, coupon.id),
    {
      used: (coupon.used || 0) + 1,
      updatedAt: serverTimestamp(),
    }
  );
}