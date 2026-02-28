"use client";

import { Box, Grid } from "@chakra-ui/react";
import { FormInput } from "@/components/ui/FormInput";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  nif: string;
}

export const INITIAL_FORM_DATA: CheckoutFormData = {
  firstName: "",
  lastName: "",
  address: "",
  postalCode: "",
  city: "",
  country: "",
  email: "",
  phone: "",
  nif: "",
};

export interface CheckoutFormProps {
  data: CheckoutFormData;
  onChange: (data: CheckoutFormData) => void;
}

/**
 * Personal data form fields for the checkout flow.
 * Responsive layout: stacked on mobile, side-by-side on desktop.
 */
export function CheckoutForm({ data, onChange }: CheckoutFormProps) {
  const update =
    (field: keyof CheckoutFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      onChange({ ...data, [field]: e.target.value });

  return (
    <Box display="flex" flexDirection="column" gap="4">
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="4">
        <FormInput
          placeholder="Primeiro Nome*"
          value={data.firstName}
          onChange={update("firstName")}
          required
        />
        <FormInput
          placeholder="Último Nome*"
          value={data.lastName}
          onChange={update("lastName")}
          required
        />
      </Grid>

      <FormInput
        placeholder="Morada*"
        value={data.address}
        onChange={update("address")}
        required
      />

      <Grid templateColumns={{ base: "1fr 1fr", md: "1fr 1fr 1fr" }} gap="4">
        <FormInput
          placeholder="Código Postal*"
          value={data.postalCode}
          onChange={update("postalCode")}
          required
        />
        <FormInput
          placeholder="Localidade*"
          value={data.city}
          onChange={update("city")}
          required
        />
        <Box gridColumn={{ base: "1 / -1", md: "auto" }}>
          <FormInput
            placeholder="País*"
            value={data.country}
            onChange={update("country")}
            required
          />
        </Box>
      </Grid>

      <FormInput
        placeholder="Endereço de E-mail*"
        type="email"
        value={data.email}
        onChange={update("email")}
        required
      />

      <Grid templateColumns="1fr 1fr" gap="4">
        <FormInput
          placeholder="Telemóvel"
          type="tel"
          value={data.phone}
          onChange={update("phone")}
        />
        <FormInput
          placeholder="NIF"
          value={data.nif}
          onChange={update("nif")}
        />
      </Grid>
    </Box>
  );
}
