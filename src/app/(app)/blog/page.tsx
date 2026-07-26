import { Box, Grid, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { Container, PageHero, Section } from "@/components/layout";
import { Link } from "@/components/ui";
import { getBlogCopy, getBlogPosts } from "@/lib/blog/getBlog";

export default function BlogPage() {
  const posts = getBlogPosts();
  const copy = getBlogCopy();

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={copy.heroTitle}
          titleTextStyle="h1.molot"
          minH={{ base: "280px", md: "400px", xl: "560px" }}
        />
        <Section>
          <Container>
            <VStack gap={{ base: "8", md: "10", xl: "12" }} align="stretch">
              <Text
                as="h2"
                textStyle="h2"
                fontSize="display.h2"
                color="fg"
                textTransform="uppercase"
                textAlign="center"
              >
                {copy.sectionHeading}
              </Text>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={{ base: "8", md: "8", xl: "10" }}
              >
                {posts.map((post) => (
                  <VStack key={post.id} as="article" align="stretch" gap="4">
                    <Box
                      position="relative"
                      w="full"
                      aspectRatio="16/10"
                      bg="gray.300"
                      overflow="hidden"
                    >
                      {post.imageSrc ? (
                        <Image
                          src={post.imageSrc}
                          alt={post.title}
                          fill
                          sizes="(max-width: 767px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      ) : null}
                    </Box>
                    <Text
                      as="h3"
                      fontSize={{ base: "xl", md: "2rem" }}
                      fontWeight="extrabold"
                      color="fg"
                      textTransform="uppercase"
                      lineHeight="1.2"
                    >
                      {post.title}
                    </Text>
                    <Text
                      color="fg.muted"
                      fontSize={{ base: "sm", md: "md", lg: "body.md" }}
                      lineHeight="1.5"
                    >
                      {post.excerpt}
                    </Text>
                    <Link
                      href={post.href}
                      color="fg.muted"
                      fontSize={{ base: "sm", md: "md", lg: "body.md" }}
                      _hover={{ color: "primary" }}
                      alignSelf="flex-start"
                    >
                      {copy.cardLinkLabel}
                    </Link>
                  </VStack>
                ))}
              </Grid>
            </VStack>
          </Container>
        </Section>
        <Footer />
      </main>
    </>
  );
}
