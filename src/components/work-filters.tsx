"use client";

import { useEffect, useState } from "react";
import { workTags, type WorkTag } from "@/lib/project-tags";

/** Hides index rows and dims deck labels whose `data-tags` lack the tag; returns the rows left. */
function applyFilter(active: WorkTag | null): number {
  let visible = 0;
  for (const element of document.querySelectorAll<HTMLElement>("main [data-tags]")) {
    const match = !active || (element.dataset.tags ?? "").split(" ").includes(active);
    if (element.matches(".home-index-link")) {
      element.hidden = !match;
      if (match) visible += 1;
    }
    element.toggleAttribute("data-dim", !match);
  }
  return visible;
}

/**
 * Filter chips for the work section. Without JavaScript the chips are absent
 * and everything shows; leaving the page restores every row.
 */
export function WorkFilters({
  labels,
  all,
  legend,
  empty,
}: {
  labels: Record<WorkTag, string>;
  all: string;
  legend: string;
  empty: string;
}) {
  const [active, setActive] = useState<WorkTag | null>(null);
  const [visibleRows, setVisibleRows] = useState<number | null>(null);

  useEffect(() => () => void applyFilter(null), []);

  function choose(tag: WorkTag | null) {
    const next = tag === active ? null : tag;
    setActive(next);
    setVisibleRows(next ? applyFilter(next) : (applyFilter(null), null));
  }

  return (
    <div className="work-filters-block">
      <div className="work-filters" role="group" aria-label={legend}>
        <button type="button" aria-pressed={active === null} onClick={() => choose(null)}>
          {all}
        </button>
        {workTags.map((tag) => (
          <button key={tag} type="button" aria-pressed={active === tag} onClick={() => choose(tag)}>
            {labels[tag]}
          </button>
        ))}
      </div>
      {visibleRows === 0 ? (
        <p className="work-filters-empty" role="status">
          {empty}
        </p>
      ) : null}
    </div>
  );
}
