import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"

import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  formatDate,
  getFeaturedPosts,
  type BlogPost,
} from "@/lib/blog-data"
import { LINKS } from "@/lib/landing-data"
import {
  absoluteUrl,
  breadcrumbJsonLd,
  createPageMetadata,
  jsonLdGraph,
  organizationJsonLd,
  webPageJsonLd,
  websiteJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Blog de viabilidade imobiliária",
  description:
    "Artigos sobre viabilidade imobiliária, TIR, DRE, comitê de terrenos e operação de incorporação — leituras para quem decide com critério.",
  path: "/blog",
})

const blogIndexJsonLd = jsonLdGraph([
  organizationJsonLd,
  websiteJsonLd,
  webPageJsonLd({
    path: "/blog",
    name: "Blog de viabilidade imobiliária",
    description:
      "Artigos sobre viabilidade imobiliária, TIR, DRE, comitê de terrenos e operação de incorporação — leituras para quem decide com critério.",
    type: "CollectionPage",
  }),
  breadcrumbJsonLd([
    { name: "Início", path: "/" },
    { name: "Blog", path: "/blog" },
  ]),
  {
    "@type": "ItemList",
    name: "Artigos do blog SIGAPP",
    numberOfItems: BLOG_POSTS.length,
    itemListElement: BLOG_POSTS.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
    })),
  },
])

function FeaturedPostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-featured-card">
      <div className="blog-featured-visual" aria-hidden="true">
        <span>0{index + 1}</span>
        <div>
          <i />
          <i />
          <i />
        </div>
        <strong>SIG / LEITURA</strong>
      </div>
      <div className="blog-featured-content">
        <div className="blog-post-meta">
          <span>{post.category}</span>
          <span aria-hidden="true">/</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <div className="blog-post-footer">
          <span>
            <Clock aria-hidden="true" /> {post.readTime} min
          </span>
          <span className="blog-read-link">
            Ler análise <ArrowRight aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

function ArchivePostRow({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-archive-row">
      <span className="blog-archive-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="blog-archive-title">
        <div className="blog-post-meta">
          <span>{post.category}</span>
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </div>
        <h3>{post.title}</h3>
      </div>
      <p>{post.excerpt}</p>
      <div className="blog-archive-action">
        <span>{post.readTime} min</span>
        <ArrowRight aria-hidden="true" />
      </div>
    </Link>
  )
}

export default function BlogPage() {
  const featured = getFeaturedPosts()
  const rest = BLOG_POSTS.filter((post) => !post.featured)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
      />
      <LandingNav />
      <main id="conteudo-principal" tabIndex={-1} className="blog-page">
        <SecondaryPageHero
          variant="editorial"
          eyebrow="Leituras de ofício"
          title="Terreno, risco e retorno — sem jargão de software"
          description="Textos para quem analisa viabilidade, senta no comitê e conduz legalização. Clareza de domínio, não hype de produto."
          afterDescription={
            <dl className="blog-hero-stats">
              <div>
                <dt>Publicações</dt>
                <dd>{String(BLOG_POSTS.length).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt>Frentes editoriais</dt>
                <dd>{String(BLOG_CATEGORIES.length).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt>Foco</dt>
                <dd>BR</dd>
              </div>
            </dl>
          }
        />

        {featured.length > 0 ? (
          <section
            className="blog-featured-stage"
            aria-labelledby="featured-posts"
          >
            <div className="container-landing">
              <header className="blog-section-header">
                <div>
                  <span className="editorial-index">01 / Curadoria</span>
                  <h2 id="featured-posts">Em destaque</h2>
                </div>
                <p>Leituras para decisões que não cabem em uma célula.</p>
              </header>
              <div className="blog-featured-grid">
                {featured.map((post, index) => (
                  <FeaturedPostCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="blog-archive-stage" aria-labelledby="archive-posts">
          <div className="container-landing">
            <header className="blog-section-header">
              <div>
                <span className="editorial-index">02 / Índice</span>
                <h2 id="archive-posts">Arquivo</h2>
              </div>
              <p>{rest.length} análises para consultar no seu ritmo.</p>
            </header>
            <div className="blog-archive-list">
              {rest.map((post, index) => (
                <ArchivePostRow key={post.slug} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="editorial-cta-stage"
          aria-labelledby="blog-cta-title"
        >
          <div className="container-landing editorial-cta-panel">
            <div>
              <span className="editorial-index">Da leitura à operação</span>
              <h2 id="blog-cta-title">Prefere ver o dossiê ao vivo?</h2>
            </div>
            <div className="editorial-cta-action">
              <p>
                Solicite uma demonstração com um terreno da sua carteira — ou um
                cenário próximo da sua operação.
              </p>
              <div>
                <Link
                  href={LINKS.demo}
                  className="editorial-primary-link"
                  data-analytics-event="demo_request"
                  data-analytics-location="blog-cta"
                >
                  Solicitar demonstração
                  <ArrowRight aria-hidden="true" />
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
