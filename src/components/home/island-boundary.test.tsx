import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { buildCards } from "@/lib/home-cards";
import { HomeCard } from "./home-card";
import { IslandBoundary } from "./island-boundary";

const track = vi.hoisted(() => vi.fn());
vi.mock("@vercel/analytics", () => ({ track }));

function Broken(): never {
  throw new Error("island failed");
}

afterEach(() => {
  cleanup();
  track.mockClear();
});

describe("an island that throws", () => {
  it.each(["ask", "work"])("drops only the %s island and reports it once", (island) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const card = buildCards("en")[0];
    render(
      <section id="work">
        <a href="#q-live" data-ask-chip="live">
          {"What's live?"}
        </a>
        <IslandBoundary island={island}>
          <Broken />
        </IslandBoundary>
        <HomeCard card={card} index={0} locale="en" />
      </section>,
    );
    expect(document.getElementById("work")).not.toBeNull();
    expect(document.querySelector("[data-ask-chip]")).not.toBeNull();
    expect(document.querySelector("article[data-slug] .home-card-title a")).not.toBeNull();
    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith("island_error", { island });
  });
});
