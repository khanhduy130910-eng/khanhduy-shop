import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";

const KEYS = "keys";
const ORDERS = "orders";

export async function addKey(productId, key) {
  return addDoc(collection(db, KEYS), {
    productId,
    key,
    used: false,
    orderId: "",
    createdAt: serverTimestamp(),
  });
}

export async function getKeys(productId = null) {
  const ref = collection(db, KEYS);

  const snapshot = productId
    ? await getDocs(
        query(
          ref,
          where("productId", "==", productId)
        )
      )
    : await getDocs(ref);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function getKeyStatistics() {
  const keys = await getKeys();

  const result = {};

  keys.forEach((item) => {
    if (!result[item.productId]) {
      result[item.productId] = {
        productId: item.productId,
        total: 0,
        available: 0,
        used: 0,
      };
    }

    result[item.productId].total++;

    if (item.used) {
      result[item.productId].used++;
    } else {
      result[item.productId].available++;
    }
  });

  return Object.values(result);
}

export async function getAvailableKey(productId) {
  const q = query(
    collection(db, KEYS),
    where("productId", "==", productId),
    where("used", "==", false),
    limit(1)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) return null;

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  };
}

export async function assignKey(keyId, orderId) {
  await updateDoc(doc(db, KEYS, keyId), {
    used: true,
    orderId,
    usedAt: serverTimestamp(),
  });
}

export async function deliverKeys(order) {
  const delivered = [];

  for (const item of order.items) {
    for (let i = 0; i < item.quantity; i++) {
      const key = await getAvailableKey(item.id);

      if (!key) {
        throw new Error(
          `Hết key cho sản phẩm "${item.name}".`
        );
      }

      await assignKey(key.id, order.id);

      delivered.push({
        productId: item.id,
        productName: item.name,
        key: key.key,
      });
    }
  }

  await updateDoc(doc(db, ORDERS, order.id), {
    status: "completed",
    deliveredKeys: delivered,
    deliveredAt: serverTimestamp(),
  });

  return delivered;
}