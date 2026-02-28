"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import type { CategoryProduct } from "@/data/categories";

export interface CategoryProductCardProps {
  product: CategoryProduct;
  categorySlug: string;
}

/**
 * Compact product card for category grids. Shows a placeholder image area
 * with the product name in Molot font, and an orange strip with price + name.
 */
export function CategoryProductCard({
  product,
  categorySlug,
}: CategoryProductCardProps) {
  return (
    <Link
      href={`/reservas/${categorySlug}/${product.slug}`}
      display="block"
      _hover={{ opacity: 0.92, transform: "translateY(-2px)" }}
      transition="all 0.2s"
    >
      <Box overflow="hidden">
        {/* Image / placeholder area */}
        <Box
          bg="#DADADA"
          h={{ base: "214px", lg: "236px" }}
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          pt="3"
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
              px={{ base: "3", lg: "5" }}
              py={{ base: "1", lg: "2" }}
              borderRadius="md"
              transform="rotate(-5.22deg)"
              mt="1"
            >
              <Text
                fontFamily="heading.molot"
                fontSize={{ base: "lg", lg: "2xl" }}
                color="dark"
                textAlign="center"
                whiteSpace="nowrap"
                lineHeight="1"
                textTransform="uppercase"
              >
                {product.name}
              </Text>
            </Box>
          )}
        </Box>

        {/* Price strip */}
        <VStack bg="primary" py={{ base: "3", lg: "4" }} gap="1">
          <Text
            fontWeight="extrabold"
            fontSize={{ base: "md", lg: "body.lg" }}
            color="grayLight"
            lineHeight="1"
          >
            {product.price}€
          </Text>
          <Text
            fontWeight="normal"
            fontSize={{ base: "sm", lg: "body.lg" }}
            color="offset"
            lineHeight="1"
          >
            {product.name}
          </Text>
        </VStack>
      </Box>
    </Link>
  );
}
