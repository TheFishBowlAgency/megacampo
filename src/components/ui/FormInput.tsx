"use client";

import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";

export const FormInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input>
>(function FormInput(props, ref) {
  return (
    <Input
      ref={ref}
      height="60px"
      px="18px"
      py="14px"
      borderColor="fg.muted"
      borderWidth="1px"
      borderRadius="6px"
      fontSize="body.lg"
      fontFamily="body"
      bg="white"
      color="fg"
      _placeholder={{ color: "fg.muted" }}
      {...props}
    />
  );
});
