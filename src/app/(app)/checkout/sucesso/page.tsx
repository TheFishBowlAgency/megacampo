import { Suspense } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { PromoInfoBar } from "@/components/ui";
import { CartAlertBanner } from "@/components/cart";
import { Breadcrumb, Container } from "@/components/layout";
import { CheckoutSuccessContent } from "./CheckoutSuccessContent";

const BREADCRUMB_ITEMS = [
  { label: "Reservas", href: "/#reservas" },
  { label: "Carrinho", href: "/carrinho" },
  { label: "Checkout" },
];

function Fallback() {
  return (
    <Box py="12">
      <Text textStyle="body" color="fg.muted">
        A carregar...
      </Text>
    </Box>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <PromoInfoBar />
      <main>
        <Breadcrumb items={BREADCRUMB_ITEMS} />
        <CartAlertBanner message="A tua reserva foi concluída com sucesso." />
        <Box bg="bg.subtle" minH="60vh">
          <Container py={{ base: "8", md: "12", xl: "16" }}>
            <Suspense fallback={<Fallback />}>
              <CheckoutSuccessContent />
            </Suspense>
          </Container>
        </Box>
        <Footer />
      </main>
    </>
  );
}
