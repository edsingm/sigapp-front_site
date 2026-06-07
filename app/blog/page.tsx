import type { Metadata } from "next"
import Link from "next/link"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { EyebrowBadge } from "@/components/landing/ui/EyebrowBadge"
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
    "Artigos sobre viabilidade financeira imobiliária, inteligência artificial no mercado de incorporação e boas práticas de gestão de terrenos.",
}

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  "Mercado Imobiliário":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Tecnologia: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  "Inteligência Artificial":
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Produto: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Dicas: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
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
          className={`font-heading font-bold tracking-tight text-foreground group-hover:text-primary transition-colors ${
            featured ? "text-xl lg:text-2xl" : "text-base"
          }`}
        >
          {post.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-primary">
              {post.author.initials}
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">{post.author.name}</p>
              <p className="text-[10px] text-muted-foreground">{formatDate(post.publishedAt)}</p>
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
        <section className="relative overflow-hidden border-b border-border py-20">
          <div className="bg-dot-pattern absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
          <div className="container-landing relative text-center">
            <EyebrowBadge variant="amber" className="mb-4">
              Blog do SIGAPP
            </EyebrowBadge>
            <h1 className="font-heading mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl">
              Conteúdo sobre incorporação imobiliária
            </h1>
            <p className="mx-auto mt-4 max-w-[52ch] text-lg text-muted-foreground">
              Artigos técnicos sobre viabilidade financeira, IA no mercado imobiliário e boas
              práticas para incorporadoras.
            </p>
          </div>
        </section>

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
                  className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-foreground cursor-pointer transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Featured posts */}
            {featured.length > 0 && (
              <div className="mb-10">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
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
        <section className="border-t border-border bg-muted/20 py-16">
          <div className="container-landing">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Receba novos artigos toda semana
              </h2>
              <p className="mt-2 text-muted-foreground">
                Conteúdo técnico sobre o mercado imobiliário e tecnologia. Sem spam.
              </p>
              <div className="mt-6 flex gap-2">
                <input
                  type="email"
                  placeholder="seu@email.com.br"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
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
