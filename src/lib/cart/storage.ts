import type { CartLineItem } from '@/components/cart/types';

export const CART_STORAGE_KEY = 'megacampo-cart';

export interface CartState {
  items: CartLineItem[];
  observations: string;
}

export const EMPTY_CART_STATE: CartState = {
  items: [],
  observations: '',
};

export function loadCartState(): CartState {
  if (typeof window === 'undefined') {
    return EMPTY_CART_STATE;
  }

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return EMPTY_CART_STATE;

    const parsed = JSON.parse(raw) as CartState;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      observations:
        typeof parsed.observations === 'string' ? parsed.observations : '',
    };
  } catch {
    return EMPTY_CART_STATE;
  }
}

export function saveCartState(state: CartState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
}

const CART_CHANGE_EVENT = 'megacampo-cart-change';

export function notifyCartChange(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function subscribeToCart(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handler = () => onStoreChange();
  window.addEventListener('storage', handler);
  window.addEventListener(CART_CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(CART_CHANGE_EVENT, handler);
  };
}

export function getServerCartSnapshot(): CartState {
  return EMPTY_CART_STATE;
}

export function updateCartState(
  updater: (prev: CartState) => CartState,
): void {
  const next = updater(loadCartState());
  saveCartState(next);
  notifyCartChange();
}
