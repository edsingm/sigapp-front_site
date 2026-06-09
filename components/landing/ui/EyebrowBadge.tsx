import { cn } from "@/lib/utils"

type EyebrowBadgeProps = {
  children: React.ReactNode
  variant?: "default" | "brand" | "muted"
  className?: string
}

export function EyebrowBadge({
  children,
  variant = "brand",
  className,
}: EyebrowBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex self-start items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium tracking-wide",
        variant === "brand" &&
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
