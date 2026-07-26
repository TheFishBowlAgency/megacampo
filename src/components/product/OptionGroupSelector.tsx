"use client";

import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import type { ResolvedExtraGroup } from "@/lib/catalog";
import { getGroupTitlePt } from "@/lib/cart/optionGroupLabels";

export interface OptionGroupSelectorProps {
  groups: ResolvedExtraGroup[];
  selectedOptions: Record<string, string>;
  onChange: (groupId: string, optionId: string) => void;
}

export function OptionGroupSelector({
  groups,
  selectedOptions,
  onChange,
}: OptionGroupSelectorProps) {
  if (groups.length === 0) return null;

  return (
    <VStack align="stretch" gap={{ base: "6", lg: "8" }}>
      {groups.map((group) => (
        <VStack key={group.groupId} align="stretch" gap="2">
          <Text
            fontSize={{ base: "sm", lg: "body.md", xl: "body.lg" }}
            color="fg.muted"
          >
            {getGroupTitlePt(group.title)}
          </Text>
          <Flex gap="2" flexWrap="wrap">
            {group.options.map((option) => {
              const isSelected =
                selectedOptions[group.groupId] === option.optionId;

              return (
                <Box
                  key={option.optionId}
                  as="button"
                  px={{ base: "4", lg: "5" }}
                  py={{ base: "2.5", lg: "3" }}
                  borderRadius="md"
                  border="1px solid"
                  borderColor={isSelected ? "dark" : "grayMid"}
                  bg={isSelected ? "dark" : "white"}
                  color={isSelected ? "white" : "fg"}
                  fontSize={{ base: "sm", lg: "body.md", xl: "body.lg" }}
                  fontWeight="medium"
                  cursor="pointer"
                  transition="all 0.15s"
                  _hover={{ opacity: 0.9 }}
                  onClick={() => onChange(group.groupId, option.optionId)}
                >
                  {option.label}
                </Box>
              );
            })}
          </Flex>
        </VStack>
      ))}
    </VStack>
  );
}
