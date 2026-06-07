import { cn } from "@/lib/utils"

type MetricDisplayProps = {
  value: string
  label: string
  footnote?: string
  className?: string
}

export function MetricDisplay({
  value,
  label,
  footnote,
  className,
}: MetricDisplayProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <span className="font-mono text-3xl font-bold tracking-tight text-foreground">
        {value}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
      {footnote && (
        <span className="text-xs text-muted-foreground/60">{footnote}</span>
      )}
    </div>
  )
}
