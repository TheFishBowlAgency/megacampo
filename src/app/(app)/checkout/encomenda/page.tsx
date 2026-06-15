import { Suspense } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Header } from '@/components/header';
import { Footer } from '@/components/landing';
import { Breadcrumb, Container } from '@/components/layout';
import { OrderConfirmationContent } from './OrderConfirmationContent';

const BREADCRUMB_ITEMS = [
  { label: 'Reservas', href: '/#reservas' },
  { label: 'Checkout', href: '/checkout' },
  { label: 'Encomenda' },
];

function Fallback() {
  return (
    <Box py="12">
      <Text textStyle="body" color="fg.muted">
        A carregar...
      </Text>
    </Box>
  );
}

export default function OrderConfirmationPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={BREADCRUMB_ITEMS} />
        <Box bg="bg.subtle" minH="60vh">
          <Container py={{ base: '8', md: '12' }}>
            <Suspense fallback={<Fallback />}>
              <OrderConfirmationContent />
            </Suspense>
          </Container>
        </Box>
        <Footer />
      </main>
    </>
  );
}
