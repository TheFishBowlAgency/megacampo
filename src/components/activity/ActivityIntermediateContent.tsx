import { Text, VStack } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { Container, Section } from "@/components/layout";
import type { PackageCategoryCardItem } from "@/lib/package-categories/types";

import { ActivityCategoriesGrid } from "./ActivityCategoriesGrid";

type ActivityIntermediateContentProps = {
  title: string;
  description?: string | null;
  categories: PackageCategoryCardItem[];
};

export function ActivityIntermediateContent({
  title,
  categories,
}: ActivityIntermediateContentProps) {
  return (
    <>
      <Header />
      <main>
        <Section py={{ base: "10", md: "14", xl: "16" }}>
          <Container>
            <VStack gap={{ base: "8", md: "10", xl: "12" }} align="stretch">
              <Text
                as="h1"
                textStyle="h2"
                fontSize="display.h2"
                color="fg"
                textTransform="uppercase"
                textAlign="center"
              >
                {title}
              </Text>
              <ActivityCategoriesGrid categories={categories} />
            </VStack>
          </Container>
        </Section>
        <Footer />
      </main>
    </>
  );
}
