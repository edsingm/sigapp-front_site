import { cn } from "@/lib/utils"

type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/78",
        className
      )}
    >
      {children}
    </p>
  )
}
