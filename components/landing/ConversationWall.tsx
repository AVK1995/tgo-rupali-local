import { asset } from '@/components/shared/asset-version';
import { CtaLockup } from '@/components/shared/CtaLockup';
import { MediaPlaceholder } from '@/components/shared/MediaPlaceholder';
import { SectionMasthead } from '@/components/shared/SectionMasthead';

/**
 * BEAT 4b · PROOF B: "THOUSANDS OF CONVERSATIONS."
 *
 * Shape: PROOF VOLUME. The claim is the count ("thousands", "hundreds"),
 * not any one exhibit, so the form is the counter-scrolling wall (§6,
 * shipped as the Deepti wins wall): it reads as an unending stream rather
 * than a curated handful. The copy specifies it exactly: two rows of ten,
 * row 1 moves left to right, row 2 right to left.
 *
 * Mechanics:
 *  · each row renders its set TWICE and slides by -50%, so the loop has no
 *    seam. The second copy is aria-hidden: a screen reader hears ten, not
 *    twenty.
 *  · hover pauses the row, so someone can actually read a message they
 *    spotted.
 *  · reduced motion: the rows stop, the duplicate set is dropped, and each
 *    row becomes a plain horizontal scroller (landing.css section 92).
 *
 * TO FILL: put /public paths in ROW_1 / ROW_2 (e.g. '/proof/chat-01.webp').
 * The copy says "Pic" only; chat screenshots are assumed, at 4:5. If they
 * arrive at another ratio, change WALL_RATIO and `.sdp-wa-card > img` in
 * landing.css in the same pass. Encode to what is DRAWN (208px card, so
 * ~460px wide covers 2x) and bump ASSET_V.
 *
 * Carries the lockup that closes the proof run (see SESSION_STATE flags:
 * the copy does not print one here; the VSL blueprint repeats it after
 * proof).
 */
const WALL_RATIO = '4 / 5';

/* Web copies in /journeys/web: 520px tall (2x the drawn card), WebP. The
   originals beside them are the source; re-export from those, never re-save
   these. w/h are the web copy's pixels, so each card holds its width before
   the file arrives and the moving row never jumps. */
type Shot = { src: string; w: number; h: number };
const ROW_1: Shot[] = [
  { src: '/journeys/web/conceive-1.webp', w: 234, h: 520 },
  { src: '/journeys/web/conceive-2.webp', w: 390, h: 520 },
  { src: '/journeys/web/conceive-3.webp', w: 234, h: 520 },
  { src: '/journeys/web/conceive-4.webp', w: 234, h: 520 },
  { src: '/journeys/web/conceive-5.webp', w: 907, h: 402 },
  { src: '/journeys/web/conceive-6.webp', w: 240, h: 520 },
  { src: '/journeys/web/conceive-7.webp', w: 292, h: 520 },
  { src: '/journeys/web/conceive-8.webp', w: 390, h: 520 },
  { src: '/journeys/web/conceive-9.webp', w: 239, h: 520 },
  { src: '/journeys/web/conceive-10.webp', w: 731, h: 344 },
];
const ROW_2: Shot[] = [
  { src: '/journeys/web/aditi-mukesh-review-weightloss-and-lifestyle-improved.webp', w: 872, h: 360 },
  { src: '/journeys/web/fertility-conceived.webp', w: 234, h: 520 },
  { src: '/journeys/web/pregnant.webp', w: 234, h: 520 },
  { src: '/journeys/web/reverse-pcos-and-skin-hair-and-hormone-issue.webp', w: 386, h: 520 },
  { src: '/journeys/web/sheetal-cyst-and-endometriosis-improved.webp', w: 821, h: 520 },
  { src: '/journeys/web/weightloss-2.webp', w: 234, h: 520 },
  { src: '/journeys/web/weightloss-and-hormone-balance.webp', w: 347, h: 520 },
  { src: '/journeys/web/weightloss-and-conceived.webp', w: 234, h: 520 },
  { src: '/journeys/web/weightloss-and-healthy-lifestyle.webp', w: 1080, h: 492 },
  { src: '/journeys/web/whatsapp-image-2026-09-02-at-5-05-19-pm.webp', w: 450, h: 272 },
];

function Card({ shot, n }: { shot: Shot; n: number }) {
  const label = `Client conversation ${String(n).padStart(2, '0')}`;
  return (
    <div className="sdp-wa-card">
      {shot.src ? (
        /* Eager at low priority, not lazy: a card in a sliding row is
           horizontally off screen until it arrives, so lazy only starts each
           download as it enters, and phones show it blank. */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(shot.src)}
          alt={label}
          width={shot.w}
          height={shot.h}
          style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
          loading="eager"
          fetchPriority="low"
          decoding="async"
        />
      ) : (
        <MediaPlaceholder ratio={WALL_RATIO} label={label} note="Screenshot · 4:5 assumed" />
      )}
    </div>
  );
}

function Row({ items, dir, offset }: { items: Shot[]; dir: 'ltr' | 'rtl'; offset: number }) {
  return (
    <div className={`sdp-wa-row ${dir}`}>
      <div className="sdp-wa-track">
        {items.map((shot, i) => (
          <Card key={`a${i}`} shot={shot} n={offset + i + 1} />
        ))}
        <div className="sdp-wa-dup" aria-hidden>
          {items.map((shot, i) => (
            <Card key={`b${i}`} shot={shot} n={offset + i + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConversationWall() {
  return (
    <section id="conversations" className="sdp-wa sdp-light">
      <div className="sdp-wrap">
        <SectionMasthead
          title={
            <>
              Thousands Of Conversations. <br className="sdp-br-desk" />
              Hundreds Of Fertility <em>Breakthroughs.</em>
            </>
          }
          sub="Here's a small glimpse into our clients' journeys."
          delay=".06s"
        />
      </div>

      {/* full-bleed on purpose: the rows run edge to edge, outside the wrap */}
      <div className="sdp-wa-rows" data-sdp-reveal style={{ '--d': '.12s' } as React.CSSProperties}>
        <Row items={ROW_1} dir="ltr" offset={0} />
        <Row items={ROW_2} dir="rtl" offset={10} />
      </div>

      <div className="sdp-wrap">
        <div className="sdp-proof-cta" data-sdp-reveal style={{ '--d': '.1s' } as React.CSSProperties}>
          <CtaLockup />
        </div>
      </div>
    </section>
  );
}
