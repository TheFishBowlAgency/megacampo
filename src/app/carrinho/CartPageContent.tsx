"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import {
  Breadcrumb,
  CartAlertBanner,
  CartEmptyView,
  CartWithItemsView,
  type CartLineItem,
} from "@/components/cart";

const BREADCRUMB_ITEMS = [
  { label: "Reservas", href: "/#reservas" },
  { label: "Carrinho" },
];

const MOCK_ITEMS: CartLineItem[] = [
  {
    id: "1",
    productName: "Paintball COMMANDO",
    details: [
      { label: "Data", value: "22/01/2026" },
      { label: "Período", value: "Manhã: 9h30-13h" },
    ],
    quantity: 8,
    unitPrice: 29.95,
  },
  {
    id: "2",
    productName: "Extras",
    productSubtitle: "500 BOLAS",
    details: [],
    quantity: 1,
    unitPrice: 35.0,
  },
];

export function CartPageContent() {
  const searchParams = useSearchParams();
  const previewWithItems = searchParams.get("preview") === "1";
  const [items, setItems] = useState<CartLineItem[]>([]);
  const seededRef = useRef(false);

  useEffect(() => {
    if (!previewWithItems || seededRef.current) return;
    seededRef.current = true;
    const id = setTimeout(() => setItems(MOCK_ITEMS), 0);
    return () => clearTimeout(id);
  }, [previewWithItems]);
  const [observations, setObservations] = useState("");

  const handleQuantityChange = useCallback((id: string, quantity: number) => {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isEmpty = items.length === 0;

  return (
    <>
      <Header />
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
          {isEmpty ? (
            <CartEmptyView />
          ) : (
            <CartWithItemsView
              items={items}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
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
