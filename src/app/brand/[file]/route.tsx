import { ImageResponse } from "next/og";

// The Zutok mark from app/icon.svg as PNGs, for the places that need a bitmap: the Apple touch icon, the web app
// manifest and the logo in the Organization structured data. Exported as /brand/<file> at build time.
export const dynamic = "force-static";
export const dynamicParams = false;

const INK = "#0b0b0b";

const files: Record<string, { size: number; tile: boolean; mark: number }> = {
  // Rounded tile with an ink border, exactly like icon.svg.
  "icon-192.png": { size: 192, tile: true, mark: 0 },
  "logo-512.png": { size: 512, tile: true, mark: 0 },
  // Full-bleed white squares: iOS and Android crop their own shape, so the mark sits well inside the safe zone.
  "apple-touch-icon.png": { size: 180, tile: false, mark: 0.62 },
  "maskable-512.png": { size: 512, tile: false, mark: 0.5 },
};

export function generateStaticParams() {
  return Object.keys(files).map((file) => ({ file }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const spec = files[file];
  if (!spec) return new Response("Not found", { status: 404 });
  const { size, tile, mark } = spec;

  return new ImageResponse(
    tile ? (
      <svg width={size} height={size} viewBox="0 0 64 64">
        <rect x="2" y="2" width="60" height="60" rx="16" fill="#ffffff" stroke={INK} strokeWidth="4" />
        <g transform="translate(11 14) scale(0.0972)" fill={INK}>
          <path d="M122 0H432L277 170Z" />
          <path d="M152 205L307 372H0Z" />
          <path d="M77 35L357 340" fill="none" stroke={INK} strokeWidth="46" strokeLinecap="round" />
        </g>
      </svg>
    ) : (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#ffffff" }}>
        <svg width={size * mark} height={(size * mark * 372) / 432} viewBox="0 0 432 372" fill={INK}>
          <path d="M122 0H432L277 170Z" />
          <path d="M152 205L307 372H0Z" />
          <path d="M77 35L357 340" fill="none" stroke={INK} strokeWidth="46" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { width: size, height: size },
  );
}
