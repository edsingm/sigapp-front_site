import type { Metadata } from "next"
import Link from "next/link"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { Clock, ArrowRight } from "lucide-react"
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  getFeaturedPosts,
  formatDate,
  type BlogCategory,
} from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Blog — SIGAPP",
  description:
    "Conteúdo para incorporadoras sobre viabilidade, comitê, inteligência imobiliária e operação de incorporação.",
}

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "Mercado Imobiliário": "bg-primary/10 text-primary",
  Tecnologia: "bg-muted text-foreground/70",
  "Inteligência Artificial": "bg-secondary/20 text-primary",
  Produto: "bg-accent text-primary",
  Dicas: "bg-muted text-foreground/70",
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
      className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      {/* Cover */}
      <div
        className={`bg-gradient-to-br ${post.coverColor} flex shrink-0 items-end p-5 ${
          featured ? "lg:w-80 lg:items-center lg:justify-center" : "h-40"
        }`}
      >
        <span
          className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
            CATEGORY_COLORS[post.category]
          }`}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h2
          className={`font-heading font-bold tracking-tight text-foreground transition-colors group-hover:text-primary ${
            featured ? "text-xl lg:text-2xl" : "text-base"
          }`}
        >
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-primary">
              {post.author.initials}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">
                {post.author.name}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            <span>{post.readTime} min</span>
          </div>
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
        {/* Header */}
        <SecondaryPageHero
          eyebrow="Blog do SIGAPP"
          title="Conteúdo para quem decide terreno, risco e retorno"
          description="Artigos sobre viabilidade, comitê, inteligência imobiliária e operação de incorporação. Menos jargão de software, mais clareza para decisão."
        />

        <section className="py-16">
          <div className="container-landing">
            {/* Categories */}
            <div className="mb-10 flex flex-wrap gap-2">
              <span className="rounded-full border border-primary bg-accent px-4 py-1.5 text-xs font-semibold text-primary">
                Todos
              </span>
              {BLOG_CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="cursor-pointer rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Featured posts */}
            {featured.length > 0 && (
              <div className="mb-10">
                <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  Destaques
                </p>
                <div className="flex flex-col gap-6">
                  {featured.map((post) => (
                    <PostCard key={post.slug} post={post} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All other posts */}
            <div>
              <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Todos os artigos
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="relative overflow-hidden border-t border-white/10 bg-[#071529] py-16">
          <div className="bg-blueprint-grid absolute inset-0 opacity-50" />
          <div className="container-landing">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-heading text-2xl font-bold text-white">
                Receba análises novas sem ruído.
              </h2>
              <p className="mt-2 text-white/62">
                Conteúdo técnico para incorporadoras, com foco em decisão e
                operação. Sem spam.
              </p>
              <div className="mt-6 flex gap-2">
                <input
                  type="email"
                  placeholder="seu@email.com.br"
                  className="flex-1 rounded-lg border border-white/10 bg-white/6 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/36 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20"
                />
                <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
                  Assinar
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </>
  )
}
