import { useMemo } from "react";

import { useCartStore } from "../store/cartStore";
import useAuth from "./useAuth";

export default function useCart() {
    const cart = useCartStore();

    const { user } = useAuth();

    const totalQuantity = useMemo(() => {
        return cart.getQuantity
            ? cart.getQuantity()
            : cart.items.reduce(
                  (sum, item) => sum + item.quantity,
                  0
              );
    }, [cart]);

    const totalPrice = useMemo(() => {
        return cart.getSubtotal
            ? cart.getSubtotal()
            : cart.items.reduce(
                  (sum, item) =>
                      sum + item.price * item.quantity,
                  0
              );
    }, [cart]);

    const selectedItems = useMemo(() => {
        return cart.getSelectedItems
            ? cart.getSelectedItems()
            : cart.items;
    }, [cart]);

    const selectedQuantity = useMemo(() => {
        return cart.getSelectedQuantity
            ? cart.getSelectedQuantity()
            : totalQuantity;
    }, [cart, totalQuantity]);

    const selectedTotalPrice = useMemo(() => {
        return cart.getSelectedSubtotal
            ? cart.getSelectedSubtotal()
            : totalPrice;
    }, [cart, totalPrice]);

    return {
        ...cart,

        user,

        totalQuantity,
        totalPrice,

        selectedItems,
        selectedQuantity,
        selectedTotalPrice,
    };
}