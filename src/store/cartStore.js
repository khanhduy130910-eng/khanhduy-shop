import { create } from "zustand";

const STORAGE_KEY = "khanhduy_shop_cart";

const loadCart = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );
};

export const useCartStore = create((set, get) => ({
  items: loadCart(),

  addToCart(product) {
    const items = [...get().items];

    const index = items.findIndex(
      (i) => i.id === product.id
    );

    if (index !== -1) {
      items[index].quantity += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        image: product.image,
        quantity: 1,

        role: product.role ?? "customer",

        normalPrice:
          product.normalPrice ??
          product.price,

        sellerPrice:
          product.sellerPrice ??
          product.price,

        price: product.price,
      });
    }

    saveCart(items);

    set({ items });
  },

  increase(id) {
    const items = get().items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCart(items);

    set({ items });
  },

  decrease(id) {
    const items = get()
      .items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity - 1
              ),
            }
          : item
      );

    saveCart(items);

    set({ items });
  },

  setQuantity(id, quantity) {
    const items = get().items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(
              1,
              quantity
            ),
          }
        : item
    );

    saveCart(items);

    set({ items });
  },

  remove(id) {
    const items = get().items.filter(
      (item) => item.id !== id
    );

    saveCart(items);

    set({ items });
  },

  removeFromCart(id) {
    get().remove(id);
  },

  clear() {
    saveCart([]);

    set({
      items: [],
    });
  },

  clearCart() {
    get().clear();
  },

  refreshPrices(role) {
    const items = get().items.map(
      (item) => ({
        ...item,
        role,
        price:
          role === "seller"
            ? item.sellerPrice
            : item.normalPrice,
      })
    );

    saveCart(items);

    set({ items });
  },

  getSubtotal() {
    return get().items.reduce(
      (sum, item) =>
        sum +
        item.price * item.quantity,
      0
    );
  },

  getQuantity() {
    return get().items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );
  },
}));