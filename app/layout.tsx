import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Is MCP good yet?",
  description:
    "A scoreboard of MCP features in Codex, Cursor, Claude Code, Grok, and OpenCode, plus the latest MCP news.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full bg-white font-sans text-neutral-900">
        {children}
      </body>
    </html>
  );
}
