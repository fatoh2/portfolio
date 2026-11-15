"""Lab speed baseline: Playwright Chromium, mobile, slow-4G + 4x CPU (Lighthouse's mobile settings, applied
as DevTools throttling). 5 cold runs per route, medians of LCP and CLS. Run the same script before and after.
usage: python lab_speed.py <origin> [runs]"""
import json, statistics, sys
from playwright.sync_api import sync_playwright

origin = sys.argv[1].rstrip("/")
RUNS = int(sys.argv[2]) if len(sys.argv) > 2 else 5
ROUTES = ["/", "/ar", "/he"]
OBSERVE = """
window.__lcp = 0; window.__cls = 0;
new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.renderTime || e.loadTime || e.startTime; })
  .observe({ type: 'largest-contentful-paint', buffered: true });
new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; })
  .observe({ type: 'layout-shift', buffered: true });
"""
result = {}
with sync_playwright() as pw:
    browser = pw.chromium.launch()
    for route in ROUTES:
        runs = []
        for i in range(RUNS):
            ctx = browser.new_context(viewport={"width": 412, "height": 823}, device_scale_factor=1.75, is_mobile=True,
                                      has_touch=True, user_agent="Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36")
            page = ctx.new_page()
            cdp = ctx.new_cdp_session(page)
            cdp.send("Network.enable")
            cdp.send("Network.setCacheDisabled", {"cacheDisabled": True})
            cdp.send("Network.emulateNetworkConditions", {"offline": False, "latency": 150,
                     "downloadThroughput": 1638.4 * 1024 / 8, "uploadThroughput": 750 * 1024 / 8})
            cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})
            page.add_init_script(OBSERVE)
            page.goto(origin + route, wait_until="load", timeout=120000)
            page.wait_for_timeout(4000)
            lcp, cls = page.evaluate("[window.__lcp, window.__cls]")
            runs.append({"lcp_ms": round(lcp), "cls": round(cls, 4)})
            print(route, i + 1, runs[-1], flush=True)
            ctx.close()
        result[route] = {"lcp_ms": statistics.median(r["lcp_ms"] for r in runs),
                         "cls": statistics.median(r["cls"] for r in runs), "runs": runs}
    browser.close()
print("\nMEDIANS")
print(json.dumps({k: {"lcp_ms": v["lcp_ms"], "cls": v["cls"]} for k, v in result.items()}, indent=2))
