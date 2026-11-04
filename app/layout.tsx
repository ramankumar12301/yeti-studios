import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YETI STUDIOS | Timeless Indian Cinema",
  description: "A curated collection of iconic films, legendary actors and unforgettable moments from Indian cinema.",
  icons: { icon: "/logo/yeti-studio-foot-logo-002.png" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
