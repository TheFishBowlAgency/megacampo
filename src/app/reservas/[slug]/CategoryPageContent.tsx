"use client";

import { useState, useMemo } from "react";
import { Box, Flex, HStack, Text, Grid } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { Container } from "@/components/layout";
import { InfoBar, Link } from "@/components/ui";
import {
  CategoriesSidebar,
  CategoryProductCard,
  Pagination,
  ProductSearchBar,
} from "@/components/category";
import type { Category } from "@/data/categories";

const PRODUCTS_PER_PAGE = 8;

export interface CategoryPageContentProps {
  category: Category;
}

export function CategoryPageContent({ category }: CategoryPageContentProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return category.products;
    const q = search.toLowerCase();
    return category.products.filter((p) => p.name.toLowerCase().includes(q));
  }, [category.products, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PRODUCTS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

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
            {/* Breadcrumb */}
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
              <Text as="span" color="fg" fontWeight="normal">
                {category.name}
              </Text>
            </HStack>

            {/* Search (only on desktop – mobile gets it below) */}
            <Box display={{ base: "none", lg: "block" }}>
              <ProductSearchBar
                value={search}
                onChange={(v) => {
                  setSearch(v);
                  setPage(1);
                }}
              />
            </Box>
          </Flex>

          {/* Mobile search */}
          <Box display={{ base: "block", lg: "none" }} mt="2">
            <ProductSearchBar
              value={search}
              onChange={(v) => {
                setSearch(v);
                setPage(1);
              }}
            />
          </Box>
        </Container>

        {/* Main content */}
        <Container pb={{ base: "10", lg: "16" }}>
          <Flex gap={{ base: "0", lg: "16" }} align="flex-start">
            {/* Sidebar – desktop only */}
            <Box display={{ base: "none", lg: "block" }}>
              <CategoriesSidebar activeSlug={category.slug} />
            </Box>

            {/* Products grid */}
            <Box flex="1" minW={0}>
              {/* Pagination row */}
              <Box mb="8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={() => setPage((p) => Math.max(1, p - 1))}
                  onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
              </Box>

              {paged.length > 0 ? (
                <Grid
                  templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
                  gap={{ base: "4", md: "4", lg: "4" }}
                >
                  {paged.map((product) => (
                    <CategoryProductCard
                      key={product.id}
                      product={product}
                      categorySlug={category.slug}
                    />
                  ))}
                </Grid>
              ) : (
                <Box py="16" textAlign="center">
                  <Text textStyle="body" color="fg.muted">
                    {search
                      ? "Nenhum produto encontrado."
                      : "Sem produtos nesta categoria."}
                  </Text>
                </Box>
              )}
            </Box>
          </Flex>
        </Container>

        <Footer />
      </main>
    </>
  );
}

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
