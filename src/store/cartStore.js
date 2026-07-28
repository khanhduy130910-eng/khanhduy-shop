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

const persist = (items, set) => {
  saveCart(items);
  set({ items });
};

export const useCartStore = create((set, get) => ({
  items: loadCart(),

  addToCart(product) {
    const items = [...get().items];

    const index = items.findIndex(
      (item) => item.id === product.id
    );

    if (index >= 0) {
      items[index].quantity += 1;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        image: product.image,
        quantity: 1,
        selected: true,

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

    persist(items, set);
  },

  increase(id) {
    persist(
      get().items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      ),
      set
    );
  },

  decrease(id) {
    persist(
      get().items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity - 1
              ),
            }
          : item
      ),
      set
    );
  },

  setQuantity(id, quantity) {
    persist(
      get().items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                Number(quantity) || 1
              ),
            }
          : item
      ),
      set
    );
  },

  remove(id) {
    persist(
      get().items.filter(
        (item) => item.id !== id
      ),
      set
    );
  },

  removeFromCart(id) {
    get().remove(id);
  },

  clear() {
    persist([], set);
  },

  clearCart() {
    get().clear();
  },

  toggleSelect(id) {
    persist(
      get().items.map((item) =>
        item.id === id
          ? {
              ...item,
              selected: !item.selected,
            }
          : item
      ),
      set
    );
  },

  toggleSelectAll() {
    const items = get().items;

    const allSelected =
      items.length > 0 &&
      items.every((i) => i.selected);

    persist(
      items.map((item) => ({
        ...item,
        selected: !allSelected,
      })),
      set
    );
  },

  isInCart(id) {
    return get().items.some(
      (item) => item.id === id
    );
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

    persist(items, set);
  },

  getItems() {
    return get().items;
  },

  getSelectedItems() {
    return get().items.filter(
      (item) => item.selected
    );
  },

  getQuantity() {
    return get().items.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );
  },

  getSelectedQuantity() {
    return get()
      .items.filter(
        (item) => item.selected
      )
      .reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      );
  },

  getSubtotal() {
    return get().items.reduce(
      (sum, item) =>
        sum +
        item.price * item.quantity,
      0
    );
  },

  getSelectedSubtotal() {
    return get()
      .items.filter(
        (item) => item.selected
      )
      .reduce(
        (sum, item) =>
          sum +
          item.price * item.quantity,
        0
      );
  },

  sync() {
    persist(loadCart(), set);
  },
}));