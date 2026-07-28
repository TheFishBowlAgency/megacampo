"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { PromoInfoBar } from "@/components/ui";
import {
  Breadcrumb,
  CartAlertBanner,
  CartEmptyView,
  CartWithItemsView,
} from "@/components/cart";
import { useCart } from "@/providers";

const BREADCRUMB_ITEMS = [
  { label: "Reservas", href: "/#reservas" },
  { label: "Carrinho" },
];

export function CartPageContent() {
  const {
    items,
    observations,
    setObservations,
    updateQuantity,
    removeItem,
    isHydrated,
  } = useCart();

  const isEmpty = !isHydrated || items.length === 0;

  return (
    <>
      <Header />
      <PromoInfoBar />
      <main>
        <Breadcrumb items={BREADCRUMB_ITEMS} />
        <CartAlertBanner
          message={
            isEmpty
              ? "Neste momento, não existem artigos no teu carrinho de compras."
              : "Por favor, verifica os detalhes da tua reserva."
          }
        />
        <section style={{ background: "var(--chakra-colors-bg-subtle)" }}>
          {!isHydrated ? (
            <CartEmptyView />
          ) : isEmpty ? (
            <CartEmptyView />
          ) : (
            <CartWithItemsView
              items={items}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
              observations={observations}
              onObservationsChange={setObservations}
            />
          )}
        </section>
        <Footer />
      </main>
    </>
  );
}
