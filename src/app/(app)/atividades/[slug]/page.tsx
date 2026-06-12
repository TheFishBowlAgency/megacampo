import { notFound } from 'next/navigation';
import { Text, VStack } from '@chakra-ui/react';
import { Header } from '@/components/header';
import { Footer } from '@/components/landing';
import { ActivityCategoriesGrid } from '@/components/activity';
import { Container } from '@/components/layout';
import {
  getActivityBySlug,
  getAllActivitySlugs,
} from '@/lib/activities/getActivityBySlug';
import { getPackageCategoriesByActivityId } from '@/lib/package-categories/getPackageCategories';

export interface ActivityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllActivitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params;
  const activity = await getActivityBySlug(slug);
  if (!activity) notFound();

  const categories = await getPackageCategoriesByActivityId(activity.id);

  return (
    <>
      <Header />
      <main style={{ backgroundColor: 'var(--chakra-colors-gray-light)' }}>
        <Container py={{ base: '8', md: '10', lg: '12' }}>
          <VStack
            gap={{ base: '6', md: '8', lg: '10' }}
            align={{ base: 'stretch', md: 'center' }}
          >
            <Text
              as="h1"
              textStyle="h2"
              fontSize={{ base: '2xl', md: '3xl', lg: 'display.h2' }}
              textAlign="center"
              alignSelf="stretch"
              color="fg"
              textTransform="uppercase"
            >
              {activity.title}
            </Text>
            <ActivityCategoriesGrid categories={categories} />
          </VStack>
        </Container>
      </main>
      <Footer />
    </>
  );
}
