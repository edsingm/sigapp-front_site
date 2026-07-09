import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { Button } from "@/components/ui/button"
import { Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react"
import { LINKS } from "@/lib/landing-data"
import {
  BLOG_POSTS,
  getPostBySlug,
  formatDate,
  type BlogCategory,
} from "@/lib/blog-data"

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "Mercado Imobiliário": "bg-primary/10 text-primary",
  Tecnologia: "bg-muted text-foreground/70",
  "Inteligência Artificial": "bg-secondary/20 text-primary",
  Produto: "bg-accent text-primary",
  Dicas: "bg-muted text-foreground/70",
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: "Post não encontrado — SIGAPP" }
  return {
    title: `${post.title} — Blog SIGAPP`,
    description: post.excerpt,
  }
}

function renderContent(content: string) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="mt-10 mb-4 font-heading text-xl font-bold tracking-tight text-foreground md:text-2xl"
        >
          {line.replace("## ", "")}
        </h2>
      )
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={key++} className="my-3 font-semibold text-foreground">
          {line.replace(/\*\*/g, "")}
        </p>
      )
    } else if (line.startsWith("- ")) {
      elements.push(
        <li
          key={key++}
          className="ml-4 list-disc text-muted-foreground marker:text-primary"
        >
          {line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
        </li>
      )
    } else if (line.trim() !== "") {
      elements.push(
        <p key={key++} className="my-3 leading-relaxed text-foreground/80">
          {line.replace(/\*\*(.*?)\*\*/g, "$1")}
        </p>
      )
    }
  }

  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === slug)
  const prevPost =
    currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null

  return (
    <>
      <LandingNav />
      <main>
        {/* Hero */}
        <SecondaryPageHero
          eyebrow="Artigo"
          title={post.title}
          description={post.excerpt}
          align="left"
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.category },
          ]}
          afterDescription={
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[post.category]}`}
              >
                {post.category}
              </span>
              <div className="flex items-center gap-1 text-xs text-white/58">
                <Clock className="size-3.5" />
                <span>{post.readTime} min de leitura</span>
              </div>
            </div>
          }
          meta={
            <div className="flex items-center gap-3 border-t border-white/10 pt-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-white/8 text-sm font-semibold text-white">
                {post.author.initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {post.author.name}
                </p>
                <p className="text-xs text-white/58">
                  {post.author.role} · {formatDate(post.publishedAt)}
                </p>
              </div>
            </div>
          }
        />

        {/* Article content */}
        <section className="py-16">
          <div className="container-landing">
            <div className="mx-auto max-w-3xl">
              <article className="prose-landing">
                {renderContent(post.content)}
              </article>

              {/* Tags */}
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                <Tag className="size-4 text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-muted px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Navigation between posts */}
        {(prevPost || nextPost) && (
          <section className="border-t border-border py-12">
            <div className="container-landing">
              <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex flex-col gap-1 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ArrowLeft className="size-3.5" /> Anterior
                    </span>
                    <p className="line-clamp-2 font-heading text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {prevPost.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col items-end gap-1 rounded-xl border border-border bg-card p-5 text-right transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      Próximo <ArrowRight className="size-3.5" />
                    </span>
                    <p className="line-clamp-2 font-heading text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {nextPost.title}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-border py-16">
          <div className="container-landing">
            <div className="mx-auto flex max-w-xl flex-col items-start gap-5 md:items-center md:text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Quer ver isso no dossiê do seu terreno?
              </h2>
              <p className="text-muted-foreground">
                Solicite uma demonstração guiada — com um caso real da carteira,
                se tiver.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="brand"
                  size="lg"
                  className="group/cta h-12 gap-2 rounded-full pr-2 pl-6 font-semibold"
                  nativeButton={false}
                  render={
                    <Link
                      href={LINKS.demo}
                      data-analytics-event="demo_request"
                      data-analytics-location="blog-post-cta"
                    />
                  }
                >
                  Solicitar demonstração
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/18 transition-transform group-hover/cta:translate-x-0.5">
                    <ArrowRight className="size-3.5" />
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full px-6"
                  nativeButton={false}
                  render={<Link href="/blog" />}
                >
                  Mais artigos
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
