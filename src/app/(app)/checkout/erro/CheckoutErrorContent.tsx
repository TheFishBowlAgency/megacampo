'use client';

import { useSearchParams } from 'next/navigation';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from '@/components/ui';

export function CheckoutErrorContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <Box maxW="640px" mx="auto" textAlign="center">
      <Text textStyle="h3" color="fg" mb="4">
        Pagamento não concluído
      </Text>
      <Text textStyle="body" color="fg" mb="6">
        Não foi possível concluir o pagamento.
        {orderNumber ? ` Referência: ${orderNumber}.` : ''}
      </Text>
      <Text textStyle="body" color="fg.muted" mb="8">
        Podes voltar ao checkout e tentar novamente.
      </Text>
      <Box display="flex" flexDirection="column" gap="4" alignItems="center">
        <Button
          asChild
          bg="primary"
          color="white"
          borderRadius="6px"
          h="56px"
          px="8"
          textStyle="button"
          textTransform="uppercase"
          _hover={{ bg: 'primary.muted', color: 'fg' }}
        >
          <Link href="/checkout">Voltar ao checkout</Link>
        </Button>
        <Link href="/carrinho" textStyle="body" color="fg.muted">
          Editar carrinho
        </Link>
      </Box>
    </Box>
  );
}
