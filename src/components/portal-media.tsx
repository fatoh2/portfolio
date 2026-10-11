import { getImageProps } from "next/image";
import { isPortalBannerVariant, type PortalVariant } from "./portal-variant";
import { PortalVideo } from "./portal-video";

const base = "/work/elsewhereco";

type Source = { src: string; width: number; height: number };

/** Art-directed picture: a desktop capture on wide screens, a phone capture on narrow ones. */
function Picture({
  desktop,
  mobile,
  alt,
  className,
  attrs,
}: {
  desktop: Source;
  mobile: Source;
  alt: string;
  className: string;
  attrs?: Record<string, string>;
}) {
  const common = { alt, sizes: "100vw", quality: 75, priority: true };
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, ...desktop });
  const {
    props: { srcSet: mobileSet, ...rest },
  } = getImageProps({ ...common, ...mobile });
  return (
    <picture>
      <source media="(min-width: 760px)" srcSet={desktopSet} />
      <source media="(max-width: 759px)" srcSet={mobileSet} />
      <img {...rest} alt={alt} className={className} style={undefined} {...attrs} />
    </picture>
  );
}

const captures = {
  desktop: { src: `${base}/desktop.jpg`, width: 1440, height: 900 },
  mobile: { src: `${base}/mobile.jpg`, width: 780, height: 1688 },
  desktopUi: { src: `${base}/desktop-ui.png`, width: 1440, height: 900 },
  mobileUi: { src: `${base}/mobile-ui.png`, width: 780, height: 1688 },
  desktopFull: { src: `${base}/desktop-full.jpg`, width: 1440, height: 3600 },
  mobileFull: { src: `${base}/mobile-full.jpg`, width: 780, height: 6800 },
  photo: { src: `${base}/hero-photo.jpg`, width: 2400, height: 1600 },
};

export function PortalExperimentMedia({
  variant,
  alt,
}: {
  variant: PortalVariant;
  alt: string;
}) {
  if (isPortalBannerVariant(variant)) {
    const bannerAlt = {
      constellation: "ElsewhereCo and Seeker Radar alongside Nuqta and SOLitaire mobile apps in a project constellation",
      monogram: "Portfolio concept: the Fathallah Haj monogram filled with his project interfaces",
      studio: "Portfolio concept: a creative studio showing ElsewhereCo, Seeker Radar, SOLitaire and Little Keepsakes",
    }[variant];
    return (
      <div className="portal-media" data-portal-media>
        <Picture
          desktop={{
            src: `/portal-concepts/${variant === "constellation" ? "constellation-v2" : variant}.webp`,
            width: 1672,
            height: 941,
          }}
          mobile={{
            src: `/portal-concepts/${variant === "constellation" ? "constellation-mobile-v2" : `${variant}-mobile`}.webp`,
            width: variant === "constellation" ? 941 : 948,
            height: variant === "constellation" ? 1672 : variant === "monogram" ? 1660 : 1659,
          }}
          alt={bannerAlt}
          className="portal-photo"
          attrs={{ "data-portal-photo": "" }}
        />
      </div>
    );
  }
  if (variant === "video") {
    return (
      <div className="portal-media" data-portal-media>
        <Picture
          desktop={captures.desktop}
          mobile={captures.mobile}
          alt={alt}
          className="portal-photo"
          attrs={{ "data-portal-photo": "" }}
        />
        <PortalVideo
          desktopMp4={`${base}/desktop.mp4`}
          desktopWebm={`${base}/desktop.webm`}
          mobileMp4={`${base}/mobile.mp4`}
          mobileWebm={`${base}/mobile.webm`}
        />
      </div>
    );
  }
  if (variant === "still") {
    return (
      <div className="portal-media" data-portal-media>
        <Picture
          desktop={captures.photo}
          mobile={captures.photo}
          alt={alt}
          className="portal-photo portal-layer-back"
          attrs={{ "data-portal-photo": "", "data-portal-layer": "back" }}
        />
        <div className="portal-scrim" aria-hidden="true" />
        <Picture
          desktop={captures.desktopUi}
          mobile={captures.mobileUi}
          alt=""
          className="portal-photo portal-layer-front"
          attrs={{ "data-portal-layer": "front" }}
        />
      </div>
    );
  }
  return (
    <div className="portal-media" data-portal-media>
      <Picture
        desktop={captures.desktopFull}
        mobile={captures.mobileFull}
        alt={alt}
        className="portal-photo portal-photo-pan"
        attrs={{ "data-portal-photo": "", "data-portal-pan": "" }}
      />
    </div>
  );
}
