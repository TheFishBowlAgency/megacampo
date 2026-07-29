/**
 * Minimal Lexical editor state for a plain-text string (one paragraph per blank line).
 * Used for seeds and string→richText fallbacks.
 */
export function textToLexical(text: string) {
  const paragraphs = text
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const children =
    paragraphs.length > 0
      ? paragraphs.map((paragraph) => ({
          type: "paragraph" as const,
          format: "" as const,
          indent: 0,
          version: 1 as const,
          children: [
            {
              type: "text" as const,
              detail: 0,
              format: 0,
              mode: "normal" as const,
              style: "",
              text: paragraph,
              version: 1 as const,
            },
          ],
          direction: "ltr" as const,
          textFormat: 0,
          textStyle: "",
        }))
      : [
          {
            type: "paragraph" as const,
            format: "" as const,
            indent: 0,
            version: 1 as const,
            children: [],
            direction: "ltr" as const,
            textFormat: 0,
            textStyle: "",
          },
        ];

  return {
    root: {
      type: "root" as const,
      format: "" as const,
      indent: 0,
      version: 1 as const,
      children,
      direction: "ltr" as const,
    },
  };
}

export function isLexicalState(
  value: unknown,
): value is { root: { type: string; children?: unknown[] } } {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    "root" in (value as object) &&
    typeof (value as { root?: unknown }).root === "object" &&
    (value as { root: { type?: unknown } }).root?.type === "root"
  );
}
