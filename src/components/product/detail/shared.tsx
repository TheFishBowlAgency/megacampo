"use client";

import { useState } from "react";
import { Box, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Container } from "@/components/layout";
import { Link, QuantitySelector } from "@/components/ui";
import { TIME_PERIODS } from "@/lib/booking/constants";
import { BUTTON_SHADOW } from "@/lib/ui/buttonShadow";

export interface ProductExtra {
  id: string;
  name: string;
  price: string;
  imageSrc?: string;
}

export function ProductImage({
  name,
  imageSrc,
}: {
  name: string;
  imageSrc?: string;
}) {
  return (
    <Box
      bg="#DADADA"
      w={{ base: "full", md: "280px", lg: "316px" }}
      maxW={{ base: "full", lg: "316px" }}
      h={{ base: "320px", md: "350px", lg: "370px" }}
      flexShrink={0}
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      pt="5"
      position="relative"
      overflow="hidden"
      mx={{ base: "auto", lg: "0" }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 991px) 280px, 316px"
          style={{ objectFit: "cover" }}
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
            {name}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export function AddToCartButton({
  onClick,
  disabled,
}: {
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Box
      as="button"
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      bg="primary"
      color="grayLight"
      px="8"
      py="4"
      borderRadius="6px"
      fontWeight="medium"
      fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
      fontFamily="body"
      textTransform="uppercase"
      cursor={disabled ? "not-allowed" : "pointer"}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : "auto"}
      _hover={{ opacity: disabled ? 0.5 : 0.9 }}
      transition="opacity 0.15s"
      boxShadow={BUTTON_SHADOW}
      w={{ base: "full", lg: "auto" }}
      textAlign="center"
    >
      Adicionar ao carrinho
    </Box>
  );
}

export function CheckoutButton({
  variant = "solid",
  onClick,
  disabled,
}: {
  variant?: "solid" | "outline";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const isOutline = variant === "outline";

  return (
    <Box
      as="button"
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled || undefined}
      bg={isOutline ? { base: "transparent", lg: "grayLight" } : "primary"}
      color={isOutline ? "primary" : "grayLight"}
      border={isOutline ? "3px solid" : undefined}
      borderColor={isOutline ? "primary" : undefined}
      px="8"
      py="4"
      borderRadius="6px"
      fontWeight="medium"
      fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}
      fontFamily="body"
      textTransform="uppercase"
      cursor={disabled ? "not-allowed" : "pointer"}
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : "auto"}
      _hover={{ opacity: disabled ? 0.5 : 0.9 }}
      transition="opacity 0.15s"
      boxShadow={BUTTON_SHADOW}
      w={{ base: "full", lg: "auto" }}
      textAlign="center"
    >
      Checkout
    </Box>
  );
}

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

