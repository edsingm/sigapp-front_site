import { cn } from "@/lib/utils"

type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-[11px] font-bold uppercase tracking-[0.18em] text-primary",
        className
      )}
    >
      {children}
    </p>
  )
}
