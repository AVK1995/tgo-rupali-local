import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import './globals.css';
/* The shared footer's stylesheet. It loads from the ROOT layout because the
   footer renders on every surface (folded into the landing finale, and as a
   band on the checkout, booking, thank-you and policy pages), and a shared
   component whose CSS ships with one route renders unstyled on the others. */
import './footer.css';

import Analytics from '@/components/shared/Analytics';
import FunnelTracker from '@/components/shared/FunnelTracker';
import MetaPixel from '@/components/shared/MetaPixel';

/* Both variables go on <html>: the tokens that read them are declared on
   :root, and on <body> every font-family would silently fall back. */
const display = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'WONK'],
  variable: '--font-display',
  display: 'swap',
});

const body = Manrope({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title:
    'Get Pregnant Naturally, Even If You Have PCOS, Thyroid, Low AMH or Unexplained Fertility Issues',
  description:
    'A personalised fertility programme designed to improve fertility readiness, strengthen underlying health & prepare your body for your next attempt at conception. 2,000+ fertility journeys guided.',
  /* Pre-launch: the figures and the health claims are not signed off yet.
     Comes off only after that sign-off, not before. */
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}

        {/* ── TAGS, MOUNTED HERE AND NOWHERE ELSE ──────────────────────
            All three render nothing when their env ids are missing, so an
            unfilled variable leaves no broken script behind.

            They sit in the ROOT layout because each has work to do on more
            than the landing page. MetaPixel also captures first-touch
            attribution and the _fbc cookie, ABOVE its own pixel-id guard: a
            retargeting ad or an email can drop somebody straight onto
            /checkout, and that visit is the only one carrying the campaign.

            Analytics is the GA4 base tag, and it is part of this build rather
            than a snippet pasted in later, because every GA4 call checks for
            window.gtag and returns quietly when it is absent: without a base
            tag the whole browser funnel silently does nothing while the
            webhook keeps reporting purchases through the Measurement
            Protocol.

            FunnelTracker fires ViewContent and gates on the pathname itself,
            because app/page.tsx is SHAPE's half. ───────────────────────── */}
        <MetaPixel />
        <Analytics />
        <FunnelTracker />
      </body>
    </html>
  );
}
