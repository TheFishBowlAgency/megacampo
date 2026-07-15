'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Header } from '@/components/header';
import { Footer } from '@/components/landing';
import { Container } from '@/components/layout';
import { Link, QuantitySelector } from '@/components/ui';
import { OptionGroupSelector } from '@/components/product/OptionGroupSelector';
import {
  AddToCartButton,
  CheckoutButton,
  DateInput,
  ExtrasSection,
  PeriodSelect,
  ProductImage,
  ChevronLeftIcon,
  type ProductExtra,
} from '@/components/product/detail/shared';
import { TIME_PERIODS } from '@/lib/booking/constants';
import {
  buildExtraCartLineItem,
  buildPackageCartLineItem,
} from '@/lib/cart/buildCartLineItem';
import { formatPriceFromCents } from '@/lib/catalog/formatPrice';
import type { ResolvedExtraGroup } from '@/lib/catalog';
import { useCart } from '@/providers';

export interface PackageDetailContentProps {
  packageId: string;
  name: string;
  basePriceCents: number;
  imageSrc?: string;
  extraGroups: ResolvedExtraGroup[];
  extras?: ProductExtra[];
  showGroupExtrasSection?: boolean;
  backHref: string;
  backLabel?: string;
}

function buildInitialSelections(
  groups: ResolvedExtraGroup[],
): Record<string, string> {
  const initial: Record<string, string> = {};

  for (const group of groups) {
    const defaultOption =
      group.options.find((option) => option.isDefault) ?? group.options[0];
    if (defaultOption) {
      initial[group.groupId] = defaultOption.optionId;
    }
  }

  return initial;
}

function calculateTotalPriceCents(
  basePriceCents: number,
  groups: ResolvedExtraGroup[],
  selectedOptions: Record<string, string>,
): number {
  let total = basePriceCents;

  for (const group of groups) {
    const selectedId = selectedOptions[group.groupId];
    const selected = group.options.find(
      (option) => option.optionId === selectedId,
    );
    if (selected) {
      total += selected.priceCents;
    }
  }

  return total;
}

function PackagePrice({
  unitPriceCents,
  variant = 'desktop',
}: {
  unitPriceCents: number;
  variant?: 'mobile' | 'desktop';
}) {
  const displayPrice = formatPriceFromCents(unitPriceCents);

  const sharedProps = {
    color: 'primary' as const,
    lineHeight: '1' as const,
    'aria-live': 'polite' as const,
    'aria-atomic': true as const,
    children: `${displayPrice}€`,
  };
  

  if (variant === 'mobile') {
    return <Text key={unitPriceCents} {...sharedProps} fontWeight="extrabold" fontSize="md" />;
  }

  return <Text key={unitPriceCents} {...sharedProps} textStyle="h5" />;
}

