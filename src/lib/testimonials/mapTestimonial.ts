import type { Media, Testimonial } from "@/payload-types";

import type { EventQuote } from "@/lib/events/types";

function resolveMediaUrl(image: Testimonial["image"]): string | undefined {
  if (!image || typeof image === "string") return undefined;
  return (image as Media).url ?? undefined;
}

export function mapTestimonialToQuote(doc: Testimonial): EventQuote {
  return {
    id: doc.id,
    name: doc.name.toUpperCase(),
    quote: doc.quote,
    imageSrc: resolveMediaUrl(doc.image),
    featured: Boolean(doc.featured),
    stars: doc.stars ?? 5,
  };
}
