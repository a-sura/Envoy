import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Claryty Co | Documentation Audit Workroom',
  description: 'Continuous revenue tracking and optimization for high-growth developer platforms.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
