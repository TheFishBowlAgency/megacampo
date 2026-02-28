"use client";

import { Box, Text } from "@chakra-ui/react";
import { Container } from "@/components/layout";

export interface InfoBarProps {
  children: React.ReactNode;
}

/**
 * Full-width dark announcement bar, typically rendered below the Header.
 */
export function InfoBar({ children }: InfoBarProps) {
  return (
    <Box bg="dark" py={{ base: "3", lg: "4" }}>
      <Container>
        <Text
          textStyle="body"
          fontSize={{ base: "sm", lg: "body.lg" }}
          color="grayLight"
          textAlign="center"
        >
          {children}
        </Text>
      </Container>
    </Box>
  );
}
