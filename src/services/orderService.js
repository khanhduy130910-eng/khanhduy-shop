import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";

const ORDERS = "orders";

export async function createOrder({
  customer,
  items,
  totalPrice,
  discount = 0,
  finalPrice = totalPrice,
  coupon = null,
  paymentMethod,
  paymentProof = "",
}) {
  const order = {
    customer,

    items,

    totalPrice,

    discount,

    finalPrice,

    coupon,

    paymentMethod,

    paymentProof,

    status: "pending_payment",

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),
  };

  const ref = await addDoc(
    collection(db, ORDERS),
    order
  );

  return {
    id: ref.id,
    ...order,
  };
}

export async function getOrder(id) {
  const snap = await getDoc(doc(db, ORDERS, id));

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data(),
  };
}

export async function getOrdersByUser(uid) {
  const q = query(
    collection(db, ORDERS),
    where("customer.uid", "==", uid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function getAllOrders() {
  const snapshot = await getDocs(
    collection(db, ORDERS)
  );

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function updateOrderStatus(
  id,
  status
) {
  await updateDoc(doc(db, ORDERS, id), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export async function uploadPaymentProof(
  id,
  imageUrl
) {
  await updateDoc(doc(db, ORDERS, id), {
    paymentProof: imageUrl,

    status: "pending_review",

    updatedAt: serverTimestamp(),
  });
}