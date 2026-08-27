import Image from "next/image";
import type { Locale } from "@/content/portfolio";
import { getDictionary } from "@/content/ui";

export function HeroCanvas({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);

  return (
    <div className="hero-canvas" aria-label={dictionary.hero.signal}>
      <div className="canvas-line canvas-line-a" aria-hidden="true" />
      <div className="canvas-line canvas-line-b" aria-hidden="true" />
      <figure className="canvas-frame canvas-main">
        <Image
          src="/work/go-to-nature-home.png"
          alt="Go To Nature live Arabic community homepage"
          fill
          priority
          sizes="(min-width: 900px) 45vw, 92vw"
          className="canvas-image"
        />
        <figcaption>
          <span className="live-dot" aria-hidden="true" />
          Go To Nature · {dictionary.hero.live}
        </figcaption>
      </figure>
      <figure className="canvas-frame canvas-lulu">
        <Image
          src="/work/lulu-tokki-home.png"
          alt="Lulu Tokki live Arabic storefront"
          fill
          priority
          sizes="(min-width: 900px) 18vw, 42vw"
          className="canvas-image"
        />
        <figcaption>Lulu Tokki</figcaption>
      </figure>
      <figure className="canvas-frame canvas-solitaire">
        <Image
          src="/labs/solitaire/solitaire-gameplay.png"
          alt="SOLitaire mobile gameplay"
          fill
          sizes="(min-width: 900px) 11vw, 25vw"
          className="canvas-image canvas-contain"
        />
        <figcaption>SOLitaire</figcaption>
      </figure>
      <div className="canvas-agent">
        <span>AI</span>
        <strong>human takeover</strong>
        <small>{dictionary.hero.private}</small>
      </div>
      <div className="canvas-signal">
        <span className="signal-pulse" aria-hidden="true" />
        {dictionary.hero.signal}
      </div>
    </div>
  );
}
