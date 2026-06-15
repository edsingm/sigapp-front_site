import { ImageResponse } from "next/og"

import { SigappLogoMark } from "@/components/branding/SigappLogoMark"

export const size = {
  width: 64,
  height: 64,
}

export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          background: "#0B1E39",
          color: "#6CA0FF",
        }}
      >
        <SigappLogoMark width={38} height={38} />
      </div>
    ),
    size
  )
}
