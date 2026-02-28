import { Box, HStack, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface FeatureItemProps {
  icon: ReactNode;
  label: string;
}

/** Reusable feature list row with icon and label on a background-colored bar. */
export function FeatureItem({ icon, label }: FeatureItemProps) {
  return (
    <HStack
      bg="bg"
      gap={{ base: "4", lg: "8" }}
      px={{ base: "4", lg: "8" }}
      py="3"
      w="full"
    >
      <Box flexShrink={0} boxSize={{ base: "8", lg: "50px" }}>
        {icon}
      </Box>
      <Text
        textStyle="h5"
        fontSize={{ base: "sm", lg: "body.lg" }}
        color="fg"
        textTransform="uppercase"
      >
        {label}
      </Text>
    </HStack>
  );
}
