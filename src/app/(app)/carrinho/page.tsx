import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { CartPageContent } from "./CartPageContent";

function CartFallback() {
  return (
    <>
      <Header />
      <main>
        <div
          style={{
            minHeight: "40vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          A carregar…
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CarrinhoPage() {
  return (
    <Suspense fallback={<CartFallback />}>
      <CartPageContent />
    </Suspense>
  );
}
