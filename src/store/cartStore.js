import { create } from "zustand";

const STORAGE_KEY = "cart";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const calculate = (items) => ({
  totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
  totalPrice: items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ),
});

export const useCartStore = create((set, get) => ({
  items: loadCart(),
  ...calculate(loadCart()),

  sync(items) {
    saveCart(items);

    set({
      items,
      ...calculate(items),
    });
  },

  addToCart(product) {
    const items = [...get().items];

    const found = items.find((i) => i.id === product.id);

    if (found) {
      found.quantity++;
    } else {
      items.push({
        ...product,
        quantity: 1,
      });
    }

    get().sync(items);
  },

  increase(id) {
    const items = [...get().items];

    const item = items.find((i) => i.id === id);

    if (item) item.quantity++;

    get().sync(items);
  },

  decrease(id) {
    const items = [...get().items];

    const item = items.find((i) => i.id === id);

    if (!item) return;

    if (item.quantity === 1) {
      get().removeFromCart(id);
      return;
    }

    item.quantity--;

    get().sync(items);
  },

  removeFromCart(id) {
    const items = get().items.filter(
      (i) => i.id !== id
    );

    get().sync(items);
  },

  clearCart() {
    get().sync([]);
  },
}));