export function DateInput({
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

export function PeriodSelect({
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

function ExtraImagePlaceholder() {
  return (
    <Box
      bg="#DADADA"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="full"
      h="full"
    >
      <Box color="grayMid" opacity={0.6}>
        <ImagePlaceholderIcon />
      </Box>
    </Box>
  );
}

function ExtrasEmptyState() {
  return (
    <Box py="8" textAlign="center">
      <Text textStyle="body" color="fg.muted">
        Não existem extras de grupo disponíveis neste momento.
      </Text>
    </Box>
  );
}

function ExtrasListDesktop({
  extras,
  quantities,
  onQuantityChange,
  onAddExtra,
}: {
  extras: ProductExtra[];
  quantities: Record<string, number>;
  onQuantityChange: (id: string, qty: number) => void;
  onAddExtra?: (extraId: string, quantity: number) => void;
}) {
  if (extras.length === 0) {
    return <ExtrasEmptyState />;
  }

  return (
    <VStack align="stretch" gap="8">
      {extras.map((extra, i) => (
        <Box key={extra.id}>
          <Flex align="center" justify="space-between">
            <HStack gap="6" w="354px">
              <Box
                w="150px"
                h="150px"
                flexShrink={0}
                position="relative"
                overflow="hidden"
              >
                {extra.imageSrc ? (
                  <Image
                    src={extra.imageSrc}
                    alt={extra.name}
                    fill
                    sizes="150px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <ExtraImagePlaceholder />
                )}
              </Box>
              <VStack align="start" gap="2">
                <Text
                  fontSize={{ base: "body.md", xl: "body.lg" }}
                  color="fg.muted"
                  lineHeight="1"
                >
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

            <AddToCartButton
              onClick={() => onAddExtra?.(extra.id, quantities[extra.id] ?? 1)}
              disabled={!onAddExtra}
            />
          </Flex>
          {i < extras.length - 1 && <Box h="1px" bg="dark" mt="8" />}
        </Box>
      ))}
    </VStack>
  );
}

function ExtrasListMobile({
  extras,
  quantities,
  onQuantityChange,
  onAddExtra,
}: {
  extras: ProductExtra[];
  quantities: Record<string, number>;
  onQuantityChange: (id: string, qty: number) => void;
  onAddExtra?: (extraId: string, quantity: number) => void;
}) {
  if (extras.length === 0) {
    return <ExtrasEmptyState />;
  }

  return (
    <VStack align="stretch" gap="4">
      {extras.map((extra, i) => (
        <Box key={extra.id}>
          <VStack align="stretch" gap="6">
            <HStack gap="5" align="start">
              <Box
                w="90px"
                h="90px"
                flexShrink={0}
                position="relative"
                overflow="hidden"
              >
                {extra.imageSrc ? (
                  <Image
                    src={extra.imageSrc}
                    alt={extra.name}
                    fill
                    sizes="90px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <ExtraImagePlaceholder />
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
            <AddToCartButton
              onClick={() => onAddExtra?.(extra.id, quantities[extra.id] ?? 1)}
              disabled={!onAddExtra}
            />
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
        fontSize={{ base: "body.md", xl: "body.lg" }}
        color={active ? "primary" : "fg.muted"}
        textTransform="uppercase"
        lineHeight="1"
      >
        {children}
      </Text>
    </Box>
  );
}

export type IncludedActivityContent = {
  categoryLabel: string;
  packageName: string;
  description?: string;
  items: string[];
};

function IncludedActivityPanel({
  content,
}: {
  content: IncludedActivityContent;
}) {
  const mid = Math.ceil(content.items.length / 2);
  const left = content.items.slice(0, mid);
  const right = content.items.slice(mid);

  return (
    <VStack
      align="stretch"
      gap={{ base: "5", lg: "6" }}
      py={{ base: "2", lg: "4" }}
    >
      <Text fontSize={{ base: "sm", lg: "md" }} color="fg.muted">
        {content.categoryLabel}
      </Text>
      <Text
        as="h3"
        fontWeight="extrabold"
        fontSize={{ base: "xl", lg: "2xl" }}
        color="fg"
        textTransform="uppercase"
      >
        {content.packageName}
      </Text>
      {content.description ? (
        <Text
          fontWeight="bold"
          fontSize={{ base: "sm", lg: "md", xl: "body.lg" }}
          color="fg"
          lineHeight="1.5"
          maxW="3xl"
        >
          {content.description}
        </Text>
      ) : null}
      {content.items.length > 0 ? (
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: "3", md: "6" }}
          maxW="4xl"
        >
          {[left, right].map((column, columnIndex) => (
            <VStack key={columnIndex} align="stretch" gap="3">
              {column.map((item) => (
                <HStack key={item} align="flex-start" gap="3">
                  <Box
                    mt="2"
                    boxSize="6px"
                    borderRadius="full"
                    bg="fg"
                    flexShrink={0}
                  />
                  <Text
                    fontSize={{ base: "sm", lg: "md", xl: "body.lg" }}
                    color="fg"
                  >
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>
          ))}
        </Grid>
      ) : (
        <Text fontSize="sm" color="fg.muted">
          Informação sobre itens incluídos na atividade.
        </Text>
      )}
    </VStack>
  );
}

export function ExtrasSection({
  extras,
  included,
  backHref,
  backLabel,
  onAddExtra,
  onCheckout,
}: {
  extras: ProductExtra[];
  included: IncludedActivityContent;
  backHref: string;
  backLabel: string;
  onAddExtra?: (extraId: string, quantity: number) => void;
  onCheckout?: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"extras" | "included">("extras");
  const [expandedMobile, setExpandedMobile] = useState<
    "extras" | "included" | null
  >("extras");
  const [extraQuantities, setExtraQuantities] = useState<
    Record<string, number>
  >({});

  const setExtraQty = (id: string, qty: number) => {
    setExtraQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  return (
    <Container pb={{ base: "10", lg: "16" }}>
      <VStack align="stretch" gap={{ base: "8", lg: "16" }}>
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

        <Box display={{ base: "none", lg: "block" }}>
          {activeTab === "extras" ? (
            <ExtrasListDesktop
              extras={extras}
              quantities={extraQuantities}
              onQuantityChange={setExtraQty}
              onAddExtra={onAddExtra}
            />
          ) : (
            <IncludedActivityPanel content={included} />
          )}
        </Box>

        <VStack display={{ base: "flex", lg: "none" }} align="stretch" gap="8">
          <VStack align="stretch" gap="8">
            <Flex
              justify="space-between"
              align="center"
              cursor="pointer"
              bg={expandedMobile === "extras" ? "primary" : "transparent"}
              color={expandedMobile === "extras" ? "fg" : "fg.muted"}
              px="4"
              py="3"
              onClick={() =>
                setExpandedMobile(expandedMobile === "extras" ? null : "extras")
              }
            >
              <Text
                fontWeight="extrabold"
                fontSize="md"
                textTransform="uppercase"
              >
                Extras
              </Text>
              <ChevronIcon
                direction={expandedMobile === "extras" ? "up" : "down"}
              />
            </Flex>
            {expandedMobile === "extras" && (
              <ExtrasListMobile
                extras={extras}
                quantities={extraQuantities}
                onQuantityChange={setExtraQty}
                onAddExtra={onAddExtra}
              />
            )}
          </VStack>

          <VStack align="stretch" gap="8">
            <Flex
              justify="space-between"
              align="center"
              cursor="pointer"
              bg={expandedMobile === "included" ? "primary" : "transparent"}
              color={expandedMobile === "included" ? "fg" : "fg.muted"}
              px="4"
              py="3"
              onClick={() =>
                setExpandedMobile(
                  expandedMobile === "included" ? null : "included",
                )
              }
            >
              <Text
                fontWeight="extrabold"
                fontSize="md"
                textTransform="uppercase"
              >
                Incluído na atividade
              </Text>
              <ChevronIcon
                direction={expandedMobile === "included" ? "up" : "down"}
              />
            </Flex>
            {expandedMobile === "included" && (
              <IncludedActivityPanel content={included} />
            )}
          </VStack>
        </VStack>

        <Flex
          justify={{ base: "center", lg: "space-between" }}
          align="center"
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "7", lg: "0" }}
        >
          <Link
            href={backHref}
            display="flex"
            alignItems="center"
            gap="3"
            color="fg.muted"
            _hover={{ color: "primary" }}
          >
            <ChevronLeftIcon />
            <Text fontSize={{ base: "md", lg: "body.md", xl: "body.lg" }}>
              {backLabel}
            </Text>
          </Link>

          <CheckoutButton onClick={onCheckout} disabled={!onCheckout} />

          <Box
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
            gap="3"
            opacity={0}
            pointerEvents="none"
          >
            <ChevronLeftIcon />
            <Text fontSize={{ base: "body.md", xl: "body.lg" }}>
              {backLabel}
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Container>
  );
}

export function ChevronLeftIcon() {
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
