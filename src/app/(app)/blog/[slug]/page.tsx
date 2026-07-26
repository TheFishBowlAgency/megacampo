import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { CTASection, FAQSection, Footer } from "@/components/landing";
import { Container, Section } from "@/components/layout";
import { Link } from "@/components/ui";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog/getBlog";

export interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main>
        <Section>
          <Container>
            <VStack
              gap={{ base: "8", md: "10" }}
              align="stretch"
              maxW="3xl"
              mx="auto"
            >
              <Link
                href="/blog"
                color="fg.muted"
                fontSize={{
                  base: "sm",
                  md: "md",
                  lg: "body.md",
                  xl: "body.lg",
                }}
                _hover={{ color: "primary" }}
                alignSelf="flex-start"
              >
                ← Voltar ao Blog
              </Link>
              <Text
                as="h1"
                fontSize={{ base: "2xl", md: "3rem" }}
                fontWeight="extrabold"
                color="fg"
                textTransform="uppercase"
                lineHeight="1.1"
              >
                {post.title}
              </Text>
              {post.imageSrc ? (
                <Box
                  position="relative"
                  w="full"
                  aspectRatio="16/9"
                  bg="gray.300"
                  overflow="hidden"
                >
                  <Image
                    src={post.imageSrc}
                    alt={post.title}
                    fill
                    sizes="(max-width: 991px) 100vw, 720px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </Box>
              ) : null}
              <Text
                color="fg"
                fontSize={{
                  base: "sm",
                  md: "md",
                  lg: "body.md",
                  xl: "body.lg",
                }}
                lineHeight="1.7"
              >
                {post.excerpt}
              </Text>
              <RichTextContent data={post.body} />
            </VStack>
          </Container>
        </Section>
        <CTASection />
        <FAQSection id="faq-blog" heading="Perguntas frequentes" />
        <Footer />
      </main>
    </>
  );
}
