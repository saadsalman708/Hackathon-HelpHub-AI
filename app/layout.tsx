import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import './globals.css';
import SiteShell from "@/components/layout/SiteShell";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--body-font",
})

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--heading-font",
})

export const metadata: Metadata = {
  title: "HelpHub AI | Community Support Platform",
  description: "Community-powered support network with AI intelligence.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}