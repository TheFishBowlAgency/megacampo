export const INITIAL_VISIBLE_COUNT = 4;

export interface ActivityCardItem {
  id: string;
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  href: string;
  imageSrc?: string;
}
