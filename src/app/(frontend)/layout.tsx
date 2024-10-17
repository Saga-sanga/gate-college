import type { Metadata } from 'next'

import { cn } from '@/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '../components/AdminBar'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { LivePreviewListener } from '../components/LivePreviewListener'
import { Providers } from '../providers'
import { InitTheme } from '../providers/Theme/InitTheme'
import { mergeOpenGraph } from '../utilities/mergeOpenGraph'
import '@/styles/globals.scss'
import Script from 'next/script'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        {/* <InitTheme /> */}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        {/* <!-- Google tag (gtag.js) -->  */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GCPTEPNHWR"
          strategy="beforeInteractive"
        />
        <Script id="g-tag-init" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GCPTEPNHWR');`}
        </Script>
      </head>
      <body>
        <Providers>
          {
            // <AdminBar />
          }
          <LivePreviewListener />

          <Header />
          <main className="min-h-[75dvh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@recksonKhiangte',
  },
  keywords: [
    'GATE',
    'ATC',
    'Falakata',
    'Adventist College',
    'Thousand missionary',
    '1000 missionary',
    'Seventh-day',
    'Adventist',
    'SDA',
  ],
}
