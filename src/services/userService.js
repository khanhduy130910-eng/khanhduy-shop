import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION = "users";

export async function getUser(uid) {
    const ref = doc(db, COLLECTION, String(uid));

    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return {
        id: snap.id,
        ...snap.data(),
    };
}

export async function createUser(telegramUser) {
    const ref = doc(db, COLLECTION, String(telegramUser.id));

    const data = {
        telegramId: telegramUser.id,

        username: telegramUser.username || "",

        firstName: telegramUser.first_name || "",

        lastName: telegramUser.last_name || "",

        photoURL: telegramUser.photo_url || "",

        role: "customer",

        sellerLevel: 0,

        isActive: true,

        createdAt: serverTimestamp(),

        updatedAt: serverTimestamp(),
    };

    await setDoc(ref, data);

    return data;
}

export async function updateUser(uid, payload) {
    const ref = doc(db, COLLECTION, String(uid));

    await updateDoc(ref, {
        ...payload,
        updatedAt: serverTimestamp(),
    });
}

export async function getOrCreateUser(telegramUser) {
    const current = await getUser(telegramUser.id);

    if (current) return current;

    return await createUser(telegramUser);
}

export async function changeRole(uid, role) {
    return updateUser(uid, {
        role,
    });
}

export async function setSellerLevel(uid, sellerLevel) {
    return updateUser(uid, {
        sellerLevel,
    });
}

export async function setUserStatus(uid, isActive) {
    return updateUser(uid, {
        isActive,
    });
}