export function PackageDetailContent({
  packageId,
  name,
  basePriceCents,
  imageSrc,
  extraGroups,
  extras = [],
  showGroupExtrasSection = false,
  backHref,
  backLabel = 'Voltar às Reservas',
}: PackageDetailContentProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState(TIME_PERIODS[0].value);
  const [selectedOptions, setSelectedOptions] = useState(() =>
    buildInitialSelections(extraGroups),
  );
  const [bookingError, setBookingError] = useState<string | null>(null);

  const unitPriceCents = calculateTotalPriceCents(
    basePriceCents,
    extraGroups,
    selectedOptions,
  );

  const handleOptionChange = (groupId: string, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupId]: optionId }));
  };

  const buildCurrentLineItem = () =>
    buildPackageCartLineItem({
      packageId,
      productName: name,
      imageUrl: imageSrc,
      quantity,
      date,
      period,
      unitPriceCents,
      extraGroups,
      selectedOptions,
    });

  const handleAddPackage = (redirectTo: '/carrinho' | '/checkout') => {
    if (!date) {
      setBookingError('Seleciona uma data antes de continuar.');
      return;
    }

    setBookingError(null);
    addItem(buildCurrentLineItem());
    router.push(redirectTo);
  };

  const handleAddExtra = (extraId: string, extraQuantity: number) => {
    const extra = extras.find((item) => item.id === extraId);
    if (!extra) return;

    addItem(
      buildExtraCartLineItem({
        extraId: extra.id,
        name: extra.name,
        quantity: extraQuantity,
        price: extra.price,
        imageUrl: extra.imageSrc,
      }),
    );
    router.push('/carrinho');
  };

  const handleExtrasCheckout = () => {
    if (date) {
      addItem(buildCurrentLineItem());
    }
    router.push('/checkout');
  };

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--chakra-colors-gray-light)' }}>
        <Container
          py={{ base: '6', md: '8', lg: '10' }}
          pb={{ base: '10', lg: '16' }}
        >
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: '6', md: '8', lg: '50px' }}
            align="flex-start"
            maxW={{ lg: '1100px' }}
            mx="auto"
          >
            <Box display={{ base: 'block', lg: 'none' }} w="full">
              <VStack align="start" gap="4">
                <Text textStyle="h5" color="fg" fontSize="xl">
                  {name.toUpperCase()}
                </Text>
                <PackagePrice
                  unitPriceCents={unitPriceCents}
                  variant="mobile"
                />
              </VStack>
            </Box>

            <ProductImage name={name} imageSrc={imageSrc} />

            <VStack align="stretch" gap="8" flex="1" minW={0} w="full">
              <Box display={{ base: 'none', lg: 'block' }}>
                <VStack align="start" gap="6">
                  <Text textStyle="h3" color="fg">
                    {name.toUpperCase()}
                  </Text>
                  <PackagePrice
                    unitPriceCents={unitPriceCents}
                    variant="desktop"
                  />
                  <Box h="1px" bg="dark" w="full" />
                </VStack>
              </Box>

              <OptionGroupSelector
                groups={extraGroups}
                selectedOptions={selectedOptions}
                onChange={handleOptionChange}
              />

              <VStack align="stretch" gap="2">
                <Text fontSize={{ base: 'sm', lg: 'body.lg' }} color="fg.muted">
                  Seleciona uma data
                </Text>
                <DateInput
                  value={date}
                  onChange={(value) => {
                    setDate(value);
                    if (value) setBookingError(null);
                  }}
                />
              </VStack>

              <VStack align="stretch" gap="2">
                <Text fontSize={{ base: 'sm', lg: 'body.lg' }} color="fg.muted">
                  Seleciona um período de atividade
                </Text>
                <PeriodSelect value={period} onChange={setPeriod} />
              </VStack>

              <VStack align="stretch" gap="2">
                <Text fontSize={{ base: 'sm', lg: 'body.lg' }} color="fg.muted">
                  Seleciona a quantidade
                </Text>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </VStack>

              {bookingError && (
                <Text fontSize="sm" color="red.500">
                  {bookingError}
                </Text>
              )}

              <Flex gap="4" direction={{ base: 'column', lg: 'row' }}>
                <AddToCartButton
                  onClick={() => handleAddPackage('/carrinho')}
                />
                <CheckoutButton
                  variant="outline"
                  onClick={() => handleAddPackage('/checkout')}
                />
              </Flex>
            </VStack>
          </Flex>
        </Container>

        {showGroupExtrasSection ? (
          <ExtrasSection
            extras={extras}
            backHref={backHref}
            backLabel={backLabel}
            onAddExtra={handleAddExtra}
            onCheckout={handleExtrasCheckout}
          />
        ) : (
          <Container pb={{ base: '10', lg: '16' }}>
            <Flex justify={{ base: 'center', lg: 'flex-start' }}>
              <Link
                href={backHref}
                display="flex"
                alignItems="center"
                gap="3"
                color="fg.muted"
                _hover={{ color: 'primary' }}
              >
                <ChevronLeftIcon />
                <Text fontSize={{ base: 'md', lg: 'body.lg' }}>
                  {backLabel}
                </Text>
              </Link>
            </Flex>
          </Container>
        )}

        <Footer />
      </main>
    </>
  );
}
