/** Local experiments for what the opening mark reveals. */
export const portalBannerVariants = ["constellation", "monogram", "studio"] as const;
export type PortalBannerVariant = (typeof portalBannerVariants)[number];
export const portalVariants = ["video", "still", "pan", ...portalBannerVariants] as const;
export type PortalVariant = (typeof portalVariants)[number];

export function isPortalBannerVariant(value?: string): value is PortalBannerVariant {
  return portalBannerVariants.some((variant) => variant === value);
}

export function parsePortalVariant(
  value: string | string[] | undefined,
): PortalVariant | undefined {
  const candidate = Array.isArray(value) ? value[0] : value;
  return portalVariants.find((variant) => variant === candidate);
}
