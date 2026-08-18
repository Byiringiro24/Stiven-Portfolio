import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NIYOMUGABO Stiven | Civil & Geotechnical Engineer",
  description: "Portfolio of NIYOMUGABO Stiven — BSc Civil Engineer (Geotechnical), ARK Design Ltd, Kigali Rwanda. Structural design, site engineering, project management.",
  keywords: ["civil engineer", "geotechnical", "structural design", "Rwanda", "Kigali", "ARK Design"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif" }}>{children}</body>
    </html>
  );
}
