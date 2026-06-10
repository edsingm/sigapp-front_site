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
        "inline-flex self-start items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-[0.14em] shadow-sm shadow-black/5",
        variant === "brand" &&
          "border border-primary/18 bg-accent/80 text-primary",
        variant === "default" &&
          "border border-border bg-muted text-muted-foreground",
        variant === "muted" && "bg-muted text-muted-foreground",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-secondary" />
      {children}
    </span>
  )
}
