class MHBanner extends HTMLElement {
  connectedCallback() {
    // Inject component-local styles if not already present
    if (!document.getElementById("mh-banner-inline-style")) {
      const style = document.createElement("style");
      style.id = "mh-banner-inline-style";
      style.textContent = `
        :root{
          --em-surface:#1f2937;
          --em-border:#334155;
          --em-text:#e5e7eb;
          --em-muted:#94a3b8;
          --em-accent:#f59e0b;
          --em-danger:#ef4444;
        }
        .emergency{
          background:var(--em-surface);
          color:var(--em-text);
          border:1px solid var(--em-border);
          border-radius:14px;
          overflow:hidden;
          margin:8px 12px;
        }
        .emergency summary{
          list-style:none;
          display:flex;align-items:center;gap:.5rem;
          padding:.6rem .75rem;
          font-size:.95rem;cursor:pointer;
        }
        .emergency summary::-webkit-details-marker{display:none}
        .em-icon{font-size:1rem}
        .em-inline{opacity:.9}
        .em-more{margin-left:auto;font-size:.85rem;color:var(--em-accent);text-decoration:underline}
        .em-body{padding:.75rem;border-top:1px dashed var(--em-border)}
        .em-lead{margin:.25rem 0 .5rem;color:var(--em-muted);font-size:.9rem}
        .em-actions{display:flex;gap:.5rem;flex-wrap:wrap}
        .em-btn{
          display:inline-block;padding:.5rem .9rem;
          border-radius:999px;border:1px solid transparent;
          font-weight:600;font-size:.95rem;text-decoration:none;
        }
        .em-btn.call{background:var(--em-danger);color:#fff}
        .em-btn.text{background:transparent;color:var(--em-text);border-color:var(--em-border)}
        .em-note{margin:.5rem 0 0;font-size:.8rem;color:var(--em-muted)}
        @media(max-width:420px){
          .emergency summary{padding:.5rem .6rem;font-size:.9rem}
          .em-btn{padding:.45rem .8rem;font-size:.9rem}
        }
      `;
      document.head.appendChild(style);
    }

    this.innerHTML = `
      <details class="emergency">
        <summary data-i18n-attr="aria-label:banner.label">
          <span class="em-icon" aria-hidden="true">⚠️</span>
          <strong data-i18n="banner.urgent">緊急？</strong>
          <span class="em-inline" data-i18n="banner.emergencyPrefix">
            医療的な緊急事態または差し迫った危険がある場合は
            <span class=\"phone\">911</span> に電話してください。
          </span>
          <span
            class="em-more"
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

    // Toggle "more" text open/closed using i18n-provided values
    const details = this.querySelector("details");
    const more = this.querySelector(".em-more");
    if (details && more) {
      const showText = more.getAttribute("data-show") || more.textContent;
      const hideText = more.getAttribute("data-hide") || more.textContent;
      const update = () => {
        more.textContent = details.open ? hideText : showText;
      };
      update();
      details.addEventListener("toggle", update);
    }
  }
}

customElements.define("mh-banner", MHBanner);
