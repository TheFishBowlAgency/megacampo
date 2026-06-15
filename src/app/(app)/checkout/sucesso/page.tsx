import { Suspense } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Header } from '@/components/header';
import { Footer } from '@/components/landing';
import { Breadcrumb, Container } from '@/components/layout';
import { CheckoutSuccessContent } from './CheckoutSuccessContent';

const BREADCRUMB_ITEMS = [
  { label: 'Reservas', href: '/#reservas' },
  { label: 'Checkout', href: '/checkout' },
  { label: 'Confirmação' },
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

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={BREADCRUMB_ITEMS} />
        <Box bg="bg.subtle" minH="60vh">
          <Container py={{ base: '8', md: '12' }}>
            <Suspense fallback={<Fallback />}>
              <CheckoutSuccessContent />
            </Suspense>
          </Container>
        </Box>
        <Footer />
      </main>
    </>
  );
}
