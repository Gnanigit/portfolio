import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gnaneswar Yalla — Software Engineer',
  description:
    'Software Engineer specializing in MERN stack, AWS serverless architecture, and AI-powered applications. React, Next.js, Node.js, MongoDB, TypeScript.',
  keywords: [
    'Software Engineer',
    'MERN Stack',
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'TypeScript',
    'AWS',
    'Gnaneswar Yalla',
    'Gnani',
  ],
  authors: [{ name: 'Gnaneswar Yalla' }],
  creator: 'Gnaneswar Yalla',
  metadataBase: new URL('https://gnani.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gnani.dev',
    siteName: 'Gnaneswar Yalla — Portfolio',
    title: 'Gnaneswar Yalla — Software Engineer',
    description:
      'Software Engineer building scalable, AI-powered applications with MERN stack and AWS.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gnaneswar Yalla — Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gnaneswar Yalla — Software Engineer',
    description: 'Software Engineer. React, Next.js, Node.js, AWS, AI integrations.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (theme && ['dark-green','light-green','dark-purple','light-purple'].includes(theme)) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        {ga4Id && <GoogleAnalytics gaId={ga4Id} />}
      </body>
    </html>
  )
}
