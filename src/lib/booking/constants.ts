export interface TimePeriod {
  label: string;
  value: string;
}

export const TIME_PERIODS: TimePeriod[] = [
  { label: "Manhã: 9h30-13h", value: "morning" },
  { label: "Tarde: 14h00-17h30", value: "afternoon" },
];
