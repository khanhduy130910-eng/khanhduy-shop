import { useCartStore } from "../store/cartStore";

export default function useCart() {
  return useCartStore();
}