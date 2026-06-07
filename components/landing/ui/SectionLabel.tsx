import { cn } from "@/lib/utils"

type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-widest text-muted-foreground",
        className
      )}
    >
      {children}
    </p>
  )
}
