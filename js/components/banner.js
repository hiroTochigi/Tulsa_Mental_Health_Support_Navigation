class MHBanner extends HTMLElement {
  connectedCallback() {
    // Ensure banner stylesheet is loaded
    if (!document.querySelector('link[href="css/components/banner.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/banner.css";
      document.head.appendChild(link);
    }

    // Render accordion-style emergency banner (matches newbanner.js structure)
    this.innerHTML = `
      <details class="emergency">
        <summary data-i18n-attr="aria-label:banner.label">
          <span class="em-icon" aria-hidden="true">⚠️</span>
          <strong data-i18n="banner.urgent">緊急？</strong>
          <span class="em-inline">
            <span class="em-full" data-i18n="banner.emergencyPrefix">
              医療的な緊急事態または差し迫った危険がある場合は
              <span class=\"phone\">911</span> に電話してください。
            </span>
            <span class="em-short" data-i18n="banner.emergencyPrefixShort" aria-hidden="true">
              緊急時は <span class=\"phone\">911</span>
            </span>
          </span>
          <span
            class="em-more em-more-full"
            aria-hidden="true"
            data-i18n="banner.moreShow"
            data-i18n-attr="data-show:banner.moreShow, data-hide:banner.moreHide"
          >988を表示</span>
        </summary>
        <div class="em-body">
          <p class="em-lead" data-i18n="banner.mentalCrisisLabel">
            メンタルヘルスの危機にある場合：
          </p>
          <div class="em-actions" aria-label="988 actions">
            <a
              class="em-btn call"
              href="tel:988"
              data-i18n-attr="aria-label:banner.call988Aria"
              data-i18n="banner.call988"
            >
              今すぐ988に電話
            </a>
            <a
              class="em-btn text"
              href="sms:988"
              data-i18n-attr="aria-label:banner.text988Aria"
              data-i18n="banner.text988"
            >
              今すぐ988にテキスト
            </a>
          </div>
          <p class="em-note" data-i18n="banner.note">24/7・無料・秘密厳守</p>
        </div>
      </details>
    `;

    // Toggle the "more" label based on details open/closed state
    const details = this.querySelector("details");
    const moreEls = this.querySelectorAll(
      ".em-more, .em-more-full, .em-more-short"
    );
    if (details && moreEls.length) {
      const update = () => {
        moreEls.forEach((el) => {
          const showText = el.getAttribute("data-show") || el.textContent;
          const hideText = el.getAttribute("data-hide") || el.textContent;
          el.textContent = details.open ? hideText : showText;
        });
      };
      update();
      details.addEventListener("toggle", update);
    }

    // TEMP: show viewport width badge for breakpoint decisions
    this.#ensureViewportWidthBadge();
  }

  // Create a small floating badge that shows current window width
  #ensureViewportWidthBadge() {
    const BADGE_ID = "viewport-width-badge";
    let badge = document.getElementById(BADGE_ID);
    const update = () => {
      if (!badge) return;
      badge.textContent = `vw: ${window.innerWidth}px`;
    };

    if (!badge) {
      badge = document.createElement("div");
      badge.id = BADGE_ID;
      badge.setAttribute("aria-hidden", "true");
      Object.assign(badge.style, {
        position: "fixed",
        right: "8px",
        bottom: "8px",
        zIndex: 9999,
        background: "rgba(0,0,0,.7)",
        color: "#fff",
        padding: "4px 8px",
        borderRadius: "6px",
        font: "12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        boxShadow: "0 2px 8px rgba(0,0,0,.25)",
        pointerEvents: "none",
      });
      document.body.appendChild(badge);

      // Attach a single global resize listener if not present
      if (!window.__vwBadgeAttached) {
        window.addEventListener("resize", update);
        window.__vwBadgeAttached = true;
      }
    }
    update();
  }
}

// Avoid re-defining if another script already registered the same element
if (!customElements.get("mh-banner")) {
  customElements.define("mh-banner", MHBanner);
}
