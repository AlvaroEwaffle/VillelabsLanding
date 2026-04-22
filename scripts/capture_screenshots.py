"""
Capture screenshots of Villelabs site at localhost:3099
Desktop (1920x1080) and Mobile (375x812) for each page.
Uses .html extension paths since Python http.server serves the static export.
"""
from playwright.sync_api import sync_playwright
import os

BASE_URL = "http://localhost:3099"
OUTPUT_DIR = "/Users/alvarovillena/Desktop/FILES/Vilo/Villelabs/Landings/Villelabs/screenshots"

PAGES = [
    {"name": "homepage", "path": "/index.html"},
    {"name": "services", "path": "/services.html"},
    {"name": "contact", "path": "/contact.html"},
    {"name": "diagnostic", "path": "/diagnostic.html"},
    {"name": "lp-ia-para-empresas", "path": "/lp/ia-para-empresas.html"},
    {"name": "lp-desarrollo-software", "path": "/lp/desarrollo-software.html"},
    {"name": "lp-programa-fidelizacion", "path": "/lp/programa-fidelizacion.html"},
]

VIEWPORTS = [
    {"name": "desktop", "width": 1920, "height": 1080},
    {"name": "mobile", "width": 375, "height": 812},
]


def capture_page(browser, page_info, viewport_info):
    """Capture a single page at a given viewport."""
    context = browser.new_context(
        viewport={"width": viewport_info["width"], "height": viewport_info["height"]},
        device_scale_factor=1,
    )
    page = context.new_page()
    url = f"{BASE_URL}{page_info['path']}"

    filename_above = f"{page_info['name']}_{viewport_info['name']}_above_fold.png"
    filename_full = f"{page_info['name']}_{viewport_info['name']}_full.png"

    try:
        resp = page.goto(url, wait_until="networkidle", timeout=15000)
        status = resp.status if resp else "no response"
        print(f"  [{viewport_info['name'].upper()}] {url} -> status {status}")

        # Check for redirect
        final_url = page.url
        if final_url != url and "localhost:3099" not in final_url:
            print(f"  [REDIRECT] Page redirected to: {final_url}")

        # Page metadata
        title = page.title()
        lang = page.evaluate("() => document.documentElement.lang")
        print(f"  Title: {title}")
        print(f"  Lang attribute: '{lang}'")

        # H1 elements
        h1_elements = page.query_selector_all("h1")
        h1_texts = [h.inner_text() for h in h1_elements[:5]]
        print(f"  H1 elements ({len(h1_elements)}): {h1_texts}")

        # H2 elements (section headings)
        h2_elements = page.query_selector_all("h2")
        h2_texts = [h.inner_text() for h in h2_elements[:8]]
        print(f"  H2 elements ({len(h2_elements)}): {h2_texts}")

        # Forms
        forms = page.query_selector_all("form")
        print(f"  Forms found: {len(forms)}")
        for i, form in enumerate(forms):
            inputs = form.query_selector_all("input, textarea, select")
            input_names = [inp.get_attribute("name") or inp.get_attribute("placeholder") or inp.get_attribute("type") for inp in inputs]
            print(f"    Form {i}: inputs={input_names}")

        # CTA buttons/links
        buttons = page.query_selector_all("button, a[href*='contact'], a[href*='whatsapp'], a[href*='wa.me']")
        btn_info = []
        for b in buttons[:10]:
            text = b.inner_text().strip()
            href = b.get_attribute("href") or ""
            if text:
                btn_info.append(f"'{text}' -> {href[:60]}")
        print(f"  CTAs/Buttons: {btn_info}")

        # Price-related content
        price_elements = page.query_selector_all("[class*='price'], [class*='Price']")
        price_texts = page.evaluate("""
            () => {
                const body = document.body.innerText;
                const prices = body.match(/\\$[\\d.,]+\\s*(USD|CLP|usd|clp)?/g);
                return prices ? prices.slice(0, 10) : [];
            }
        """)
        print(f"  Prices found in text: {price_texts}")

        # Background color check
        bg_color = page.evaluate("() => window.getComputedStyle(document.body).backgroundColor")
        print(f"  Body bg color: {bg_color}")

        # Mobile-specific checks
        if viewport_info["name"] == "mobile":
            has_hscroll = page.evaluate(
                "() => document.documentElement.scrollWidth > document.documentElement.clientWidth"
            )
            print(f"  Horizontal scroll overflow: {has_hscroll}")

            # Check touch target sizes (buttons)
            small_targets = page.evaluate("""
                () => {
                    const buttons = document.querySelectorAll('button, a');
                    let small = 0;
                    buttons.forEach(b => {
                        const rect = b.getBoundingClientRect();
                        if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
                            small++;
                        }
                    });
                    return small;
                }
            """)
            print(f"  Small touch targets (<44px): {small_targets}")

        # Above-the-fold screenshot
        page.screenshot(
            path=os.path.join(OUTPUT_DIR, filename_above),
            full_page=False,
        )
        print(f"  Saved: {filename_above}")

        # Full page screenshot
        page.screenshot(
            path=os.path.join(OUTPUT_DIR, filename_full),
            full_page=True,
        )
        print(f"  Saved: {filename_full}")

    except Exception as e:
        print(f"  [ERROR] {url}: {e}")

    context.close()


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for page_info in PAGES:
            print(f"\n{'='*70}")
            print(f"PAGE: {page_info['name']} ({page_info['path']})")
            print(f"{'='*70}")

            for viewport_info in VIEWPORTS:
                capture_page(browser, page_info, viewport_info)

        browser.close()

    print(f"\n{'='*70}")
    print(f"All screenshots saved to: {OUTPUT_DIR}")
    print(f"{'='*70}")


if __name__ == "__main__":
    main()
