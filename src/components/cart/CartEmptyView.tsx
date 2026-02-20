"use client";

import { Button } from "@chakra-ui/react";
import { Link } from "@/components/ui";
import { Container } from "@/components/layout";
import { EmptyState } from "@/components/ui/EmptyState";

function CartIconLarge() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export function CartEmptyView() {
  return (
    <Container>
      <EmptyState
        icon={<CartIconLarge />}
        title="O teu carrinho está vazio"
        subtitle="Planeia a tua atividade e faz a tua reserva!"
        action={
          <Button
            asChild
            bg="primary"
            color="white"
            size="lg"
            fontWeight="bold"
            textTransform="uppercase"
            _hover={{ bg: "primary.muted", color: "fg" }}
          >
            <Link href="/#reservas">Voltar às reservas</Link>
          </Button>
        }
      />
    </Container>
  );
}
