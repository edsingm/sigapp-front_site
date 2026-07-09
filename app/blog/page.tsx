import type { Metadata } from "next"
import Link from "next/link"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { SectionLabel } from "@/components/landing/ui/SectionLabel"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"
import {
  BLOG_POSTS,
  getFeaturedPosts,
  formatDate,
  type BlogCategory,
} from "@/lib/blog-data"
import { LINKS } from "@/lib/landing-data"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Viabilidade, comitê e operação de incorporação — textos para quem decide terreno com critério.",
  alternates: { canonical: "/blog" },
}

const CATEGORY_TONE: Record<BlogCategory, string> = {
  "Mercado Imobiliário": "text-foreground",
  Tecnologia: "text-foreground",
  "Inteligência Artificial": "text-foreground",
  Produto: "text-foreground",
  Dicas: "text-foreground",
}

function PostCard({
  post,
  featured = false,
}: {
  post: (typeof BLOG_POSTS)[0]
  featured?: boolean
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col border-b border-border py-8 transition-colors ${
        featured ? "lg:grid lg:grid-cols-12 lg:gap-10 lg:border-b-0 lg:py-0" : ""
      }`}
    >
      <div
        className={
          featured
            ? "lg:col-span-4"
            : "mb-4 flex items-center gap-3"
        }
      >
        <span className="coord text-muted-foreground">{post.category}</span>
        {featured ? (
          <p className="mt-3 hidden text-sm text-muted-foreground lg:block">
            {formatDate(post.publishedAt)} · {post.readTime} min
          </p>
        ) : null}
      </div>

      <div className={featured ? "lg:col-span-8" : "flex flex-1 flex-col gap-3"}>
        <h2
          className={`font-heading font-bold tracking-tight text-foreground transition-colors group-hover:text-primary ${
            featured ? "text-2xl md:text-3xl" : "text-lg md:text-xl"
          } ${CATEGORY_TONE[post.category]}`}
        >
          {post.title}
        </h2>
        <p className="max-w-[58ch] text-sm leading-relaxed text-muted-foreground md:text-base">
          {post.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{post.author.name}</span>
          <span className="size-1 rounded-full bg-border" />
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" strokeWidth={1.5} />
            {post.readTime} min
          </span>
          {!featured ? (
            <>
              <span className="size-1 rounded-full bg-border" />
              <span>{formatDate(post.publishedAt)}</span>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  )
}

export default function BlogPage() {
  const featured = getFeaturedPosts()
  const rest = BLOG_POSTS.filter((p) => !p.featured)

  return (
    <>
      <LandingNav />
      <main>
        <SecondaryPageHero
          align="left"
          eyebrow="Leituras de ofício"
          title="Terreno, risco e retorno — sem jargão de software"
          description="Textos para quem analisa viabilidade, senta no comitê e conduz legalização. Clareza de domínio, não hype de produto."
        />

        <section className="py-16 md:py-20">
          <div className="container-landing">
            {featured.length > 0 ? (
              <div className="mb-16 border-b border-border pb-16">
                <SectionLabel>Em destaque</SectionLabel>
                <div className="mt-8 flex flex-col gap-12">
                  {featured.map((post) => (
                    <PostCard key={post.slug} post={post} featured />
                  ))}
                </div>
              </div>
            ) : null}

            <SectionLabel>Arquivo</SectionLabel>
            <div className="mt-2 divide-y divide-border border-t border-border">
              {rest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border py-16 md:py-20">
          <div className="container-landing">
            <div className="mx-auto flex max-w-xl flex-col items-start gap-5 md:items-center md:text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                Prefere ver o dossiê ao vivo?
              </h2>
              <p className="text-muted-foreground">
                Solicite uma demonstração com um terreno da sua carteira — ou um
                cenário próximo da sua operação.
              </p>
              <Button
                variant="brand"
                size="lg"
                className="group/cta h-12 gap-2 rounded-full pr-2 pl-6 font-semibold"
                nativeButton={false}
                render={
                  <Link
                    href={LINKS.demo}
                    data-analytics-event="demo_request"
                    data-analytics-location="blog-cta"
                  />
                }
              >
                Solicitar demonstração
                <span className="flex size-8 items-center justify-center rounded-full bg-white/18 transition-transform group-hover/cta:translate-x-0.5">
                  <ArrowRight className="size-3.5" />
                </span>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
