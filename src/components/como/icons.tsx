/**
 * Icons for Como / How it works section. Simple black/currentColor vectors.
 */
/** Hand/tap icon for "choose your experience" step */
export function HandPointingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 38V22a4 4 0 0 1 4-4 4 4 0 0 1 4 4v20" />
      <path d="M26 38V14a4 4 0 0 1 4-4 4 4 0 0 1 4 4v28" />
      <path d="M34 38V18a4 4 0 0 1 4-4 4 4 0 0 1 4 4v24" />
      <path d="M42 38V26a4 4 0 0 1 4-4 4 4 0 0 1 4 4v12" />
      <path d="M22 38h28a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4v-4a4 4 0 0 1 4-4h4z" />
    </svg>
  );
}

export function ChecklistIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="8" y="8" width="48" height="48" rx="4" />
      <path d="M20 24h4v4h-4zM20 32h4v4h-4zM20 40h4v4h-4z" />
      <path d="M32 24h16M32 32h16M32 40h12" />
    </svg>
  );
}

export function CalendarCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="8" y="10" width="48" height="46" rx="4" />
      <path d="M8 22h48M20 6v12M44 6v12" />
      <path d="M26 38l6 6 12-14" />
    </svg>
  );
}
