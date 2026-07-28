// src/services/walletService.js

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";

const WALLETS = "wallets";
const TRANSACTIONS = "wallet_transactions";

export async function getWallet(uid) {
  const ref = doc(db, WALLETS, uid);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid,
      balance: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return {
      uid,
      balance: 0,
    };
  }

  return {
    uid: snap.id,
    ...snap.data(),
  };
}

export async function getWalletBalance(uid) {
  const wallet = await getWallet(uid);

  return Number(wallet.balance || 0);
}

export async function addBalance(
  uid,
  amount,
  note = "Nạp tiền"
) {
  const ref = doc(db, WALLETS, uid);

  await getWallet(uid);

  await updateDoc(ref, {
    balance: increment(amount),
    updatedAt: serverTimestamp(),
  });

  await addDoc(
    collection(db, TRANSACTIONS),
    {
      uid,
      type: "deposit",
      amount,
      note,
      createdAt: serverTimestamp(),
    }
  );
}

export async function deductBalance(
  uid,
  amount,
  note = "Thanh toán đơn hàng"
) {
  const wallet = await getWallet(uid);

  if (
    Number(wallet.balance) <
    Number(amount)
  ) {
    throw new Error(
      "INSUFFICIENT_BALANCE"
    );
  }

  const ref = doc(db, WALLETS, uid);

  await updateDoc(ref, {
    balance: increment(-amount),
    updatedAt: serverTimestamp(),
  });

  await addDoc(
    collection(db, TRANSACTIONS),
    {
      uid,
      type: "payment",
      amount,
      note,
      createdAt: serverTimestamp(),
    }
  );
}

export async function refundBalance(
  uid,
  amount,
  note = "Hoàn tiền"
) {
  const ref = doc(db, WALLETS, uid);

  await getWallet(uid);

  await updateDoc(ref, {
    balance: increment(amount),
    updatedAt: serverTimestamp(),
  });

  await addDoc(
    collection(db, TRANSACTIONS),
    {
      uid,
      type: "refund",
      amount,
      note,
      createdAt: serverTimestamp(),
    }
  );
}

export async function getWalletTransactions(
  uid
) {
  const q = query(
    collection(db, TRANSACTIONS),
    where("uid", "==", uid),
    orderBy("createdAt", "desc"),
    limit(50)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}