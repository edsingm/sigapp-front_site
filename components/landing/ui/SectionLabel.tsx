import { cn } from "@/lib/utils"

type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "eyebrow text-(--color-brand-navy) dark:text-secondary",
        className
      )}
    >
      {children}
    </p>
  )
}
