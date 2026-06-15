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
        "inline-flex self-start items-center gap-2 rounded-md border-l-2 px-2.5 py-1 text-[11px] font-bold tracking-[0.16em] uppercase",
        variant === "brand" &&
          "border-primary bg-accent/70 text-primary",
        variant === "default" &&
          "border-muted-foreground/40 bg-muted text-muted-foreground",
        variant === "muted" && "border-border bg-muted text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}
