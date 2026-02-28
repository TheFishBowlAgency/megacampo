"use client";

import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { SelectionDot } from "@/components/ui/SelectionDot";

export interface PaymentMethodSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const PAYMENT_OPTIONS = [
  {
    value: "multibanco",
    label: "Referência Multibanco",
    logoText: "MB",
    logoBg: "#00529B",
  },
  { value: "paypal", label: "Paypal", logoText: "PayPal", logoBg: "#003087" },
] as const;

function PaymentLogo({ text, bg }: { text: string; bg: string }) {
  return (
    <Flex
      h={{ base: "40px", md: "60px" }}
      px="3"
      align="center"
      justify="center"
    >
      <Text
        fontWeight="extrabold"
        fontSize={{ base: "md", md: "lg" }}
        color={bg}
        fontFamily="body"
        fontStyle={text === "PayPal" ? "italic" : "normal"}
      >
        {text}
      </Text>
    </Flex>
  );
}

/**
 * Payment method selection with radio-style options.
 * Desktop: radio options left, logos right.
 * Mobile: each option paired with its logo.
 */
export function PaymentMethodSection({
  value,
  onChange,
}: PaymentMethodSectionProps) {
  return (
    <Box>
      {/* Desktop layout */}
      <Flex
        display={{ base: "none", md: "flex" }}
        justify="space-between"
        align="center"
      >
        <HStack gap="12">
          {PAYMENT_OPTIONS.map((opt) => (
            <HStack key={opt.value} as="label" gap="4" cursor="pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
              />
              <SelectionDot selected={value === opt.value} />
              <Text
                textStyle="body"
                color={value === opt.value ? "fg" : "fg.muted"}
              >
                {opt.label}
              </Text>
            </HStack>
          ))}
        </HStack>
        <HStack gap="8">
          {PAYMENT_OPTIONS.map((opt) => (
            <PaymentLogo key={opt.value} text={opt.logoText} bg={opt.logoBg} />
          ))}
        </HStack>
      </Flex>

      {/* Mobile layout */}
      <Box
        display={{ base: "flex", md: "none" }}
        flexDirection="column"
        gap="4"
      >
        {PAYMENT_OPTIONS.map((opt) => (
          <Flex
            key={opt.value}
            as="label"
            justify="space-between"
            align="center"
            cursor="pointer"
          >
            <HStack gap="4">
              <input
                type="radio"
                name="paymentMethod"
                value={opt.value}
                checked={value === opt.value}
                onChange={() => onChange(opt.value)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: 0,
                  height: 0,
                }}
              />
              <SelectionDot selected={value === opt.value} />
              <Text
                textStyle="body"
                color={value === opt.value ? "fg" : "fg.muted"}
              >
                {opt.label}
              </Text>
            </HStack>
            <PaymentLogo text={opt.logoText} bg={opt.logoBg} />
          </Flex>
        ))}
      </Box>
    </Box>
  );
}
