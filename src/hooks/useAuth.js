import { useMemo } from "react";
import { useAuthStore } from "../store/authStore";

export default function useAuth() {
  const store = useAuthStore();

  const user = store.user;

  const role = useMemo(() => {
    return (
      user?.role ??
      store.role ??
      "customer"
    );
  }, [user, store.role]);

  const isLoggedIn = useMemo(() => {
    return Boolean(user);
  }, [user]);

  const isCustomer = useMemo(() => {
    return role === "customer";
  }, [role]);

  const isSeller = useMemo(() => {
    return role === "seller";
  }, [role]);

  const isAdmin = useMemo(() => {
    return role === "admin";
  }, [role]);

  return {
    user,

    role,

    loading: store.loading,

    initialized: store.initialized,

    isLoggedIn,

    isCustomer,

    isSeller,

    isAdmin,

    login: store.login,

    logout: store.logout,

    refresh: store.refresh,

    updateUser: store.updateUser,

    setLoading: store.setLoading,

    setInitialized:
      store.setInitialized,
  };
}