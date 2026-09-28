import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "#f4f4f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "9999px",
              backgroundColor: "#2563eb",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#3b82f6",
            }}
          >
            {site.education.school}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {site.name}
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "#a1a1aa",
              maxWidth: "900px",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {site.tagline}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid #27272a",
            paddingTop: "32px",
          }}
        >
          <span style={{ fontSize: "20px", color: "#a1a1aa" }}>
            {site.email}
          </span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#f4f4f5",
            }}
          >
            thyshansen.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
