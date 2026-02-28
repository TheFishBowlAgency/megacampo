"use client";

import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineSemanticTokens,
  defineTextStyles,
  defineTokens,
} from "@chakra-ui/react";

// ─────────────────────────────────────────────────────────────────────────────
// Figma styles → design tokens
// ─────────────────────────────────────────────────────────────────────────────

const fonts = defineTokens.fonts({
  heading: { value: "var(--font-anton), sans-serif" },
  "heading.molot": {
    value:
      "var(--font-molot, var(--font-anton)), sans-serif",
  },
  // Add Molot via next/font/local and set --font-molot in layout when you have the font file
  body: { value: "var(--font-roboto), sans-serif" },
  mono: { value: "var(--font-roboto), monospace" },
});

const fontSizes = defineTokens.fontSizes({
  "display.h1": { value: "7.25rem" },
  "display.h2": { value: "3rem" },
  "display.h3": { value: "2rem" },
  "body.lg": { value: "1.5rem" },
});

const colors = defineTokens.colors({
  primary: { value: "#FEA100" },
  offset: { value: "#FFECCC" },
  dark: { value: "#282828" },
  surfaceDark: { value: "#3E3E3E" },
  surfaceMid: { value: "#575757" },
  grayMid: { value: "#939598" },
  grayLight: { value: "#F5F5F5" },
  background: { value: "#FFD999" },
});

const semanticColors = defineSemanticTokens.colors({
  primary: {
    DEFAULT: {
      value: { _light: "{colors.primary}", _dark: "{colors.primary}" },
    },
    muted: {
      value: { _light: "{colors.offset}", _dark: "{colors.offset}" },
    },
  },
  bg: {
    DEFAULT: {
      value: { _light: "{colors.background}", _dark: "{colors.dark}" },
    },
    dark: {
      value: { _light: "{colors.surfaceDark}", _dark: "{colors.surfaceDark}" },
    },
    hero: {
      value: { _light: "{colors.surfaceMid}", _dark: "{colors.surfaceMid}" },
    },
    subtle: {
      value: { _light: "{colors.grayLight}", _dark: "{colors.grayMid}" },
    },
    muted: {
      value: { _light: "{colors.offset}", _dark: "{colors.grayMid}" },
    },
  },
  fg: {
    DEFAULT: {
      value: { _light: "{colors.dark}", _dark: "{colors.grayLight}" },
    },
    muted: {
      value: { _light: "{colors.grayMid}", _dark: "{colors.grayMid}" },
    },
  },
});

const textStyles = defineTextStyles({
  "h1.anton": {
    value: {
      fontFamily: "heading",
      fontSize: "display.h1",
      fontWeight: "normal",
      lineHeight: "1",
    },
  },
  "h1.molot": {
    value: {
      fontFamily: "heading.molot",
      fontSize: "display.h1",
      fontWeight: "normal",
      lineHeight: "1",
    },
  },
  h2: {
    value: {
      fontFamily: "body",
      fontSize: "display.h2",
      fontWeight: "extrabold",
      lineHeight: "1.2",
    },
  },
  h3: {
    value: {
      fontFamily: "body",
      fontSize: "display.h3",
      fontWeight: "extrabold",
      lineHeight: "1.2",
    },
  },
  h4: {
    value: {
      fontFamily: "body",
      fontSize: "display.h3",
      fontWeight: "semibold",
      lineHeight: "1.2",
    },
  },
  h5: {
    value: {
      fontFamily: "body",
      fontSize: "body.lg",
      fontWeight: "extrabold",
      lineHeight: "1.3",
    },
  },
  body: {
    value: {
      fontFamily: "body",
      fontSize: "body.lg",
      fontWeight: "normal",
      lineHeight: "1.5",
    },
  },
  button: {
    value: {
      fontFamily: "body",
      fontSize: "body.lg",
      fontWeight: "medium",
      lineHeight: "1.3",
    },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// System – merged with Chakra defaults
// ─────────────────────────────────────────────────────────────────────────────

const themeExtension = defineConfig({
  theme: {
    tokens: {
      fonts,
      fontSizes,
      colors,
    },
    semanticTokens: {
      colors: semanticColors,
    },
    textStyles,
  },
});

export const system = createSystem(defaultConfig, themeExtension);
