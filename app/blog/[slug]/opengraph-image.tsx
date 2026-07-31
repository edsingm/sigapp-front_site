import { ImageResponse } from "next/og"

import { getPostBySlug } from "@/lib/blog-data"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Brand hex mirrors app primary oklch(0.488 0.243 264.376) + derived surfaces. */
const BRAND = {
  ink: "#050F2C",
  primary: "#1447E6",
  onBrand: "#F2F5FC",
} as const

export default async function BlogPostOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const title = post?.title ?? "Inteligência para incorporar"
  const category = post?.category ?? "Caderno SIGAPP"

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
        background: BRAND.ink,
        color: BRAND.onBrand,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(rgba(242,245,252,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(242,245,252,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "-90px",
          top: "-280px",
          width: "520px",
          height: "520px",
          display: "flex",
          borderRadius: "50%",
          background: BRAND.primary,
          opacity: 0.95,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: 28,
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
            display: "flex",
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(5,15,44,0.9)",
            color: BRAND.onBrand,
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          {category}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          maxWidth: 980,
          flexDirection: "column",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            color: BRAND.primary,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Leitura de ofício
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 62 ? 54 : 64,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 20,
          color: "rgba(242,245,252,0.72)",
        }}
      >
        <span>Viabilidade · território · decisão</span>
        <span>sigapp.com.br/blog</span>
      </div>
    </div>,
    size
  )
}
