import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { CTASection, Footer } from "@/components/landing";
import { Container, Section } from "@/components/layout";
import { ChevronLeftIcon } from "@/components/product/detail/shared";
import { Link } from "@/components/ui";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/blog/getBlog";

const TAG_CHIP_SHADOW = "0px 2px 4px rgba(0, 0, 0, 0.25)";

export interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

function formatPostDate(value?: string): string {
  if (!value) return "DD/MM/AAAA";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "DD/MM/AAAA";
  return date.toLocaleDateString("pt-PT");
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const gallery =
    post.gallery && post.gallery.length > 0
      ? post.gallery
      : post.imageSrc
        ? [post.imageSrc, post.imageSrc, post.imageSrc, post.imageSrc]
        : [];

  return (
    <>
      <Header />
      <main>
        <Section>
          <Container>
            <VStack gap={{ base: "5", md: "10", xl: "60px" }} align="stretch">
              <Link
                href="/blog"
                display="inline-flex"
                alignItems="center"
                gap="3"
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
                <ChevronLeftIcon />
                <Text as="span">Voltar a Blog</Text>
              </Link>

              <Text
                as="h1"
                fontSize={{ base: "2xl", md: "3rem" }}
                fontWeight={{ base: "semibold", md: "extrabold" }}
                color="fg"
                textTransform="uppercase"
                lineHeight="1.1"
                textAlign={{ base: "left", md: "center" }}
              >
                {post.title}
              </Text>

              {post.imageSrc ? (
                <Box
                  position="relative"
                  w="full"
                  aspectRatio={{ base: "4/5", md: "11/5" }}
                  bg="gray.300"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Image
                    src={post.imageSrc}
                    alt={post.title}
                    fill
                    sizes="(max-width: 991px) 100vw, 1320px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </Box>
              ) : null}

              <Flex
                justify="space-between"
                align={{ base: "flex-start", md: "center" }}
                direction={{ base: "column", md: "row" }}
                gap="4"
              >
                <HStack gap={{ base: "4", md: "5" }} flexWrap="wrap">
                  {(post.tags ?? []).map((tag) => (
                    <Box
                      key={tag}
                      borderWidth="1px"
                      borderColor="fg"
                      borderRadius="md"
                      boxShadow={TAG_CHIP_SHADOW}
                      px="8"
                      py="4"
                    >
                      <Text
                        fontSize={{
                          base: "sm",
                          md: "md",
                          lg: "body.md",
                          xl: "body.lg",
                        }}
                        fontWeight={{ base: "medium", xl: "normal" }}
                        color="fg"
                      >
                        {tag}
                      </Text>
                    </Box>
                  ))}
                </HStack>

                <HStack gap="4" color="fg.muted">
                  <Text
                    fontSize={{
                      base: "sm",
                      md: "md",
                      lg: "body.md",
                      xl: "body.lg",
                    }}
                  >
                    Partilhar
                  </Text>
                  <ShareIconButton
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://megacampo.com/blog/${post.slug}`)}`}
                    aria-label="Partilhar no Facebook"
                  >
                    <FacebookIcon />
                  </ShareIconButton>
                  <ShareIconButton
                    href="https://www.instagram.com/"
                    aria-label="Partilhar no Instagram"
                  >
                    <InstagramIcon />
                  </ShareIconButton>
                </HStack>
              </Flex>

              <Flex
                justify={{ base: "space-between", md: "flex-start" }}
                gap={{ base: "4", md: "120px" }}
                color="fg.muted"
                fontSize={{
                  base: "sm",
                  md: "md",
                  lg: "body.md",
                  xl: "body.lg",
                }}
                flexWrap="wrap"
              >
                <Text>Por: {post.author ?? "Nome e Apelido"}</Text>
                <Text>Data: {formatPostDate(post.publishedAt)}</Text>
              </Flex>

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

              {gallery.length > 0 ? (
                <Flex
                  gap={{ base: "2", md: "5" }}
                  overflowX={{ base: "auto", md: "visible" }}
                  css={{ scrollSnapType: "x mandatory" }}
                >
                  {gallery.slice(0, 4).map((src, index) => (
                    <Box
                      key={`${src}-${index}`}
                      position="relative"
                      flex={{ base: "0 0 45%", md: "1 1 0" }}
                      w={{ base: "45%", md: "auto" }}
                      aspectRatio="63/100"
                      bg="gray.300"
                      borderRadius="md"
                      overflow="hidden"
                      css={{ scrollSnapAlign: "start" }}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        sizes="(max-width: 767px) 45vw, 25vw"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </Flex>
              ) : null}
            </VStack>
          </Container>
        </Section>
        <CTASection />
        <Footer />
      </main>
    </>
  );
}

function ShareIconButton({
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="10"
      h="10"
      borderRadius="full"
      bg="fg"
      color="white"
      flexShrink={0}
      _hover={{ bg: "primary" }}
      {...props}
    >
      {children}
    </Link>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}
