import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type FeatureIconProps = {
  icon: LucideIcon
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeMap = {
  sm: { wrapper: "size-8 rounded-lg", icon: "size-4" },
  md: { wrapper: "size-10 rounded-xl", icon: "size-5" },
  lg: { wrapper: "size-12 rounded-xl", icon: "size-6" },
}

export function FeatureIcon({
  icon: Icon,
  size = "md",
  className,
}: FeatureIconProps) {
  const { wrapper, icon } = sizeMap[size]
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center bg-accent text-primary",
        wrapper,
        className
      )}
    >
      <Icon className={icon} strokeWidth={1.75} />
    </div>
  )
}
