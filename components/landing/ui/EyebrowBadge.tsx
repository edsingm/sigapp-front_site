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
        "eyebrow self-start",
        variant === "brand" && "text-primary",
        variant === "default" && "text-muted-foreground",
        variant === "muted" && "text-muted-foreground/80",
        className
      )}
    >
      {children}
    </span>
  )
}
