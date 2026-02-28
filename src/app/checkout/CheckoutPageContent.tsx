"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { Breadcrumb, Container } from "@/components/layout";
import {
  CheckoutForm,
  CheckoutOrderSummary,
  PaymentMethodSection,
  TermsSection,
  INITIAL_FORM_DATA,
  type CheckoutFormData,
} from "@/components/checkout";
import type { CartLineItem } from "@/components/cart/types";

const BREADCRUMB_ITEMS = [
  { label: "Reservas", href: "/#reservas" },
  { label: "Carrinho", href: "/carrinho" },
  { label: "Checkout" },
];

const MOCK_ITEMS: CartLineItem[] = [
  {
    id: "1",
    productName: "Paintball COMMANDO",
    details: [
      { label: "Data", value: "22/01/2026" },
      { label: "Período", value: "Manhã" },
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

const MOBILE_STEP_BACK_LABELS = [
  null,
  "Voltar aos teus dados",
  "Voltar ao Método de Pagamento",
  "Voltar aos Termos e Condições de Reserva",
];

const MOBILE_STEP_SUBTITLES = [
  "Os teus dados",
  "Método de Pagamento",
  "Termos e Condições de Reserva",
  null,
];

const TOTAL_MOBILE_STEPS = 4;

function ArrowRightIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 10H16M16 10L10 4M16 10L10 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckoutPageContent() {
  const [formData, setFormData] = useState<CheckoutFormData>(INITIAL_FORM_DATA);
  const [paymentMethod, setPaymentMethod] = useState("multibanco");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const [mobileStep, setMobileStep] = useState(0);

  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;

  const canGoNext = mobileStep < TOTAL_MOBILE_STEPS - 1;
  const canGoBack = mobileStep > 0;

  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={BREADCRUMB_ITEMS} />

        <Box bg="bg.subtle" minH="60vh">
          <Container py={{ base: "8", md: "10", lg: "12" }}>
            {/* Page heading */}
            <Box mb={{ base: "8", md: "16" }}>
              <Text textStyle="h3" color="fg" mb="4">
                CHECKOUT
              </Text>
              {isMobile && MOBILE_STEP_SUBTITLES[mobileStep] ? (
                <Text textStyle="h5" color="fg">
                  {MOBILE_STEP_SUBTITLES[mobileStep]}
                </Text>
              ) : !isMobile ? (
                <Text textStyle="h5" color="fg">
                  Os teus dados
                </Text>
              ) : null}
            </Box>

            {/* Desktop layout: 2 columns */}
            {!isMobile && (
              <Grid
                templateColumns={{ md: "1fr 380px", lg: "1fr 440px" }}
                gap={{ md: "8", lg: "12" }}
                alignItems="start"
              >
                {/* Left column: form + sections */}
                <Box display="flex" flexDirection="column" gap="12">
                  <CheckoutForm data={formData} onChange={setFormData} />

                  {/* Payment method */}
                  <Box display="flex" flexDirection="column" gap="8">
                    <Box h="1px" bg="fg" w="full" />
                    <Text textStyle="h5" color="fg">
                      Método de Pagamento
                    </Text>
                    <PaymentMethodSection
                      value={paymentMethod}
                      onChange={setPaymentMethod}
                    />
                    <Box h="1px" bg="fg" w="full" />
                  </Box>

                  {/* Terms and conditions */}
                  <Box display="flex" flexDirection="column" gap="8">
                    <Text textStyle="h5" color="fg">
                      Termos e Condições de Reserva
                    </Text>
                    <TermsSection
                      acceptTerms={acceptTerms}
                      onAcceptTermsChange={setAcceptTerms}
                      acceptMarketing={acceptMarketing}
                      onAcceptMarketingChange={setAcceptMarketing}
                    />
                  </Box>

                  {/* Submit button */}
                  <Button
                    w="full"
                    bg="primary"
                    color="white"
                    borderRadius="6px"
                    h="56px"
                    textStyle="button"
                    textTransform="uppercase"
                    _hover={{ bg: "primary.muted", color: "fg" }}
                  >
                    Reservar
                  </Button>
                </Box>

                {/* Right column: order summary */}
                <Box position="sticky" top="8">
                  <CheckoutOrderSummary items={MOCK_ITEMS} />
                </Box>
              </Grid>
            )}

            {/* Mobile layout: step wizard */}
            {isMobile && (
              <Box>
                {/* Step 0: Personal data */}
                {mobileStep === 0 && (
                  <CheckoutForm data={formData} onChange={setFormData} />
                )}

                {/* Step 1: Payment method */}
                {mobileStep === 1 && (
                  <PaymentMethodSection
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                  />
                )}

                {/* Step 2: Terms & conditions */}
                {mobileStep === 2 && (
                  <TermsSection
                    acceptTerms={acceptTerms}
                    onAcceptTermsChange={setAcceptTerms}
                    acceptMarketing={acceptMarketing}
                    onAcceptMarketingChange={setAcceptMarketing}
                  />
                )}

                {/* Step 3: Order summary + submit */}
                {mobileStep === 3 && (
                  <Box display="flex" flexDirection="column" gap="6">
                    <CheckoutOrderSummary items={MOCK_ITEMS} />
                    <Button
                      w="full"
                      bg="primary"
                      color="white"
                      borderRadius="6px"
                      h="56px"
                      textStyle="button"
                      textTransform="uppercase"
                      _hover={{ bg: "primary.muted", color: "fg" }}
                    >
                      Reservar
                    </Button>
                  </Box>
                )}

                {/* Mobile navigation */}
                <Flex justify="space-between" align="center" mt="8" pt="4">
                  {canGoBack ? (
                    <Text
                      as="button"
                      textStyle="body"
                      color="fg.muted"
                      fontSize={{ base: "sm", sm: "md" }}
                      cursor="pointer"
                      onClick={() => setMobileStep((s) => s - 1)}
                      _hover={{ color: "fg" }}
                    >
                      ‹ {MOBILE_STEP_BACK_LABELS[mobileStep]}
                    </Text>
                  ) : (
                    <Box />
                  )}

                  {canGoNext && (
                    <IconButton
                      aria-label="Próximo passo"
                      bg="primary"
                      color="white"
                      borderRadius="full"
                      size="lg"
                      _hover={{ bg: "primary.muted", color: "fg" }}
                      onClick={() => setMobileStep((s) => s + 1)}
                    >
                      <ArrowRightIcon />
                    </IconButton>
                  )}
                </Flex>
              </Box>
            )}
          </Container>
        </Box>

        <Footer />
      </main>
    </>
  );
}
