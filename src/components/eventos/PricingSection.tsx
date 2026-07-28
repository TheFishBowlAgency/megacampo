"use client";

import { Box, Grid, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Section } from "@/components/layout";
import { PricingCard } from "@/components/product/PricingCard";
import { DEFAULT_EVENT_PRICING_TABS } from "@/lib/events/defaultPricing";
import type { EventPricingTab } from "@/lib/events/types";

export type PricingSectionProps = {
  tabs?: EventPricingTab[];
  reserveHref?: string;
};

export function PricingSection({
  tabs = DEFAULT_EVENT_PRICING_TABS,
  reserveHref = "/#reservas",
}: PricingSectionProps) {
  const safeTabs = tabs.length > 0 ? tabs : DEFAULT_EVENT_PRICING_TABS;

  const [activeTab, setActiveTab] = useState<string>(
    safeTabs[0]?.id ?? "paintball",
  );
  const current =
    safeTabs.find((tab) => tab.id === activeTab) ??
    safeTabs[0] ??
    DEFAULT_EVENT_PRICING_TABS[0];
  const packages = current?.packages?.length
    ? current.packages
    : DEFAULT_EVENT_PRICING_TABS[0].packages;

  return (
    <Section variant="subtle" id="pacotes" bg="#fff">
      <Box maxW="1768px" mx="auto" px={{ base: "5", md: "6", lg: "8" }}>
        <VStack gap={{ base: "8", md: "10", xl: "12" }} align="stretch">
          <Box
            display="flex"
            flexWrap={{ base: "nowrap", md: "wrap" }}
            gap={{ base: "4", lg: "8" }}
            justifyContent={{ base: "flex-start", md: "center" }}
            mx={{ base: "-5", md: "0" }}
            px={{ base: "5", md: "0" }}
            overflowX={{ base: "auto", md: "visible" }}
            role="tablist"
            aria-label="Tipo de atividade"
            css={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {safeTabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <Box
                  key={tab.id}
                  as="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  flexShrink={0}
                  whiteSpace="nowrap"
                  fontSize={{ base: "sm", lg: "body.md", xl: "body.lg" }}
                  fontWeight="medium"
                  textTransform="uppercase"
                  color={active ? "primary" : "fg.muted"}
                  borderBottomWidth="2px"
                  borderBottomColor={active ? "primary" : "fg.muted"}
                  pb="1"
                  cursor="pointer"
                  _hover={{ color: "primary" }}
                  css={{ scrollSnapAlign: "start" }}
                >
                  {tab.label}
                </Box>
              );
            })}
          </Box>

          <Grid
            templateColumns={{
              base: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              xl: "repeat(4, minmax(0, 1fr))",
            }}
            gap={{ base: "3", md: "5" }}
            w="full"
            alignItems="stretch"
          >
            {packages.map((pkg) => (
              <PricingCard
                key={pkg.id}
                pkg={{
                  id: pkg.id,
                  slug: pkg.id,
                  name: pkg.name,
                  price: pkg.price,
                  popular: pkg.popular,
                  features: pkg.features.map((feature, featureIndex) => ({
                    id: `${pkg.id}-${featureIndex}`,
                    label: feature,
                  })),
                  ctaLabel: "Reserva já",
                }}
                detailHref={reserveHref}
              />
            ))}
          </Grid>
        </VStack>
      </Box>
    </Section>
  );
}
