"use client";

import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineSemanticTokens,
  defineTokens,
} from "@chakra-ui/react";

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens – replace with Figma variables or brand guidelines when ready
// ─────────────────────────────────────────────────────────────────────────────

const fonts = defineTokens.fonts({
  heading: { value: "var(--font-geist-sans), sans-serif" },
  body: { value: "var(--font-geist-sans), sans-serif" },
  mono: { value: "var(--font-geist-mono), monospace" },
});

const brandColors = defineTokens.colors({
  brand: {
    50: { value: "#f0f9ff" },
    100: { value: "#e0f2fe" },
    200: { value: "#bae6fd" },
    300: { value: "#7dd3fc" },
    400: { value: "#38bdf8" },
    500: { value: "#0ea5e9" },
    600: { value: "#0284c7" },
    700: { value: "#0369a1" },
    800: { value: "#075985" },
    900: { value: "#0c4a6e" },
    950: { value: "#082f49" },
  },
});

const brandSemanticColors = defineSemanticTokens.colors({
  brand: {
    solid: {
      value: { _light: "{colors.brand.500}", _dark: "{colors.brand.400}" },
    },
    "solid.hover": {
      value: { _light: "{colors.brand.600}", _dark: "{colors.brand.300}" },
    },
    muted: {
      value: { _light: "{colors.brand.100}", _dark: "{colors.brand.900}" },
    },
    emphasized: {
      value: { _light: "{colors.brand.600}", _dark: "{colors.brand.300}" },
    },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// System (theme) – merged with Chakra defaults
// ─────────────────────────────────────────────────────────────────────────────

const themeExtension = defineConfig({
  theme: {
    tokens: {
      fonts,
      colors: brandColors,
    },
    semanticTokens: {
      colors: brandSemanticColors,
    },
  },
});

export const system = createSystem(defaultConfig, themeExtension);
