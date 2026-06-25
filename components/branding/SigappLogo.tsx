import { cn } from "@/lib/utils"

type SigappLogoProps = {
  className?: string
  width?: number
  height?: number
}

export function SigappLogo({ className, width = 188, height = 58 }: SigappLogoProps) {
  return (
    <svg
      viewBox="0 0 188 58"
      aria-label="SIGAPP"
      role="img"
      className={cn(className)}
      width={width}
      height={height}
    >
      <title>SIGAPP</title>
      <text
        x="4"
        y="47"
        fontFamily="Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontWeight="900"
        fontSize="48"
        fill="#2e6bff"
        letterSpacing="-2.5"
      >
        SIG
      </text>
      <rect x="87" y="7" width="96" height="44" rx="11" fill="#0b1e39" />
      <text
        x="135"
        y="39"
        fontFamily="Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
        fontWeight="800"
        fontSize="26"
        fill="white"
        textAnchor="middle"
        letterSpacing="1.5"
      >
        APP
      </text>
    </svg>
  )
}
