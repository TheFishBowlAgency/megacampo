import { Box } from "@chakra-ui/react";

type SectionVariant = "default" | "dark" | "subtle" | "primary";

const variantBg = {
  default: "white",
  dark: "bg.dark",
  subtle: "bg.subtle",
  primary: "primary",
} as const;

export function Section({
  variant = "default",
  children,
  ...props
}: React.ComponentProps<typeof Box> & { variant?: SectionVariant }) {
  return (
    <Box
      bg={variantBg[variant]}
      py={{ base: "10", md: "14", lg: "16" }}
      {...props}
    >
      {children}
    </Box>
  );
}
