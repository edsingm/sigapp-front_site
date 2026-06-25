import { cn } from "@/lib/utils"

type SigappLogoMarkProps = {
  className?: string
  width?: number
  height?: number
}

export function SigappLogoMark({ className, width, height }: SigappLogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn("size-4", className)}
      width={width}
      height={height}
    >
      <rect x="29" y="30" width="6" height="24" rx="3" fill="currentColor" />
      <path
        fillRule="evenodd"
        d="M32,24 C28,21 24,18 24,14 A8,8,0,0,1,40,14 C40,18 36,21 32,24 Z M35.5,14 A3.5,3.5,0,1,1,28.5,14 A3.5,3.5,0,1,1,35.5,14 Z"
        fill="currentColor"
      />
    </svg>
  )
}
