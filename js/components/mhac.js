class MHMhac extends HTMLElement {
  connectedCallback() {
    const passedId = this.getAttribute("section-id") || this.getAttribute("id");
    const sectionId = passedId && passedId.trim() ? passedId.trim() : "mhac";

    // Ensure agency styles are present (for card look)
    if (!document.querySelector('link[href="css/components/agency.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/agency.css";
      document.head.appendChild(link);
    }

    this.innerHTML = `
      <section id="${sectionId}" class="step hidden" aria-labelledby="${sectionId}-title">
        <style>
          #${sectionId} .card header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
          #${sectionId} .card header .left { display: flex; align-items: center; gap: 10px; }
          #${sectionId} .explainer { margin: 0 0 12px 0; }
          #${sectionId} .actions > .btn { flex: 1 1 100%; }
          @media (min-width: 640px) { #${sectionId} .actions > .btn { flex: 0 0 auto; } }
          #${sectionId} .card--mhac { border-color: #3182ce; }
        </style>
        <h2
          id="${sectionId}-title"
          class="title"
          style="font-size: 20px; margin: 0 0 6px"
          data-i18n="mhac.title"
        >
          どこに相談すればよいか分からない方へ
        </h2>
        <p class="subtitle" data-i18n="mhac.body">
          メンタルヘルス・アシスタンス・センター（MHAOK）は、あなたに最適な支援先を一緒に探し、制度や窓口の案内を無料で行う相談窓口です。<br />
          どこに連絡すればよいか迷った場合は、まずこちらにご相談ください。
        </p>
        <div
          class="card card--agency card--mhac"
          data-agency="mhac"
          data-phone="918-585-1213"
          role="group"
          aria-labelledby="${sectionId}-title"
        >
          <header>
            <div class="left">
              <h4 data-i18n="routine.mhac.full">
                Mental Health Assistance Center
              </h4>
            </div>
            <div class="tags">
              <span class="pill" data-i18n="routine.mhac.pill.free"
                >無料の紹介窓口</span
              >
              <span class="pill" data-i18n="routine.mhac.pill.personal"
                >個別サポート</span
              >
              <span class="pill" data-i18n="routine.mhac.pill.navigation"
                >制度ナビゲーション</span
              >
            </div>
          </header>
          <p class="explainer" data-i18n="routine.mhac.desc">
            無料のリファーラル専用窓口。個別に最適な紹介先探しをお手伝いし、メンタルヘルスの制度・窓口の案内を行います。
          </p>
          <div class="actions">
            <a
              class="btn call-btn"
              href="tel:+19185851213"
              data-i18n="routine.mhac.callBtn"
              >918-585-1213 に電話する</a
            >
            <a
              class="btn btn-outline call-btn"
              href="tel:+14059433700"
              data-i18n="routine.mhac.callBtnOKC"
              >OKC（405-943-3700）に電話する</a
            >
            <a
              class="btn btn-outline site-btn"
              href="https://mhaok.org/about/mental-health-assistance-center-form/"
              target="_blank"
              rel="noopener"
              data-i18n="routine.siteBtn"
              >ウェブサイト</a
            >
          </div>
        </div>
        <div class="divider"></div>
        <button class="btn btn-outline" data-reset data-i18n="reset">
          最初の質問に戻る
        </button>
      </section>
    `;

    this.setAttribute("data-section-id", sectionId);
    if (this.hasAttribute("id") && this.getAttribute("id") === sectionId) {
      this.removeAttribute("id");
    }
  }
}

customElements.define("mh-mhac", MHMhac);
