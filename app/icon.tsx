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
          borderRadius: 20,
          background: "#3156e3",
          color: "white",
        }}
      >
        <SigappLogoMark width={36} height={36} className="text-white" />
      </div>
    ),
    size
  )
}
