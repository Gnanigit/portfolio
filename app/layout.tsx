import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gnani — Full Stack Developer',
  description:
    'Full Stack MERN developer crafting performant, scalable web applications. React, Next.js, Node.js, MongoDB, TypeScript.',
  keywords: [
    'Full Stack Developer',
    'MERN Stack',
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'TypeScript',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Gnani' }],
  creator: 'Gnani',
  metadataBase: new URL('https://gnani.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gnani.dev',
    siteName: 'Gnani — Portfolio',
    title: 'Gnani — Full Stack Developer',
    description:
      'Full Stack MERN developer crafting performant, scalable web applications.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gnani — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gnani — Full Stack Developer',
    description: 'Full Stack MERN developer. React, Next.js, Node.js, MongoDB.',
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
