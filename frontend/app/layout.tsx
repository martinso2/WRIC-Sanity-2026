import './globals.css'

import type {Metadata, Viewport} from 'next'
import Script from 'next/script'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import {SanityLive} from '@/sanity/lib/live'
import {handleError} from '@/app/client-utils'

export const metadata: Metadata = {
  title: "Women's Rights Information Center",
  description:
    'Mobile-friendly access to WRIC services, intake, support, donations, volunteer opportunities, and contact information.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="en">
      <head>
        <Script id="gt-init" strategy="beforeInteractive">{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,es,ko',
              layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
            }, 'google_translate_element');
          }
        `}</Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Toaster />
        {isDraftMode && (
          <>
            <DraftModeToast />
            <VisualEditing />
          </>
        )}
        <SanityLive onError={handleError} />
        {children}
      </body>
    </html>
  )
}
