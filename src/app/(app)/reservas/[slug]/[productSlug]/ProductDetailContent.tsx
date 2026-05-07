"use client";

import { useState } from "react";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { Container } from "@/components/layout";
import { InfoBar, Link, QuantitySelector } from "@/components/ui";
import { CategoriesSidebar, ProductSearchBar } from "@/components/category";
import type { Category, CategoryProduct } from "@/data/categories";
import { TIME_PERIODS } from "@/data/categories";

export interface ProductDetailContentProps {
  category: Category;
  product: CategoryProduct;
}

export function ProductDetailContent({
  category,
  product,
}: ProductDetailContentProps) {
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState(TIME_PERIODS[0].value);
  const [activeTab, setActiveTab] = useState<"extras" | "included">("extras");
  const [expandedMobile, setExpandedMobile] = useState<
    "extras" | "included" | null
  >("extras");
  const [extraQuantities, setExtraQuantities] = useState<
    Record<string, number>
  >({});

  const extras = category.extras ?? [];

  const setExtraQty = (id: string, qty: number) => {
    setExtraQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  return (
    <>
      <Header />
      <main style={{ backgroundColor: "var(--chakra-colors-gray-light)" }}>
        <InfoBar>Desconto online de 20% em todos os extras</InfoBar>

        {/* Breadcrumb + Search row */}
        <Container py={{ base: "4", lg: "6" }}>
          <Flex
            justify="space-between"
            align={{ base: "stretch", lg: "center" }}
            direction={{ base: "column", lg: "row" }}
            gap={{ base: "4", lg: "0" }}
          >
            <HStack
              gap={{ base: "1.5", lg: "3" }}
              fontSize={{ base: "sm", lg: "body.lg" }}
              flexWrap="wrap"
              overflow="hidden"
            >
              <HStack gap="1.5" flexShrink={0}>
                <ChevronLeftIcon />
                <Link href="/" color="fg.muted" _hover={{ color: "primary" }}>
                  Voltar /
                </Link>
              </HStack>
              <Link href="/" color="fg.muted" _hover={{ color: "primary" }}>
                Página Inicial /
              </Link>
              <Link
                href="/#reservas"
                color="fg.muted"
                _hover={{ color: "primary" }}
              >
                Reservas /
              </Link>
              <Link
                href={`/reservas/${category.slug}`}
                color="fg.muted"
                _hover={{ color: "primary" }}
              >
                {category.name} /
              </Link>
              <Text as="span" color="fg" fontWeight="normal">
                {product.name}
              </Text>
            </HStack>

            <Box display={{ base: "none", lg: "block" }}>
              <ProductSearchBar value={search} onChange={setSearch} />
            </Box>
          </Flex>

          <Box display={{ base: "block", lg: "none" }} mt="2">
            <ProductSearchBar value={search} onChange={setSearch} />
          </Box>
        </Container>

        {/* Main product section */}
        <Container pb={{ base: "10", lg: "16" }}>
          <Flex gap={{ base: "0", lg: "50px" }} align="flex-start">
            {/* Sidebar – desktop only */}
            <Box display={{ base: "none", lg: "block" }}>
              <CategoriesSidebar activeSlug={category.slug} />
            </Box>

            {/* Product image + details */}
            <Flex
              flex="1"
              minW={0}
              direction={{ base: "column", lg: "row" }}
              gap={{ base: "6", lg: "50px" }}
            >
              {/* Mobile: product name + price above image */}
              <Box display={{ base: "block", lg: "none" }}>
                <VStack align="start" gap="4">
                  <Text textStyle="h5" color="fg" fontSize="xl">
                    {product.name.toUpperCase()}
                  </Text>
                  <Text
                    fontWeight="extrabold"
                    fontSize="md"
                    color="primary"
                    lineHeight="1"
                  >
                    {product.price}€
                  </Text>
                </VStack>
              </Box>

              {/* Product image */}
              <ProductImage product={product} />

              {/* Product details form */}
              <VStack
                align="stretch"
                gap="8"
                flex={{ base: "auto", lg: "1" }}
                minW={0}
              >
                {/* Desktop: product name + price */}
                <Box display={{ base: "none", lg: "block" }}>
                  <VStack align="start" gap="6">
                    <Text textStyle="h3" color="fg">
                      {product.name.toUpperCase()}
                    </Text>
                    <Text textStyle="h5" color="primary" lineHeight="1">
                      {product.price}€
                    </Text>
                    <Box h="1px" bg="dark" w="full" />
                  </VStack>
                </Box>

                {/* Date selector */}
                <VStack align="stretch" gap="2">
                  <Text
                    fontSize={{ base: "sm", lg: "body.lg" }}
                    color="fg.muted"
                  >
                    Seleciona uma data
                  </Text>
                  <DateInput value={date} onChange={setDate} />
                </VStack>

                {/* Period selector */}
                <VStack align="stretch" gap="2">
                  <Text
                    fontSize={{ base: "sm", lg: "body.lg" }}
                    color="fg.muted"
                  >
                    Seleciona um período de atividade
                  </Text>
                  <PeriodSelect value={period} onChange={setPeriod} />
                </VStack>

                {/* Quantity selector */}
                <VStack align="stretch" gap="2">
                  <Text
                    fontSize={{ base: "sm", lg: "body.lg" }}
                    color="fg.muted"
                  >
                    Seleciona a quantidade
                  </Text>
                  <QuantitySelector value={quantity} onChange={setQuantity} />
                </VStack>

                {/* CTA buttons */}
                <Flex gap="4" direction={{ base: "column", lg: "row" }}>
                  <Box
                    as="button"
                    bg="primary"
                    color="grayLight"
                    px="8"
                    py="4"
                    borderRadius="6px"
                    fontWeight="medium"
                    fontSize={{ base: "md", lg: "body.lg" }}
                    fontFamily="body"
                    textTransform="uppercase"
                    cursor="pointer"
                    _hover={{ opacity: 0.9 }}
                    transition="opacity 0.15s"
                    boxShadow={{
                      base: "0px 5px 16px rgba(0,0,0,0.22)",
                      lg: "none",
                    }}
                    w={{ base: "full", lg: "auto" }}
                    textAlign="center"
                  >
                    Adicionar ao carrinho
                  </Box>
                  <Box
                    as="button"
                    bg={{ base: "transparent", lg: "grayLight" }}
                    color="primary"
                    border="3px solid"
                    borderColor="primary"
                    px="8"
                    py="4"
                    borderRadius="6px"
                    fontWeight="medium"
                    fontSize={{ base: "md", lg: "body.lg" }}
                    fontFamily="body"
                    textTransform="uppercase"
                    cursor="pointer"
                    _hover={{ opacity: 0.9 }}
                    transition="opacity 0.15s"
                    boxShadow={{
                      base: "0px 5px 16px rgba(0,0,0,0.22)",
                      lg: "none",
                    }}
                    w={{ base: "full", lg: "auto" }}
                    textAlign="center"
                  >
                    Checkout
                  </Box>
                </Flex>
              </VStack>
            </Flex>
          </Flex>
        </Container>

        {/* Tabs + Extras section */}
        {extras.length > 0 && (
          <Container pb={{ base: "10", lg: "16" }}>
            <VStack align="stretch" gap={{ base: "8", lg: "16" }}>
              {/* Desktop tabs */}
              <Flex
                display={{ base: "none", lg: "flex" }}
                gap="70px"
                justify="center"
              >
                <TabButton
                  active={activeTab === "extras"}
                  onClick={() => setActiveTab("extras")}
                >
                  Melhora a tua atividade
                </TabButton>
                <TabButton
                  active={activeTab === "included"}
                  onClick={() => setActiveTab("included")}
                >
                  Incluído na atividade
                </TabButton>
              </Flex>

              {/* Desktop extras list */}
              <Box display={{ base: "none", lg: "block" }}>
                {activeTab === "extras" ? (
                  <ExtrasListDesktop
                    extras={extras}
                    quantities={extraQuantities}
                    onQuantityChange={setExtraQty}
                  />
                ) : (
                  <Box py="8" textAlign="center">
                    <Text textStyle="body" color="fg.muted">
                      Informação sobre itens incluídos na atividade.
                    </Text>
                  </Box>
                )}
              </Box>

              {/* Mobile accordion tabs */}
              <VStack
                display={{ base: "flex", lg: "none" }}
                align="stretch"
                gap="8"
              >
                {/* Extras tab mobile */}
                <VStack align="stretch" gap="8">
                  <Flex
                    justify="space-between"
                    align="center"
                    cursor="pointer"
                    onClick={() =>
                      setExpandedMobile(
                        expandedMobile === "extras" ? null : "extras",
                      )
                    }
                  >
                    <Box borderBottom="3px solid" borderColor="primary" pb="1">
                      <Text
                        fontWeight="medium"
                        fontSize="md"
                        color="primary"
                        textTransform="uppercase"
                      >
                        Melhora a tua atividade
                      </Text>
                    </Box>
                    <ChevronIcon
                      direction={expandedMobile === "extras" ? "up" : "down"}
                    />
                  </Flex>
                  {expandedMobile === "extras" && (
                    <ExtrasListMobile
                      extras={extras}
                      quantities={extraQuantities}
                      onQuantityChange={setExtraQty}
                    />
                  )}
                </VStack>

                {/* Included tab mobile */}
                <VStack align="stretch" gap="8">
                  <Flex
                    justify="space-between"
                    align="center"
                    cursor="pointer"
                    onClick={() =>
                      setExpandedMobile(
                        expandedMobile === "included" ? null : "included",
                      )
                    }
                  >
                    <Box borderBottom="3px solid" borderColor="fg.muted" pb="1">
                      <Text
                        fontWeight="medium"
                        fontSize="md"
                        color="fg.muted"
                        textTransform="uppercase"
                      >
                        Incluído na atividade
                      </Text>
                    </Box>
                    <ChevronIcon
                      direction={expandedMobile === "included" ? "up" : "down"}
                    />
                  </Flex>
                  {expandedMobile === "included" && (
                    <Box py="4" textAlign="center">
                      <Text fontSize="sm" color="fg.muted">
                        Informação sobre itens incluídos na atividade.
                      </Text>
                    </Box>
                  )}
                </VStack>
              </VStack>

              {/* Bottom: back link + checkout */}
              <Flex
                justify={{ base: "center", lg: "space-between" }}
                align="center"
                direction={{ base: "column", lg: "row" }}
                gap={{ base: "7", lg: "0" }}
              >
                <Link
                  href={`/reservas/${category.slug}`}
                  display="flex"
                  alignItems="center"
                  gap="3"
                  color="fg.muted"
                  _hover={{ color: "primary" }}
                >
                  <ChevronLeftIcon />
                  <Text fontSize={{ base: "md", lg: "body.lg" }}>
                    Voltar às Reservas
                  </Text>
                </Link>

                <Box
                  as="button"
                  bg="primary"
                  color="grayLight"
                  px="8"
                  py="4"
                  borderRadius="6px"
                  fontWeight="medium"
                  fontSize={{ base: "md", lg: "body.lg" }}
                  fontFamily="body"
                  textTransform="uppercase"
                  cursor="pointer"
                  _hover={{ opacity: 0.9 }}
                  transition="opacity 0.15s"
                  w={{ base: "full", lg: "auto" }}
                  textAlign="center"
                >
                  Checkout
                </Box>

                {/* Invisible spacer for desktop centering */}
                <Box
                  display={{ base: "none", lg: "flex" }}
                  alignItems="center"
                  gap="3"
                  opacity={0}
                  pointerEvents="none"
                >
                  <ChevronLeftIcon />
                  <Text fontSize="body.lg">Voltar às Reservas</Text>
                </Box>
              </Flex>
            </VStack>
          </Container>
        )}

        <Footer />
      </main>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────

function ProductImage({ product }: { product: CategoryProduct }) {
  return (
    <Box
      bg="#DADADA"
      w={{ base: "full", lg: "316px" }}
      maxW="316px"
      h="370px"
      flexShrink={0}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      pt="5"
      position="relative"
    >
      {product.imageSrc ? (
        <img
          src={product.imageSrc}
          alt={product.name}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            position: "absolute",
            inset: 0,
          }}
        />
      ) : (
        <Box
          bg="primary"
          px="5"
          py="2"
          borderRadius="md"
          transform="rotate(-5.22deg)"
          mt="1"
        >
          <Text
            fontFamily="heading.molot"
            fontSize="2xl"
            color="dark"
            textAlign="center"
            whiteSpace="nowrap"
            lineHeight="1"
            textTransform="lowercase"
          >
            {product.name}
          </Text>
        </Box>
      )}
    </Box>
  );
}

function ExtraImagePlaceholder({ name }: { name: string }) {
  return (
    <Box
      bg="#DADADA"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box color="grayMid" opacity={0.6}>
        <ImagePlaceholderIcon />
      </Box>
    </Box>
  );
}

interface ExtrasListDesktopProps {
  extras: { id: string; name: string; price: string; imageSrc?: string }[];
  quantities: Record<string, number>;
  onQuantityChange: (id: string, qty: number) => void;
}

function ExtrasListDesktop({
  extras,
  quantities,
  onQuantityChange,
}: ExtrasListDesktopProps) {
  return (
    <VStack align="stretch" gap="8">
      {extras.map((extra, i) => (
        <Box key={extra.id}>
          <Flex align="center" justify="space-between">
            <HStack gap="6" w="354px">
              <Box w="150px" h="150px" flexShrink={0}>
                {extra.imageSrc ? (
                  <img
                    src={extra.imageSrc}
                    alt={extra.name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <ExtraImagePlaceholder name={extra.name} />
                )}
              </Box>
              <VStack align="start" gap="2">
                <Text fontSize="body.lg" color="fg.muted" lineHeight="1">
                  {extra.name.toUpperCase()}
                </Text>
                <Text textStyle="h5" color="fg" lineHeight="1">
                  {extra.price}€
                </Text>
              </VStack>
            </HStack>

            <Box w="354px" display="flex" justifyContent="center">
              <QuantitySelector
                value={quantities[extra.id] ?? 1}
                onChange={(v) => onQuantityChange(extra.id, v)}
              />
            </Box>

            <Box
              as="button"
              bg="primary"
              color="grayLight"
              px="8"
              py="4"
              borderRadius="6px"
              fontWeight="medium"
              fontSize="body.lg"
              fontFamily="body"
              textTransform="uppercase"
              cursor="pointer"
              _hover={{ opacity: 0.9 }}
              transition="opacity 0.15s"
              whiteSpace="nowrap"
            >
              Adicionar ao carrinho
            </Box>
          </Flex>
          {i < extras.length - 1 && <Box h="1px" bg="dark" mt="8" />}
        </Box>
      ))}
    </VStack>
  );
}

interface ExtrasListMobileProps {
  extras: { id: string; name: string; price: string; imageSrc?: string }[];
  quantities: Record<string, number>;
  onQuantityChange: (id: string, qty: number) => void;
}

function ExtrasListMobile({
  extras,
  quantities,
  onQuantityChange,
}: ExtrasListMobileProps) {
  return (
    <VStack align="stretch" gap="4">
      {extras.map((extra, i) => (
        <Box key={extra.id}>
          <VStack align="stretch" gap="6">
            <HStack gap="5" align="start">
              <Box w="90px" h="90px" flexShrink={0}>
                {extra.imageSrc ? (
                  <img
                    src={extra.imageSrc}
                    alt={extra.name}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <ExtraImagePlaceholder name={extra.name} />
                )}
              </Box>
              <VStack align="start" gap="2">
                <Text fontSize="sm" color="fg.muted" lineHeight="1">
                  {extra.name.toUpperCase()}
                </Text>
                <Text
                  fontWeight="extrabold"
                  fontSize="md"
                  color="fg"
                  lineHeight="1"
                >
                  {extra.price}€
                </Text>
                <QuantitySelector
                  value={quantities[extra.id] ?? 1}
                  onChange={(v) => onQuantityChange(extra.id, v)}
                />
              </VStack>
            </HStack>
            <Box
              as="button"
              bg="primary"
              color="grayLight"
              px="8"
              py="4"
              borderRadius="6px"
              fontWeight="medium"
              fontSize="md"
              fontFamily="body"
              textTransform="uppercase"
              cursor="pointer"
              _hover={{ opacity: 0.9 }}
              transition="opacity 0.15s"
              w="full"
              textAlign="center"
              boxShadow="0px 5px 16px rgba(0,0,0,0.22)"
            >
              Adicionar ao carrinho
            </Box>
          </VStack>
          {i < extras.length - 1 && <Box h="1px" bg="dark" mt="4" />}
        </Box>
      ))}
    </VStack>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Box
      as="button"
      borderBottom="3px solid"
      borderColor={active ? "primary" : "fg.muted"}
      pb="1"
      cursor="pointer"
      onClick={onClick}
      transition="border-color 0.15s"
    >
      <Text
        fontWeight="medium"
        fontSize="body.lg"
        color={active ? "primary" : "fg.muted"}
        textTransform="uppercase"
        lineHeight="1"
      >
        {children}
      </Text>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Form sub-components (native elements to avoid Chakra polymorphic TS issues)
// ─────────────────────────────────────────────────────────────────────

const dateInputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 18px",
  border: "1px solid #939598",
  borderRadius: "6px",
  fontWeight: 800,
  fontFamily: "var(--font-roboto), sans-serif",
  color: "#939598",
  backgroundColor: "white",
  outline: "none",
};

function DateInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={dateInputStyle}
      className="product-date-input"
    />
  );
}

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 48px 14px 18px",
  border: "1px solid #939598",
  borderRadius: "6px",
  fontWeight: 800,
  fontFamily: "var(--font-roboto), sans-serif",
  color: "#939598",
  backgroundColor: "white",
  appearance: "none",
  outline: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23939598' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
  backgroundSize: "24px",
};

function PeriodSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={selectStyle}
      className="product-period-select"
    >
      {TIME_PERIODS.map((tp) => (
        <option key={tp.value} value={tp.value}>
          {tp.label}
        </option>
      ))}
    </select>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────

function ChevronLeftIcon() {
  return (
    <svg
      width="10"
      height="18"
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M9 1L1 9L9 17"
        stroke="#939598"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="24"
      height="13"
      viewBox="0 0 24 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        flexShrink: 0,
        transform: direction === "up" ? "rotate(180deg)" : "none",
        transition: "transform 0.2s",
      }}
    >
      <path
        d="M2 2L12 11L22 2"
        stroke="#939598"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ImagePlaceholderIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="8"
        width="40"
        height="32"
        rx="2"
        stroke="#939598"
        strokeWidth="2"
      />
      <circle cx="16" cy="20" r="3" stroke="#939598" strokeWidth="2" />
      <path
        d="M4 32L16 24L28 32L36 26L44 32"
        stroke="#939598"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
