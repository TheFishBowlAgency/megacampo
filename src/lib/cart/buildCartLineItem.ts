import type { CartItemDetail, CartLineItem } from '@/components/cart/types';
import { TIME_PERIODS } from '@/lib/booking/constants';
import type { ResolvedExtraGroup } from '@/lib/catalog';

import { getGroupTitlePt } from './optionGroupLabels';

function createCartLineId(): string {
  return `cart-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDateDisplay(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}

export function parsePriceToNumber(price: string): number {
  return Number.parseFloat(price.replace(',', '.'));
}

function getPeriodLabel(period: string): string {
  return TIME_PERIODS.find((item) => item.value === period)?.label ?? period;
}

function buildOptionDetails(
  extraGroups: ResolvedExtraGroup[],
  selectedOptions: Record<string, string>,
): CartItemDetail[] {
  return extraGroups.flatMap((group) => {
    const selectedId = selectedOptions[group.groupId];
    const selected = group.options.find((option) => option.optionId === selectedId);
    if (!selected) return [];

    return [
      {
        label: getGroupTitlePt(group.title),
        value: selected.label,
      },
    ];
  });
}

export interface BuildPackageCartLineItemInput {
  packageId: string;
  productName: string;
  imageUrl?: string;
  quantity: number;
  date: string;
  period: string;
  unitPriceCents: number;
  extraGroups: ResolvedExtraGroup[];
  selectedOptions: Record<string, string>;
}

export function buildPackageCartLineItem(
  input: BuildPackageCartLineItemInput,
): CartLineItem {
  const details: CartItemDetail[] = [
    ...buildOptionDetails(input.extraGroups, input.selectedOptions),
    { label: 'Data', value: formatDateDisplay(input.date) },
    { label: 'Período', value: getPeriodLabel(input.period) },
  ];

  return {
    id: createCartLineId(),
    itemType: 'package',
    packageId: input.packageId,
    productName: input.productName,
    imageUrl: input.imageUrl,
    details,
    quantity: input.quantity,
    unitPrice: input.unitPriceCents / 100,
    date: input.date,
    period: input.period,
    selections: { ...input.selectedOptions },
  };
}

export interface BuildExtraCartLineItemInput {
  extraId: string;
  name: string;
  quantity: number;
  price: string;
  imageUrl?: string;
}

export function buildExtraCartLineItem(
  input: BuildExtraCartLineItemInput,
): CartLineItem {
  return {
    id: createCartLineId(),
    itemType: 'extra',
    packageId: input.extraId,
    productName: 'Extras',
    productSubtitle: input.name.toUpperCase(),
    imageUrl: input.imageUrl,
    details: [],
    quantity: input.quantity,
    unitPrice: parsePriceToNumber(input.price),
  };
}
