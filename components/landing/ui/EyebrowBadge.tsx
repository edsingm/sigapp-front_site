import { cn } from "@/lib/utils"

type EyebrowBadgeProps = {
  children: React.ReactNode
  variant?: "default" | "amber" | "muted"
  className?: string
}

export function EyebrowBadge({
  children,
  variant = "amber",
  className,
}: EyebrowBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variant === "amber" &&
          "border border-primary/30 bg-accent text-primary",
        variant === "default" &&
          "border border-border bg-muted text-muted-foreground",
        variant === "muted" && "bg-muted text-muted-foreground",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-primary" />
      {children}
    </span>
  )
}
