'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

import type { CartLineItem } from '@/components/cart/types';
import {
  EMPTY_CART_STATE,
  loadCartState,
  subscribeToCart,
  getServerCartSnapshot,
  updateCartState,
} from '@/lib/cart/storage';

interface CartContextValue {
  items: CartLineItem[];
  observations: string;
  isHydrated: boolean;
  itemCount: number;
  addItem: (item: CartLineItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  setObservations: (value: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(
    subscribeToCart,
    loadCartState,
    getServerCartSnapshot,
  );

  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const addItem = useCallback((item: CartLineItem) => {
    updateCartState((prev) => ({
      ...prev,
      items: [...prev.items, item],
    }));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    updateCartState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    updateCartState((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }, []);

  const setObservations = useCallback((value: string) => {
    updateCartState((prev) => ({ ...prev, observations: value }));
  }, []);

  const clearCart = useCallback(() => {
    updateCartState(() => EMPTY_CART_STATE);
  }, []);

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items],
  );

  const value = useMemo(
    () => ({
      items: state.items,
      observations: state.observations,
      isHydrated,
      itemCount,
      addItem,
      updateQuantity,
      removeItem,
      setObservations,
      clearCart,
    }),
    [
      state.items,
      state.observations,
      isHydrated,
      itemCount,
      addItem,
      updateQuantity,
      removeItem,
      setObservations,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
