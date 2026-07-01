import { cn } from "@/lib/utils"
import type { Testimonial } from "@/lib/landing-data"

type TestimonialCardProps = {
  testimonial: Testimonial
  className?: string
}

const AVATAR_TONES = [
  "bg-primary text-primary-foreground ring-primary/20",
  "bg-secondary/22 text-foreground ring-secondary/20",
  "bg-[color:rgba(224,164,54,0.16)] text-[var(--color-data-amber)] ring-[color:rgba(224,164,54,0.18)]",
]

function getInitials(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? "")
    .join("")
}

function getTone(value: string) {
  const hash = Array.from(value).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  )
  return AVATAR_TONES[hash % AVATAR_TONES.length]
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-colors duration-200 hover:border-primary/20",
        className
      )}
    >
      <div className="flex items-start">
        <span className="rounded-full border border-primary/10 bg-primary/6 px-2.5 py-1 text-[11px] font-semibold text-primary">
          {testimonial.highlight}
        </span>
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed text-foreground/80">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ring-1",
              getTone(testimonial.company)
            )}
          >
            {getInitials(testimonial.company)}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {testimonial.author}
            </p>
            <p className="text-xs text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
        <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
          {testimonial.city}
        </span>
      </figcaption>
    </figure>
  )
}
