import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cric Fun — Daily Cricket Card Generator",
  description:
    "Create funny, shareable cricket match cards in minutes. Teams, best batter, best bowler, daily series results, and Ashraful of the Day — all in your browser.",
  applicationName: "Cric Fun",
  authors: [{ name: "Sakib", url: "https://nazmunsakib.com" }],
  creator: "Sakib",
  publisher: "nazmunsakib.com",
};

export const viewport: Viewport = {
  themeColor: "#060e17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
