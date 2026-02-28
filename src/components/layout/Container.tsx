import { Box } from "@chakra-ui/react";

const CONTAINER_MAX = "1320px";

export function Container({
  children,
  ...props
}: React.ComponentProps<typeof Box>) {
  return (
    <Box
      maxW={CONTAINER_MAX}
      mx="auto"
      px={{ base: "4", md: "6", lg: "8" }}
      {...props}
    >
      {children}
    </Box>
  );
}
