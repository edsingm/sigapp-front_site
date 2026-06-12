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
      <path
        d="M12 3 2.75 7.6 12 12.2l9.25-4.6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 12 12 16.6 21.25 12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 16.4 12 21l9.25-4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
