import { create } from "zustand";

const STORAGE_KEY = "khanhduy_shop_user";

const loadUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saveUser = (user) => {
  if (!user) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  );
};

const initialUser = loadUser();

export const useAuthStore = create((set, get) => ({
  loading: false,

  initialized: true,

  user: initialUser,

  role: initialUser?.role ?? "customer",

  login(userData) {
    saveUser(userData);

    set({
      user: userData,
      role: userData?.role ?? "customer",
      loading: false,
      initialized: true,
    });
  },

  refresh(userData) {
    saveUser(userData);

    set({
      user: userData,
      role: userData?.role ?? "customer",
      loading: false,
      initialized: true,
    });
  },

  updateUser(payload) {
    const current = get().user;

    if (!current) return;

    const next = {
      ...current,
      ...payload,
    };

    saveUser(next);

    set({
      user: next,
      role: next.role ?? "customer",
    });
  },

  logout() {
    saveUser(null);

    set({
      user: null,
      role: "customer",
      loading: false,
      initialized: true,
    });
  },

  setLoading(loading) {
    set({
      loading,
    });
  },

  setInitialized(initialized) {
    set({
      initialized,
    });
  },
}));