"use client";

import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { forwardRef } from "react";

export interface LinkProps
  extends
    Omit<ChakraLinkProps, "href" | "as">,
    Pick<
      NextLinkProps,
      "href" | "replace" | "scroll" | "shallow" | "prefetch"
    > {
  /**
   * If true, the link will open in a new tab
   */
  external?: boolean;
  /**
   * Next.js Link props that are passed through
   */
  nextLinkProps?: Omit<
    NextLinkProps,
    "href" | "replace" | "scroll" | "shallow" | "prefetch"
  >;
}

/**
 * A reusable Link component that combines Chakra UI's Link styling
 * with Next.js Link's routing capabilities.
 *
 * @example
 * ```tsx
 * <Link href="/about">About Us</Link>
 * ```
 *
 * @example
 * ```tsx
 * <Link href="https://example.com" external color="blue.500">
 *   External Link
 * </Link>
 * ```
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      external,
      replace,
      scroll,
      shallow,
      prefetch,
      nextLinkProps,
      children,
      ...chakraProps
    },
    ref,
  ) => {
    // For external links, use Chakra Link directly without Next.js Link
    if (
      external ||
      (typeof href === "string" &&
        (href.startsWith("http") ||
          href.startsWith("//") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")))
    ) {
      return (
        <ChakraLink
          ref={ref}
          href={href as string}
          target={external ? "_blank" : "_self"}
          {...chakraProps}
        >
          {children}
        </ChakraLink>
      );
    }

    // For internal links, use Next.js Link with Chakra styling
    return (
      <ChakraLink ref={ref} asChild {...chakraProps}>
        <NextLink
          href={href}
          replace={replace}
          scroll={scroll}
          shallow={shallow}
          prefetch={prefetch}
          {...nextLinkProps}
        >
          {children}
        </NextLink>
      </ChakraLink>
    );
  },
);

Link.displayName = "Link";
