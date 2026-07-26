"use client";

import { Text } from "@chakra-ui/react";

type ShareButtonProps = {
  title: string;
};

export function ShareButton({ title }: ShareButtonProps) {
  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
    } catch {
      // user cancelled share — ignore
    }
  }

  return (
    <Text
      as="button"
      fontSize={{ base: "sm", md: "md", lg: "body.md", xl: "body.lg" }}
      color="fg.muted"
      cursor="pointer"
      _hover={{ color: "primary" }}
      onClick={handleShare}
    >
      Partilhar
    </Text>
  );
}
