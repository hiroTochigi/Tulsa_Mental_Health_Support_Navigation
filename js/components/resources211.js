class MHResources211 extends HTMLElement {
  connectedCallback() {
    const passedId = this.getAttribute("section-id") || this.getAttribute("id");
    const sectionId =
      passedId && passedId.trim() ? passedId.trim() : "resources211";

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
          #${sectionId} .card { padding: 16px; border-radius: 12px; border: 1px solid var(--border, #223049); box-shadow: 0 1px 4px rgba(0,0,0,.12); margin-block: 24px; background: transparent; }
          #${sectionId} .card header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
          #${sectionId} .card header .left { display: flex; align-items: center; gap: 10px; }
          #${sectionId} .explainer { margin: 0 0 12px 0; }
          #${sectionId} .actions { display: flex; gap: 12px; flex-wrap: wrap; }
          #${sectionId} .actions > .btn { flex: 1 1 100%; }
          @media (min-width: 640px) { #${sectionId} .actions > .btn { flex: 0 0 auto; } }
          #${sectionId} .card--211 { border-color: #0f766e; }
          #${sectionId} .examples { margin: 0 0 12px 18px; }
        </style>
        <h2
          id="${sectionId}-title"
          class="title"
          style="font-size: 20px; margin: 0 0 6px"
          data-i18n="resources211.title"
        >
          2-1-1 Oklahoma / 地域福祉リソース・ナビゲーション
        </h2>
        <p class="subtitle" data-i18n="resources211.body">
          24時間365日、専門のオペレーターがあなたの状況に合わせた地域の公的・民間リソースを無料で紹介します。メンタルヘルスだけでなく、生活の基盤を整えるためのあらゆる相談が可能です。
        </p>
        <div
          class="card card--agency card--211"
          data-agency="211"
          data-phone="211"
          role="group"
          aria-labelledby="${sectionId}-title"
        >
          <header>
            <div class="left">
              <h4 data-i18n="resources211.name">2-1-1 Oklahoma</h4>
            </div>
            <div class="tags">
              <span class="pill" data-i18n="resources211.pill.247">24時間対応</span>
              <span class="pill" data-i18n="resources211.pill.free">無料相談</span>
              <span class="pill" data-i18n="resources211.pill.lang">多言語対応</span>
            </div>
          </header>
          <p class="explainer" data-i18n="resources211.desc">
            生活支援から医療・住居まで、地域の福祉サービスの案内と相談が可能です。
          </p>
          <div class="explainer" data-i18n="resources211.examplesTitle">
            相談できる内容の例:
          </div>
          <ul class="examples">
            <li data-i18n="resources211.examples1">
              生活支援: 食料支援（フードバンク）、家賃や光熱費の支払い支援。
            </li>
            <li data-i18n="resources211.examples2">
              住居: シェルターや手頃な価格の住宅探し。
            </li>
            <li data-i18n="resources211.examples3">
              健康・医療: 保険の相談、無料・低額診療所の案内。
            </li>
            <li data-i18n="resources211.examples4">
              その他: 育児支援、高齢者サポート、法的支援など。
            </li>
          </ul>
          <div class="actions">
            <a
              class="btn call-btn"
              href="tel:211"
              data-i18n="resources211.callBtn"
              >Call 2-1-1</a
            >
            <a
              class="btn btn-outline site-btn"
              href="https://211eok.org/"
              target="_blank"
              rel="noopener"
              data-i18n="resources211.siteBtn"
              >Website</a
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

customElements.define("mh-211", MHResources211);
