"use client";

import { Box, Text } from "@chakra-ui/react";
import { RichText } from "@payloadcms/richtext-lexical/react";

import { isLexicalState, textToLexical } from "@/lib/richtext/textToLexical";

type RichTextContentProps = {
  data: unknown;
  color?: string;
  fontSize?: Record<string, string> | string;
  lineHeight?: string | number;
};

/**
 * Renders Payload Lexical rich text, or plain string fallback as Lexical.
 */
export function RichTextContent({
  data,
  color = "fg.muted",
  fontSize = { base: "sm", md: "md", lg: "body.md", xl: "body.lg" },
  lineHeight = "1.7",
}: RichTextContentProps) {
  const lexical = isLexicalState(data)
    ? data
    : typeof data === "string" && data.trim()
      ? textToLexical(data)
      : null;

  if (!lexical) return null;

  return (
    <Box
      color={color}
      fontSize={fontSize}
      lineHeight={lineHeight}
      css={{
        "& p": { marginBottom: "1em" },
        "& p:last-child": { marginBottom: 0 },
        "& ul, & ol": { paddingLeft: "1.25em", marginBottom: "1em" },
        "& a": {
          color: "var(--chakra-colors-primary)",
          textDecoration: "underline",
        },
      }}
    >
      {/* Payload RichText accepts SerializedEditorState; our helper matches that shape. */}
      <RichText data={lexical as never} />
    </Box>
  );
}

/** Server-safe plain fallback when RichText client island is unnecessary. */
export function PlainBodyText({
  data,
  color = "fg.muted",
  fontSize = { base: "sm", md: "md", lg: "body.md", xl: "body.lg" },
  lineHeight = "1.7",
}: RichTextContentProps) {
  if (typeof data === "string" && data.trim()) {
    return (
      <Text
        color={color}
        fontSize={fontSize}
        lineHeight={lineHeight}
        whiteSpace="pre-line"
      >
        {data}
      </Text>
    );
  }
  return (
    <RichTextContent
      data={data}
      color={color}
      fontSize={fontSize}
      lineHeight={lineHeight}
    />
  );
}
