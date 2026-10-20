import { ImageResponse } from "next/og"

export const alt = "Vivian Wanjiku, full-stack developer in Nairobi"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#143330",
          color: "#f6f1e7",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 3, textTransform: "uppercase", color: "#e2b48a" }}>
          Nairobi, Kenya
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 0.95 }}>Vivian Wanjiku</div>
          <div style={{ fontSize: 36, marginTop: 20, color: "#d5efe8" }}>Full-stack developer</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#d5ddd8" }}>
          SkyLink Aviation · TapNet Network · github.com/vivianwanjiku-gif
        </div>
      </div>
    ),
    { ...size },
  )
}
