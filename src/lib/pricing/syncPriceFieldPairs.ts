import { euroToCents, centsToEuro } from './cents';

type PriceRecord = Record<string, unknown>;

export function syncEuroInputToCents(
  data: PriceRecord | undefined,
  euroKey: string,
  centsKey: string,
): void {
  if (!data || !(euroKey in data)) {
    return;
  }

  const euro = data[euroKey];
  if (euro == null || euro === '') {
    delete data[euroKey];
    return;
  }

  data[centsKey] = euroToCents(Number(euro));
  delete data[euroKey];
}

export function syncCentsToEuroDisplay(
  doc: PriceRecord,
  euroKey: string,
  centsKey: string,
): void {
  const cents = doc[centsKey];
  if (typeof cents === 'number') {
    doc[euroKey] = centsToEuro(cents);
  }
}

export function syncPackagePriceFieldsOnChange(
  data: PriceRecord | undefined,
): void {
  if (!data) {
    return;
  }

  syncEuroInputToCents(data, 'basePriceEur', 'basePriceCents');

  if (Array.isArray(data.extraGroupConfigs)) {
    for (const groupConfig of data.extraGroupConfigs) {
      if (!groupConfig || typeof groupConfig !== 'object') {
        continue;
      }

      const config = groupConfig as PriceRecord;
      if (!Array.isArray(config.options)) {
        continue;
      }

      for (const option of config.options) {
        if (option && typeof option === 'object') {
          syncEuroInputToCents(option as PriceRecord, 'priceEur', 'priceCents');
        }
      }
    }
  }

  if (Array.isArray(data.templateOverrides)) {
    for (const override of data.templateOverrides) {
      if (override && typeof override === 'object') {
        syncEuroInputToCents(override as PriceRecord, 'priceEur', 'priceCents');
      }
    }
  }
}

export function syncPackagePriceFieldsOnRead(doc: PriceRecord): void {
  syncCentsToEuroDisplay(doc, 'basePriceEur', 'basePriceCents');

  if (Array.isArray(doc.extraGroupConfigs)) {
    for (const groupConfig of doc.extraGroupConfigs) {
      if (!groupConfig || typeof groupConfig !== 'object') {
        continue;
      }

      const config = groupConfig as PriceRecord;
      if (!Array.isArray(config.options)) {
        continue;
      }

      for (const option of config.options) {
        if (option && typeof option === 'object') {
          syncCentsToEuroDisplay(option as PriceRecord, 'priceEur', 'priceCents');
        }
      }
    }
  }

  if (Array.isArray(doc.templateOverrides)) {
    for (const override of doc.templateOverrides) {
      if (override && typeof override === 'object') {
        syncCentsToEuroDisplay(override as PriceRecord, 'priceEur', 'priceCents');
      }
    }
  }
}
