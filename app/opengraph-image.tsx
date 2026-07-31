import { ImageResponse } from "next/og"

export const alt = "SIGAPP — viabilidade imobiliária para incorporadoras"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Brand hex mirrors app primary oklch(0.488 0.243 264.376) + derived surfaces. */
const BRAND = {
  canvas: "#F7FAFF",
  ink: "#050F2C",
  primary: "#1447E6",
  onBrand: "#F2F5FC",
} as const

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: BRAND.canvas,
        color: BRAND.ink,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(rgba(5,15,44,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(5,15,44,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-80px",
          top: "-100px",
          width: "540px",
          height: "540px",
          display: "flex",
          borderRadius: "50%",
          background: BRAND.primary,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 116,
          top: 108,
          width: 250,
          height: 250,
          display: "flex",
          transform: "rotate(18deg)",
          border: `3px solid ${BRAND.ink}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 178,
          top: 170,
          width: 126,
          height: 126,
          display: "flex",
          transform: "rotate(18deg)",
          border: `3px solid ${BRAND.ink}`,
          background: "rgba(247,250,255,0.35)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 228,
          top: 220,
          width: 26,
          height: 26,
          display: "flex",
          borderRadius: "50%",
          background: BRAND.ink,
          boxShadow: "0 0 0 12px rgba(247,250,255,0.72)",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: "-0.03em",
        }}
      >
        <span
          style={{
            display: "flex",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: BRAND.primary,
          }}
        />
        SIGAPP
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          maxWidth: 850,
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Inteligência para incorporadoras
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 0.98,
            letterSpacing: "-0.055em",
          }}
        >
          <span>Do terreno</span>
          <span>à decisão.</span>
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 780,
            fontSize: 27,
            lineHeight: 1.3,
            color: "rgba(5,15,44,0.76)",
          }}
        >
          Mapas, DRE, TIR, comitê e legalização no mesmo dossiê.
        </div>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 20,
          color: "rgba(5,15,44,0.66)",
        }}
      >
        <span>Viabilidade · território · governança</span>
        <span
          style={{
            display: "flex",
            padding: "12px 18px",
            borderRadius: 999,
            background: BRAND.ink,
            color: BRAND.onBrand,
            fontWeight: 700,
          }}
        >
          sigapp.com.br
        </span>
      </div>
    </div>,
    size
  )
}
