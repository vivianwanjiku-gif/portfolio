import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#143330",
          color: "#f6f1e7",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        VW
      </div>
    ),
    { ...size },
  )
}
