class MHBanner extends HTMLElement {
  connectedCallback() {
    // Add banner.css stylesheet if not already present
    if (!document.querySelector('link[href="css/components/banner.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/banner.css";
      document.head.appendChild(link);
    }
    this.innerHTML = `
      <div
        class="banner"
        role="region"
        data-i18n-attr="aria-label:banner.label"
      >
        <div class="icon" aria-hidden="true">!</div>

        <div class="banner-grid">
          <div class="primary">
            <strong data-i18n="banner.urgent"></strong>
            <span data-i18n="banner.emergencyPrefix">
              もしこれが<mark>医療的な緊急事態</mark>であるか、あなた自身または他者に差し迫った危険がある場合は、
              <span class="phone">911</span>に電話してください。
            </span>
          </div>

          <div class="actions" aria-label="988 actions">
            <span class="crisis-label" data-i18n="banner.mentalCrisisLabel">
              メンタルヘルスの危機にある場合は：
            </span>
            <div class="btn-row">
              <a
                class="btn btn-danger btn-flex"
                href="tel:988"
                data-i18n-attr="aria-label:banner.call988Aria"
                data-i18n="banner.call988"
              >
                今すぐ988に電話
              </a>
              <a
                class="btn btn-outline btn-flex"
                href="sms:988"
                data-i18n-attr="aria-label:banner.text988Aria"
                data-i18n="banner.text988"
              >
                今すぐ988にテキスト
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("mh-banner", MHBanner);
