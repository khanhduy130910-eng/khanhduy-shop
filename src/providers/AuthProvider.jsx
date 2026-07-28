import { useEffect } from "react";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuthStore } from "../store/authStore";

const DEFAULT_ROLE = "customer";

export default function AuthProvider({
  children,
}) {
  const {
    login,
    logout,
    setLoading,
    setInitialized,
  } = useAuthStore();

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      setLoading(true);

      // ===== DEV MODE =====
      if (
        window.location.hostname ===
          "localhost" ||
        window.location.hostname ===
          "127.0.0.1"
      ) {
        login({
          uid: "dev-admin",
          telegramId: "dev-admin",
          username: "developer",
          firstName: "Developer",
          lastName: "",
          photoURL: "",
          role: "admin",
          sellerLevel: 999,
          isActive: true,
        });

        return;
      }

      // ===== TELEGRAM MODE =====
      const tg =
        window.Telegram?.WebApp;

      if (
        !tg ||
        !tg.initDataUnsafe?.user
      ) {
        logout();
        return;
      }

      const telegramUser =
        tg.initDataUnsafe.user;

      const userRef = doc(
        db,
        "users",
        String(telegramUser.id)
      );

      const snapshot =
        await getDoc(userRef);

      if (!snapshot.exists()) {
        const newUser = {
          uid: String(
            telegramUser.id
          ),
          telegramId:
            telegramUser.id,
          username:
            telegramUser.username ||
            "",
          firstName:
            telegramUser.first_name ||
            "",
          lastName:
            telegramUser.last_name ||
            "",
          photoURL:
            telegramUser.photo_url ||
            "",
          role: DEFAULT_ROLE,
          sellerLevel: 0,
          isActive: true,
          createdAt:
            serverTimestamp(),
          updatedAt:
            serverTimestamp(),
        };

        await setDoc(
          userRef,
          newUser
        );

        login(newUser);
      } else {
        const user =
          snapshot.data();

        await setDoc(
          userRef,
          {
            updatedAt:
              serverTimestamp(),
          },
          {
            merge: true,
          }
        );

        login({
          uid:
            user.uid ??
            String(
              telegramUser.id
            ),
          ...user,
        });
      }

      tg.ready();
      tg.expand();
    } catch (error) {
      console.error(
        "AuthProvider:",
        error
      );

      logout();
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }

  return children;
}