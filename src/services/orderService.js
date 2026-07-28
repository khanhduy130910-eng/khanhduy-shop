import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
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
  status = "pending_payment",
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

    status,

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
  const snap = await getDoc(
    doc(db, ORDERS, id)
  );

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
    where("customer.uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function getAllOrders() {
  const q = query(
    collection(db, ORDERS),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

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

export async function updateOrder(
  id,
  data
) {
  await updateDoc(doc(db, ORDERS, id), {
    ...data,
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

export async function markOrderPaid(id) {
  await updateDoc(doc(db, ORDERS, id), {
    status: "paid",
    updatedAt: serverTimestamp(),
  });
}

export async function completeOrder(id) {
  await updateDoc(doc(db, ORDERS, id), {
    status: "completed",
    updatedAt: serverTimestamp(),
  });
}

export async function cancelOrder(id) {
  await updateDoc(doc(db, ORDERS, id), {
    status: "cancelled",
    updatedAt: serverTimestamp(),
  });
}