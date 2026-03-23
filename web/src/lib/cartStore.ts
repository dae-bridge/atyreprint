import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: string;
  variants: Record<string, string>;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (
    productId: string,
    color: string,
    variants: Record<string, string>,
  ) => void;
  updateQuantity: (
    productId: string,
    color: string,
    variants: Record<string, string>,
    quantity: number,
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

function itemKey(item: {
  productId: string;
  color: string;
  variants: Record<string, string>;
}) {
  return `${item.productId}|${item.color}|${JSON.stringify(item.variants)}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const key = itemKey(newItem);
          const existing = state.items.find((i) => itemKey(i) === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i) === key
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId, color, variants) => {
        const key = itemKey({ productId, color, variants });
        set((state) => ({
          items: state.items.filter((i) => itemKey(i) !== key),
        }));
      },

      updateQuantity: (productId, color, variants, quantity) => {
        const key = itemKey({ productId, color, variants });
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => itemKey(i) !== key)
              : state.items.map((i) =>
                  itemKey(i) === key ? { ...i, quantity } : i,
                ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: "atyreprint-cart" },
  ),
);
