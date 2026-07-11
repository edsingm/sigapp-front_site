import Link from "next/link"

import { cn } from "@/lib/utils"

type HeroBreadcrumb = {
  label: string
  href?: string
}

type SecondaryPageHeroProps = {
  eyebrow: string
  title: string
  description: string
  breadcrumbs?: HeroBreadcrumb[]
  align?: "left" | "center"
  meta?: React.ReactNode
  afterDescription?: React.ReactNode
}

/** Content-family hero — Long Document tone, brand navy field. */
export function SecondaryPageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  align = "left",
  meta,
  afterDescription,
}: SecondaryPageHeroProps) {
  const centered = align === "center"

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-(--color-brand-navy)">
      <div className="bg-blueprint-grid absolute inset-0 opacity-40" />
      <div className="grain-overlay opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/25" />

      <div className="container-landing relative pt-28 pb-16 md:pt-32 md:pb-20">
        <div
          className={cn(
            "flex flex-col gap-5",
            centered ? "items-center text-center" : "max-w-3xl"
          )}
        >
          {breadcrumbs.length > 0 ? (
            <div
              className={cn(
                "flex flex-wrap items-center gap-2 text-[11px] tracking-[0.14em] text-white/50 uppercase",
                centered && "justify-center"
              )}
            >
              {breadcrumbs.map((item, index) => (
                <span
                  key={`${item.label}-${index}`}
                  className="inline-flex items-center gap-2"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-white/80"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white/78">{item.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <span className="text-white/28">/</span>
                  ) : null}
                </span>
              ))}
            </div>
          ) : null}

          <span
            className={cn(
              "eyebrow text-secondary",
              centered && "eyebrow--center"
            )}
          >
            {eyebrow}
          </span>

          <div
            className={cn(
              "flex min-w-0 flex-col gap-4",
              centered ? "max-w-3xl items-center" : "max-w-3xl"
            )}
          >
            <h1 className="font-heading text-4xl leading-[0.98] font-bold tracking-[-0.04em] text-balance text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-[52ch] text-base leading-relaxed text-white/68 md:text-lg">
              {description}
            </p>
          </div>

          {afterDescription}
          {meta}
        </div>
      </div>
    </section>
  )
}
