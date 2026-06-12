import { cn } from "@/lib/utils"
import type { Testimonial } from "@/lib/landing-data"

type TestimonialCardProps = {
  testimonial: Testimonial
  className?: string
}

const AVATAR_TONES = [
  "bg-primary text-primary-foreground ring-primary/20",
  "bg-secondary/22 text-foreground ring-secondary/20",
  "bg-emerald-500/12 text-emerald-700 ring-emerald-500/15 dark:text-emerald-300",
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
  const hash = Array.from(value).reduce((acc, char) => acc + char.charCodeAt(0), 0)
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
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className="size-4 fill-secondary text-secondary"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

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
