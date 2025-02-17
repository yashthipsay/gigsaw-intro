import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Gigsaw - Your Complete Music Industry Platform",
  description:
    "Connect with professional spaces, equipment, and services. Take your music career to the next level with Gigsaw.",
    icons: {
      icon: [
        {
          url: 'https://gigsaw.s3.eu-north-1.amazonaws.com/Gigsaw_Icon.png',
          type: 'image/png',
        }
      ],
      shortcut: ['/favicon.ico']
    }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

