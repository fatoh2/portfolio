import { monogramPath } from "@/lib/monogram";

export function BrandMonogram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="120 190 750 550"
      width="750"
      height="550"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path fillRule="evenodd" d={monogramPath} />
      <circle cx="739" cy="246" r="33" />
    </svg>
  );
}
