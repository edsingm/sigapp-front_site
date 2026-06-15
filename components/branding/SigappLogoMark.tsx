import { cn } from "@/lib/utils"

type SigappLogoMarkProps = {
  className?: string
  width?: number
  height?: number
}

export function SigappLogoMark({
  className,
  width,
  height,
}: SigappLogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-4", className)}
      width={width}
      height={height}
    >
      <rect x="7" y="3.5" width="14" height="4.5" rx="2.25" fill="currentColor" />
      <rect x="3" y="9.75" width="18" height="4.5" rx="2.25" fill="currentColor" />
      <rect x="3" y="16" width="14" height="4.5" rx="2.25" fill="currentColor" />
    </svg>
  )
}
