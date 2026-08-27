"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventData?: Record<string, string>;
};

export function TrackedLink({
  eventName,
  eventData,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        track(eventName, eventData);
        onClick?.(event);
      }}
    />
  );
}

type TrackedAnchorProps = ComponentProps<"a"> & {
  eventName: string;
  eventData?: Record<string, string>;
};

export function TrackedAnchor({
  eventName,
  eventData,
  onClick,
  ...props
}: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        track(eventName, eventData);
        onClick?.(event);
      }}
    />
  );
}
