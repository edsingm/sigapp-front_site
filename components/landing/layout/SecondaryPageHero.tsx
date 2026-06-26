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

export function SecondaryPageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  align = "center",
  meta,
  afterDescription,
}: SecondaryPageHeroProps) {
  const centered = align === "center"

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0B1E39]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(108,160,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(46,107,255,0.18),transparent_30%)]" />
      <div className="bg-blueprint-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#071529]/45" />

      <div className="container-landing relative pt-28 pb-20 md:pt-32 md:pb-24">
        <div
          className={cn(
            "flex flex-col gap-6",
            centered ? "items-center text-center" : "max-w-4xl"
          )}
        >
          {breadcrumbs.length > 0 ? (
            <div
              className={cn(
                "flex flex-wrap items-center gap-2 text-[11px] tracking-[0.14em] text-white/56 uppercase",
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
                      className="transition-colors hover:text-white/82"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{item.label}</span>
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
              "flex flex-col gap-4",
              centered ? "max-w-4xl items-center" : "max-w-3xl"
            )}
          >
            <h1 className="font-heading text-4xl leading-[0.96] font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-[54ch] text-base leading-relaxed text-white/76 md:text-lg">
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
