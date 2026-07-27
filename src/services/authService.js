import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { getOrCreateUser } from "./userService";

const COLLECTION = "users";

export async function initializeTelegramAuth() {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
        throw new Error("Telegram WebApp SDK not found.");
    }

    tg.ready();
    tg.expand();

    const telegramUser = tg.initDataUnsafe?.user;

    if (!telegramUser) {
        throw new Error("Telegram user not found.");
    }

    const user = await getOrCreateUser(telegramUser);

    return user;
}

export async function syncTelegramProfile(telegramUser) {
    const ref = doc(db, COLLECTION, String(telegramUser.id));

    await setDoc(
        ref,
        {
            username: telegramUser.username || "",
            firstName: telegramUser.first_name || "",
            lastName: telegramUser.last_name || "",
            photoURL: telegramUser.photo_url || "",
            updatedAt: serverTimestamp(),
        },
        {
            merge: true,
        }
    );
}

export async function loginWithTelegram() {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
        throw new Error("Telegram WebApp SDK not found.");
    }

    tg.ready();
    tg.expand();

    const telegramUser = tg.initDataUnsafe?.user;

    if (!telegramUser) {
        throw new Error("Telegram user not found.");
    }

    const user = await getOrCreateUser(telegramUser);

    await syncTelegramProfile(telegramUser);

    return user;
}

export function logoutTelegram() {
    const tg = window.Telegram?.WebApp;

    if (!tg) return;

    try {
        tg.close();
    } catch (error) {
        console.error(error);
    }
}

export function getTelegramUser() {
    return window.Telegram?.WebApp?.initDataUnsafe?.user || null;
}

export function isTelegramEnvironment() {
    return Boolean(window.Telegram?.WebApp);
}

export function getTelegramTheme() {
    return window.Telegram?.WebApp?.colorScheme || "light";
}

export function getTelegramInitData() {
    return window.Telegram?.WebApp?.initData || "";
}