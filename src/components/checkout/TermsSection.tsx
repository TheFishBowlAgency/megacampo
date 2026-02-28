"use client";

import { Box, Text } from "@chakra-ui/react";
import { SelectionDot } from "@/components/ui/SelectionDot";

export interface TermsSectionProps {
  acceptTerms: boolean;
  onAcceptTermsChange: (value: boolean) => void;
  acceptMarketing: boolean;
  onAcceptMarketingChange: (value: boolean) => void;
}

const TERMS_TEXT = `Bem-vindo à página do Megacampo - Paintball & Adventure Park

Condições Gerais de Reserva

\t1. `;

/**
 * Terms and conditions display with consent checkboxes.
 */
export function TermsSection({
  acceptTerms,
  onAcceptTermsChange,
  acceptMarketing,
  onAcceptMarketingChange,
}: TermsSectionProps) {
  return (
    <Box display="flex" flexDirection="column" gap="8">
      <Box
        borderWidth="1px"
        borderColor="fg.muted"
        borderRadius="6px"
        p="18px"
        h="222px"
        overflow="auto"
        bg="white"
      >
        <Text
          textStyle="body"
          color="fg.muted"
          whiteSpace="pre-wrap"
          fontSize={{ base: "md", md: "body.lg" }}
        >
          {TERMS_TEXT}
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="8">
        <Box
          as="label"
          display="flex"
          alignItems="center"
          gap="4"
          cursor="pointer"
        >
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => onAcceptTermsChange(e.target.checked)}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          />
          <SelectionDot selected={acceptTerms} />
          <Text textStyle="body" color="fg">
            Li e aceito os Termos e Condições de Reserva
          </Text>
        </Box>

        <Box
          as="label"
          display="flex"
          alignItems="center"
          gap="4"
          cursor="pointer"
        >
          <input
            type="checkbox"
            checked={acceptMarketing}
            onChange={(e) => onAcceptMarketingChange(e.target.checked)}
            style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
          />
          <SelectionDot selected={acceptMarketing} />
          <Text textStyle="body" color={acceptMarketing ? "fg" : "fg.muted"}>
            Quero receber informações e ofertas especiais
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
