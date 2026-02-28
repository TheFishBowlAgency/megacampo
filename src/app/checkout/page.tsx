import { Suspense } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { CheckoutPageContent } from "./CheckoutPageContent";

function CheckoutFallback() {
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

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutPageContent />
    </Suspense>
  );
}
