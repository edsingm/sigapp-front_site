import { readFileSync } from "node:fs"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const alt = "SIGAPP — Inteligência para incorporar"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const logoMarkSvg = readFileSync(
  join(process.cwd(), "public/logo-mark.svg"),
  "utf8"
)
const logoMarkSrc = `data:image/svg+xml;utf8,${encodeURIComponent(logoMarkSvg)}`

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0B1E39",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          opacity: 0.42,
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          fill="none"
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d="M42 146c162-62 340-62 508 6 168 68 354 90 608 12"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="2"
            strokeDasharray="6 14"
          />
          <path
            d="M24 258c184-56 366-34 550 34 164 60 348 78 590 20"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
            strokeDasharray="6 14"
          />
          <path
            d="M58 394c172-44 356-20 530 32 162 48 340 54 548 6"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
            strokeDasharray="6 14"
          />
          <path
            d="M160 110 298 84 412 126 388 222 226 234 130 178Z"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.2)"
          />
          <path
            d="M298 84 456 70 596 120 574 222 388 222 412 126Z"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.18)"
          />
          <path
            d="M456 70 634 88 792 154 764 262 574 222 596 120Z"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.22)"
          />
          <path
            d="M226 234 388 222 370 348 198 364 108 296Z"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.18)"
          />
          <path
            d="M388 222 574 222 564 340 370 348Z"
            fill="rgba(46,107,255,0.18)"
            stroke="rgba(108,160,255,0.55)"
          />
          <path
            d="M574 222 764 262 748 374 564 340Z"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.22)"
          />
          <path
            d="M198 364 370 348 360 470 206 494 122 422Z"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.18)"
          />
          <path
            d="M370 348 564 340 554 456 360 470Z"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.2)"
          />
          <path
            d="M564 340 748 374 732 478 554 456Z"
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.18)"
          />
          <path
            d="M636 281 574 281 512 281"
            stroke="rgba(255,255,255,0.34)"
            strokeWidth="2"
            strokeDasharray="8 14"
          />
          <circle cx="574" cy="281" r="10" fill="#2E6BFF" />
          <circle cx="512" cy="281" r="7" fill="rgba(255,255,255,0.9)" />
          <circle cx="636" cy="281" r="7" fill="rgba(255,255,255,0.9)" />
        </svg>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 600,
            width: 120,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            filter: "blur(2px)",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 178,
            height: 58,
            padding: "8px 14px",
            borderRadius: 14,
            background: "#ffffff",
          }}
        >
          <img
            src={logoMarkSrc}
            alt="SIGAPP"
            width={150}
            height={46}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1.05,
          position: "relative",
        }}
      >
        <span style={{ fontSize: 72, fontWeight: 700, color: "#ffffff" }}>
          Do terreno
        </span>
        <span style={{ fontSize: 72, fontWeight: 700, color: "#6CA0FF" }}>
          ao retorno.
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          position: "relative",
        }}
      >
        <span style={{ fontSize: 28, color: "rgba(255,255,255,0.82)" }}>
          Sistema de inteligência de incorporação
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 18px",
            borderRadius: 8,
            background: "#2E6BFF",
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          Solicitar demonstração
        </span>
      </div>
    </div>,
    { ...size }
  )
}
