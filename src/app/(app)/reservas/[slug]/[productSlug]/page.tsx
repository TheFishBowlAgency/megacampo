import { notFound, redirect } from 'next/navigation';
import {
  resolveReservasPackageRoute,
  getReservasProductParams,
} from '@/lib/reservas/getReservasProducts';
import {
  buildFlatPackagePath,
  buildPackagePath,
} from '@/lib/catalog/packageSlugHelpers';

export interface ProductPageProps {
  params: Promise<{ slug: string; productSlug: string }>;
}

export async function generateStaticParams() {
  return getReservasProductParams();
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productSlug } = await params;
  const route = await resolveReservasPackageRoute(slug, productSlug);

  if (!route) notFound();

  if (route.kind === 'flat') {
    redirect(buildFlatPackagePath(route.activitySlug, route.packagePathSlug));
  }

  redirect(
    buildPackagePath(
      route.activitySlug,
      route.categoryPathSlug,
      route.packagePathSlug,
    ),
  );
}
