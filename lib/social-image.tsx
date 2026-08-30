import { ImageResponse } from "next/og";
import { SITE_TITLE } from "./meta";
import { getSite } from "./site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export function socialImageAlt(): string {
  const site = getSite();
  return site.good ? `${SITE_TITLE} Yes.` : `${SITE_TITLE} No.`;
}

export function socialImageResponse(): ImageResponse {
  const site = getSite();
  const answer = site.good ? "Yes" : "No";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#ffffff",
          color: "#111111",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 600,
            letterSpacing: "-0.04em",
          }}
        >
          {SITE_TITLE}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 180,
            fontWeight: 600,
            letterSpacing: "-0.05em",
            marginTop: 16,
          }}
        >
          {answer}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#525252",
            marginTop: 40,
          }}
        >
          ismcpgoodyet.com
        </div>
      </div>
    ),
    { ...size },
  );
}
