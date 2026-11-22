import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

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
          background: "#090D1A",
          borderRadius: "50%",
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Ring */}
          <circle
            cx="32"
            cy="32"
            r="26"
            stroke="#818CF8"
            strokeWidth="5"
          />
          {/* Diamond Cap */}
          <path
            d="M32 17L46 24L32 31L18 24L32 17Z"
            stroke="#818CF8"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          {/* Lower U-loop */}
          <path
            d="M22.5 28.5V31.5C22.5 36.5 26.5 40.5 32 40.5C37.5 40.5 41.5 36.5 41.5 31.5V28.5"
            stroke="#818CF8"
            strokeWidth="4.5"
          />
          {/* Tassel */}
          <path
            d="M46 24V32.5"
            stroke="#818CF8"
            strokeWidth="3.5"
          />
          <circle cx="46" cy="33.5" r="1.5" fill="#A78BFA" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
