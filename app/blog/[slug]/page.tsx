import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react"

import { LandingFooter } from "@/components/landing/layout/LandingFooter"
import { LandingNav } from "@/components/landing/layout/LandingNav"
import { SecondaryPageHero } from "@/components/landing/layout/SecondaryPageHero"
import { BLOG_POSTS, formatDate, getPostBySlug } from "@/lib/blog-data"
import { LINKS, SITE, SITE_URL } from "@/lib/landing-data"
import { absoluteUrl, organizationJsonLd } from "@/lib/seo"

type Props = {
  params: Promise<{ slug: string }>
}

type ArticleHeading = {
  id: string
  title: string
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) return { title: "Post não encontrado" }

  const url = absoluteUrl(`/blog/${post.slug}`)
  const image = {
    url: absoluteUrl(`/blog/${post.slug}/opengraph-image`),
    width: 1200,
    height: 630,
    alt: post.title,
  }

  return {
    title: post.seoTitle,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name, url: `${SITE_URL}/sobre` }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: post.seoTitle,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.excerpt,
      images: [image],
    },
  }
}

function slugifyHeading(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function getArticleHeadings(content: string): ArticleHeading[] {
  return content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const title = line.slice(3)
      return { id: slugifyHeading(title), title }
    })
}

function renderInlineText(text: string) {
  return text
    .split(/(\*\*.*?\*\*)/g)
    .map((part, index) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
      ) : (
        part
      )
    )
}

function renderContent(content: string) {
  const elements: React.ReactNode[] = []
  let listItems: string[] = []
  let listType: "ordered" | "unordered" | null = null
  let key = 0

  const flushList = () => {
    if (!listType || listItems.length === 0) return

    const items = listItems.map((item) => (
      <li key={item}>{renderInlineText(item)}</li>
    ))

    elements.push(
      listType === "ordered" ? (
        <ol key={key++}>{items}</ol>
      ) : (
        <ul key={key++}>{items}</ul>
      )
    )
    listItems = []
    listType = null
  }

  for (const line of content.split("\n")) {
    const unorderedItem = line.match(/^- (.+)$/)
    const orderedItem = line.match(/^\d+\. (.+)$/)

    if (unorderedItem || orderedItem) {
      const nextType = orderedItem ? "ordered" : "unordered"

      if (listType && listType !== nextType) flushList()
      listType = nextType
      listItems.push((unorderedItem ?? orderedItem)?.[1] ?? "")
      continue
    }

    flushList()

    if (line.startsWith("### ")) {
      const title = line.slice(4)
      elements.push(
        <h3 key={key++} id={slugifyHeading(title)}>
          {title}
        </h3>
      )
    } else if (line.startsWith("## ")) {
      const title = line.slice(3)
      elements.push(
        <h2 key={key++} id={slugifyHeading(title)}>
          {title}
        </h2>
      )
    } else if (line.trim()) {
      elements.push(<p key={key++}>{renderInlineText(line)}</p>)
    }
  }

  flushList()
  return elements
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const headings = getArticleHeadings(post.content)
  const currentIndex = BLOG_POSTS.findIndex((item) => item.slug === slug)
  const prevPost =
    currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null
  const articleUrl = absoluteUrl(`/blog/${post.slug}`)
  const articleImage = absoluteUrl(
    `/blog/${post.slug}/opengraph-image`
  )
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        image: articleImage,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        inLanguage: "pt-BR",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": articleUrl,
        },
        author: {
          "@type": "Organization",
          name: post.author.name,
          url: `${SITE_URL}/sobre`,
        },
        publisher: organizationJsonLd,
        keywords: post.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl("/blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: articleUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <LandingNav />
      <main className="article-page">
        <SecondaryPageHero
          variant="editorial"
          eyebrow="Caderno SIGAPP"
          title={post.title}
          description={post.excerpt}
          breadcrumbs={[
            { label: "Início", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.category },
          ]}
          afterDescription={
            <div className="article-hero-taxonomy">
              <span>{post.category}</span>
              <span>
                <Clock aria-hidden="true" /> {post.readTime} min de leitura
              </span>
            </div>
          }
          meta={
            <div className="article-hero-author">
              <span aria-hidden="true">{post.author.initials}</span>
              <div>
                <strong>{post.author.name}</strong>
                <p>
                  {post.author.role} ·{" "}
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </p>
              </div>
            </div>
          }
        />

        <section className="article-stage">
          <div className="container-landing article-layout">
            <aside className="article-reading-rail">
              <Link href="/blog">
                <ArrowLeft aria-hidden="true" /> Voltar ao arquivo
              </Link>
              <div>
                <span>Neste artigo</span>
                <nav aria-label="Navegação deste artigo">
                  {headings.map((heading, index) => (
                    <a key={heading.id} href={`#${heading.id}`}>
                      <span aria-hidden="true">0{index + 1}</span>
                      {heading.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="article-main">
              <article className="article-prose">
                {renderContent(post.content)}
              </article>

              <footer className="article-tags">
                <Tag aria-hidden="true" />
                <span className="sr-only">Temas:</span>
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </footer>
            </div>
          </div>
        </section>

        {prevPost || nextPost ? (
          <nav className="article-navigation-stage" aria-label="Outros artigos">
            <div className="container-landing article-navigation-grid">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`}>
                  <span>
                    <ArrowLeft aria-hidden="true" /> Anterior
                  </span>
                  <strong>{prevPost.title}</strong>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="is-next">
                  <span>
                    Próximo <ArrowRight aria-hidden="true" />
                  </span>
                  <strong>{nextPost.title}</strong>
                </Link>
              ) : null}
            </div>
          </nav>
        ) : null}

        <section
          className="editorial-cta-stage"
          aria-labelledby="article-cta-title"
        >
          <div className="container-landing editorial-cta-panel">
            <div>
              <span className="editorial-index">Aplique ao seu caso</span>
              <h2 id="article-cta-title">
                Quer ver isso no dossiê do seu terreno?
              </h2>
            </div>
            <div className="editorial-cta-action">
              <p>
                Solicite uma demonstração guiada — com um caso real da carteira,
                se tiver.
              </p>
              <div>
                <Link
                  href={LINKS.demo}
                  className="editorial-primary-link"
                  data-analytics-event="demo_request"
                  data-analytics-location="blog-post-cta"
                >
                  Solicitar demonstração
                  <ArrowRight aria-hidden="true" />
                </Link>
                <Link href="/blog" className="editorial-secondary-link">
                  Mais artigos
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
