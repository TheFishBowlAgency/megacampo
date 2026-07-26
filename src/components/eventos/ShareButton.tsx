"use client";

import { HStack, Text } from "@chakra-ui/react";
import { Link } from "@/components/ui";

type ShareButtonProps = {
  title: string;
};

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14 8h3V5h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

async function shareOrCopy(title: string) {
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

/**
 * Share control matching Figma event detail: label + Facebook / Instagram.
 */
export function ShareButton({ title }: ShareButtonProps) {
  return (
    <HStack gap="4" align="center">
      <Text
        as="button"
        fontSize={{ base: "sm", md: "md", lg: "body.md", xl: "body.lg" }}
        color="fg"
        cursor="pointer"
        _hover={{ color: "primary" }}
        onClick={() => void shareOrCopy(title)}
      >
        Partilhar
      </Text>
      <Link
        href="#"
        aria-label={`Partilhar ${title} no Facebook`}
        color="fg"
        display="inline-flex"
        _hover={{ color: "primary" }}
        onClick={(e) => {
          e.preventDefault();
          const url = encodeURIComponent(window.location.href);
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            "_blank",
            "noopener,noreferrer",
          );
        }}
      >
        <FacebookIcon />
      </Link>
      <Link
        href="#"
        aria-label={`Partilhar ${title} no Instagram`}
        color="fg"
        display="inline-flex"
        _hover={{ color: "primary" }}
        onClick={(e) => {
          e.preventDefault();
          void shareOrCopy(title);
        }}
      >
        <InstagramIcon />
      </Link>
    </HStack>
  );
}
