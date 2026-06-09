import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { Button } from "@/components/ui/button"
import { Clock, ArrowLeft, ArrowRight, Tag } from "lucide-react"
import {
  BLOG_POSTS,
  getPostBySlug,
  formatDate,
  type BlogCategory,
} from "@/lib/blog-data"

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "Mercado Imobiliário":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Tecnologia: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "Inteligência Artificial":
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Produto: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Dicas: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
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
          className="font-heading mt-10 mb-4 text-xl font-bold tracking-tight text-foreground md:text-2xl"
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
          {line
            .replace("- ", "")
            .replace(/\*\*(.*?)\*\*/g, "$1")}
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
  const prevPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null

  return (
    <>
      <LandingNav />
      <main>
        {/* Hero */}
        <section
          className={`relative overflow-hidden bg-gradient-to-br ${post.coverColor} py-20`}
        >
          <div className="container-landing">
            <Link
              href="/blog"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Voltar ao Blog
            </Link>

            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[post.category]}`}
                >
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3.5" />
                  <span>{post.readTime} min de leitura</span>
                </div>
              </div>

              <h1 className="font-heading text-3xl font-black tracking-tight text-foreground md:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-border/50 pt-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-primary">
                  {post.author.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.author.role} · {formatDate(post.publishedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

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
                    <p className="font-heading text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {prevPost.title}
                    </p>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col items-end gap-1 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md text-right"
                  >
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      Próximo <ArrowRight className="size-3.5" />
                    </span>
                    <p className="font-heading text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {nextPost.title}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-border bg-muted/20 py-16">
          <div className="container-landing">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Veja o SIGAPP em ação
              </h2>
              <p className="mt-2 text-muted-foreground">
                7 dias de trial completo. Cancele antes do fim e não paga nada.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <Button variant="brand" size="lg" className="gap-2">
                  Começar trial grátis
                  <ArrowRight className="size-4" />
                </Button>
                <Link href="/blog">
                  <Button variant="outline" size="lg">
                    Mais artigos
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
