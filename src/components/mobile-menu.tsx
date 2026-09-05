"use client";

import { Menu } from "lucide-react";
import type { ReactNode } from "react";

export function MobileMenu({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <details
      className="mobile-menu"
      onClick={(event) => {
        if ((event.target as Element).closest("a"))
          event.currentTarget.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.currentTarget.open = false;
          event.currentTarget
            .querySelector("summary")
            ?.focus({ preventScroll: true });
        }
      }}
    >
      <summary title={label} aria-label={label}>
        <Menu aria-hidden="true" size={20} />
      </summary>
      {children}
    </details>
  );
}
