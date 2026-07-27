import { useMemo } from "react";

import { useCartStore } from "../store/cartStore";
import useAuth from "./useAuth";

export default function useCart() {
  const cart = useCartStore();

  const { user } = useAuth();

  const totalQuantity = useMemo(() => {
    return cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }, [cart.items]);

  const totalPrice = useMemo(() => {
    return cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cart.items]);

  return {
    ...cart,

    user,

    totalQuantity,

    totalPrice,
  };
}