"use client";

import { track } from "@vercel/analytics";
import { Component, type ReactNode } from "react";

/**
 * Wraps one client island. If the island throws while rendering or in an effect, it is dropped and the
 * server-rendered page around it stays usable; the failure is reported once instead of passing silently.
 */
export class IslandBoundary extends Component<{ island: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    track("island_error", { island: this.props.island });
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
