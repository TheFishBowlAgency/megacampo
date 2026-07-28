"use client";

import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { forwardRef, type MouseEvent, type MouseEventHandler } from "react";

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

function samePageHashId(href: string): string | null {
  if (href.startsWith("#") && href.length > 1) {
    // Avoid treating malformed "#foo#bar" as a valid id
    const id = decodeURIComponent(href.slice(1));
    return id.includes("#") ? null : id;
  }

  if (typeof window === "undefined") return null;

  try {
    const url = new URL(href, window.location.origin);
    if (url.pathname !== window.location.pathname) return null;
    if (!url.hash || url.hash.length < 2) return null;
    const id = decodeURIComponent(url.hash.slice(1));
    return id.includes("#") ? null : id;
  } catch {
    return null;
  }
}

function headerOffset(): number {
  const header = document.querySelector("header");
  return header instanceof HTMLElement ? header.offsetHeight : 0;
}

function smoothScrollToHash(
  href: string,
  event: MouseEvent<HTMLAnchorElement>,
): boolean {
  const id = samePageHashId(href);
  if (!id) return false;

  // Claim same-page hash clicks so Next.js cannot append another hash
  // (e.g. /#reservas + href #reservas → /#reservas#reservas).
  event.preventDefault();

  const nextUrl = `${window.location.pathname}${window.location.search}#${id}`;
  if (
    `${window.location.pathname}${window.location.search}${window.location.hash}` !==
    nextUrl
  ) {
    window.history.pushState(null, "", nextUrl);
  } else {
    window.history.replaceState(null, "", nextUrl);
  }

  const target = document.getElementById(id);
  if (!target) return true;

  const top =
    target.getBoundingClientRect().top + window.scrollY - headerOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  return true;
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
      onClick,
      ...chakraProps
    },
    ref,
  ) => {
    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      if (typeof href === "string") {
        smoothScrollToHash(href, event);
      }
    };

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
          onClick={onClick}
          {...chakraProps}
        >
          {children}
        </ChakraLink>
      );
    }

    const isHashLink =
      typeof href === "string" && (href.startsWith("#") || href.includes("/#"));

    // For internal links, use Next.js Link with Chakra styling
    return (
      <ChakraLink ref={ref} asChild {...chakraProps}>
        <NextLink
          href={href}
          replace={replace}
          scroll={scroll ?? (isHashLink ? false : undefined)}
          shallow={shallow}
          prefetch={prefetch}
          onClick={handleClick}
          {...nextLinkProps}
        >
          {children}
        </NextLink>
      </ChakraLink>
    );
  },
);

Link.displayName = "Link";
