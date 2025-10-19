class MHRoutine extends HTMLElement {
  connectedCallback() {
    const passedId = this.getAttribute("section-id") || this.getAttribute("id");
    const sectionId = passedId && passedId.trim() ? passedId.trim() : "routine";

    // Ensure agency styles are present
    if (!document.querySelector('link[href="css/components/agency.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/agency.css";
      document.head.appendChild(link);
    }

    this.innerHTML = `
      <section id="${sectionId}" class="result" role="region" aria-labelledby="${sectionId}-title">
        <style>
          #${sectionId} .agency-list { display: block; }
          #${sectionId} .card { padding: 16px; border-radius: 12px; border: 1px solid var(--border, #223049); box-shadow: 0 1px 4px rgba(0,0,0,.12); margin-block: 24px; background: transparent; }
          #${sectionId} .card header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
          #${sectionId} .card header .left { display: flex; align-items: center; gap: 10px; }
          #${sectionId} .icon { width: 24px; height: 24px; flex: 0 0 24px; }
          #${sectionId} .explainer { margin: 0 0 12px 0; }
          #${sectionId} .actions { display: flex; gap: 12px; flex-wrap: wrap; }
          #${sectionId} .actions > .btn { flex: 1 1 100%; }
          @media (min-width: 640px) { #${sectionId} .actions > .btn { flex: 0 0 auto; } }
          /* optional light accents */
          #${sectionId} .card--crs { border-color: #2b6cb0; }
          #${sectionId} .card--fcs { border-color: #9b2c2c; }
          #${sectionId} .card--chc { border-color: #2f855a; }
        </style>
        <h3 id="${sectionId}-title" data-i18n="routine.title">通常の外来サービスにつながる（成人）</h3>

        <p data-i18n="routine.body">
          以下の機関は、カウンセリング、薬物療法管理、SUDサポートなどの定型外来を提供しています。
        </p>

        <div class="agency-list">
          <!-- CRS -->
          <article class="card card--agency card--crs" data-agency="crs" data-site="" data-apply="" role="group" aria-labelledby="${sectionId}-crs-title">
            <header>
              <div class="left">
                <svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  <path d="M3.5 9.5l4 0 2 4 2-6 2 6 1-2h6"/>
                </svg>
                <h4 id="${sectionId}-crs-title" data-i18n="routine.crs.full">Counseling & Recovery Services</h4>
              </div>
              <div class="tags">
                <span class="pill" data-i18n="routine.crs.pill.uninsured">未保険者OK</span>
                <span class="pill" data-i18n="routine.crs.pill.sliding">スライディングスケール</span>
              </div>
            </header>
            <p class="explainer" data-i18n="routine.crs.desc">オクラホマ州タルサを拠点とする非営利機関。精神健康ケア、カウンセリング、薬物依存治療、危機対応サービスを提供します。</p>
            <div class="actions">
              <a class="btn call-btn" href="#" data-i18n="routine.callBtn">電話する</a>
              <a class="btn btn-outline site-btn" href="https://crsok.org/adult-services" target="_blank" rel="noopener" data-i18n="routine.siteBtn">ウェブサイト</a>
              <a class="btn btn-outline apply-btn" href="https://crsok.org/contact-us/" target="_blank" rel="noopener" data-i18n="routine.applyBtn">オンライン申込</a>
            </div>
          </article>

          <!-- FCS -->
          <article class="card card--agency card--fcs" data-agency="fcs" data-phone="918-587-9471" role="group" aria-labelledby="${sectionId}-fcs-title">
            <header>
              <div class="left">
                <svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <h4 id="${sectionId}-fcs-title" data-i18n="routine.fcs.full">Family & Children’s Services</h4>
              </div>
              <div class="tags">
                <span class="pill" data-i18n="routine.fcs.pill.sliding">スライディングスケール</span>
              </div>
            </header>
            <p class="explainer" data-i18n="routine.fcs.desc">タルサ地域の包括的な子ども・家族支援センター。危機安定化、統合的ヘルスケア、相談・治療サービスを実施しています。</p>
            <div class="actions">
              <a class="btn call-btn" href="#" data-i18n="routine.callBtn">電話する</a>
              <a class="btn btn-outline site-btn" href="#" target="_blank" rel="noopener" data-i18n="routine.siteBtn">ウェブサイト</a>
              <a class="btn btn-outline apply-btn" href="#" target="_blank" rel="noopener" data-i18n="routine.applyBtn">オンライン申込</a>
            </div>
          </article>

          <!-- CHC -->
          <article class="card card--agency card--chc" data-agency="chc" data-phone="918-622-0641" role="group" aria-labelledby="${sectionId}-chc-title">
            <header>
              <div class="left">
                <svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="7" width="18" height="14" rx="2"/>
                  <path d="M12 3v8"/>
                  <path d="M8 7h8"/>
                  <path d="M10 13h4"/>
                </svg>
                <h4 id="${sectionId}-chc-title" data-i18n="routine.chc.full">Community Health Connection</h4>
              </div>
              <div class="tags">
                <span class="pill" data-i18n="routine.chc.pill.pc">プライマリケア統合</span>
                <span class="pill" data-i18n="routine.chc.pill.sliding">スライディングスケール</span>
              </div>
            </header>
            <p class="explainer" data-i18n="routine.chc.desc">連邦認定のコミュニティ健康センター（FQHC）。医療、歯科、行動健康、薬局サービスを提供し、保険未加入者にはスライディングスケールの支払制度があります。</p>
            <div class="actions">
              <a class="btn call-btn" href="#" data-i18n="routine.callBtn">電話する</a>
              <a class="btn btn-outline site-btn" href="#" target="_blank" rel="noopener" data-i18n="routine.siteBtn">ウェブサイト</a>
              <a class="btn btn-outline apply-btn" href="#" target="_blank" rel="noopener" data-i18n="routine.applyBtn">オンライン申込</a>
            </div>
          </article>
        </div>

        <div class="divider"></div>
        <button class="btn btn-outline" data-reset data-i18n="reset">最初の質問に戻る</button>
      </section>
    `;

    this.setAttribute("data-section-id", sectionId);
    if (this.hasAttribute("id") && this.getAttribute("id") === sectionId) {
      this.removeAttribute("id");
    }
  }
}

customElements.define("mh-routine", MHRoutine);
