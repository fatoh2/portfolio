import Image from "next/image";

/**
 * The scene the mark opens onto: real captures in drawn device frames, each on
 * its own depth so the controller can move them at different rates. Every
 * screen is a file under /public, so a product can be swapped by replacing one
 * image. The laptop screen is the gate image the controller waits for.
 */
export function PortalScene() {
  return (
    <div className="portal-media portal-scene-stage" data-portal-media>
      <div className="scene-glow" aria-hidden="true" data-portal-depth="0" />
      <svg className="scene-orbit" viewBox="0 0 1600 900" aria-hidden="true" data-portal-depth="0.4">
        <ellipse cx="800" cy="470" rx="720" ry="300" fill="none" stroke="#c8ff34" strokeWidth="2" />
        <circle cx="1348" cy="300" r="6" fill="#c8ff34" />
        <circle cx="236" cy="612" r="6" fill="#c8ff34" />
      </svg>
      <div className="scene-device scene-laptop" data-portal-depth="1">
        <div className="scene-screen">
          <Image
            src="/work/elsewhereco/desktop.webp"
            alt="ElsewhereCo's Arabic expedition homepage on a laptop"
            width={2880}
            height={1800}
            sizes="(min-width: 760px) 60vw, 100vw"
            priority
            className="portal-photo"
            data-portal-photo=""
          />
        </div>
      </div>
      <div className="scene-device scene-tablet" data-portal-depth="1.3">
        <div className="scene-screen">
          <Image
            src="/work/seeker-radar/discovery-desktop.jpg"
            alt="Seeker Radar's discovery feed on a tablet"
            width={1265}
            height={712}
            sizes="(min-width: 760px) 34vw, 70vw"
            priority
          />
        </div>
      </div>
      <div className="scene-device scene-phone scene-phone-a" data-portal-depth="1.7">
        <div className="scene-screen">
          <Image
            src="/labs/nuqta/nuqta-journey-ar.png"
            alt="Nuqta's learning journey on a phone"
            width={1170}
            height={2532}
            sizes="(min-width: 760px) 14vw, 36vw"
            priority
          />
        </div>
      </div>
      <div className="scene-device scene-phone scene-phone-b" data-portal-depth="2.1">
        <div className="scene-screen">
          <Image
            src="/labs/solitaire/solitaire-court-table-mobile-2026.png"
            alt="SOLitaire's Klondike table on a phone"
            width={1179}
            height={2622}
            sizes="(min-width: 760px) 15vw, 38vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
