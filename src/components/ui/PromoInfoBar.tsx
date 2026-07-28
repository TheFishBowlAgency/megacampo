"use client";

import { InfoBar } from "@/components/ui";
import { useHeaderContent } from "@/providers";

export function PromoInfoBar() {
  const { promoMessage } = useHeaderContent();
  return <InfoBar>{promoMessage}</InfoBar>;
}
