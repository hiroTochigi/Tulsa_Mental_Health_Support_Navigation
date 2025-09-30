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
        <h3 id="${sectionId}-title" data-i18n="routine.title">通常の外来サービスにつながる（成人）</h3>

        <p data-i18n="routine.body">
          以下の機関は、カウンセリング、薬物療法管理、SUDサポートなどの定型外来を提供しています。
        </p>

        <div class="agency-list">
          <!-- CRS -->
          <article class="agency-card" data-agency="crs" data-site="" data-apply="">
            <header class="agency-head">
              <div class="agency-title">
                <span class="name" data-i18n="routine.crs.full">Counseling & Recovery Services</span>
              </div>
              <div class="tags">
                <span class="pill" data-i18n="routine.crs.pill.uninsured">未保険者OK</span>
                <span class="pill" data-i18n="routine.crs.pill.sliding">スライディングスケール</span>
              </div>
            </header>
            <p class="desc" data-i18n="routine.crs.desc">オクラホマ州タルサを拠点とする非営利機関。精神健康ケア、カウンセリング、薬物依存治療、危機対応サービスを提供します。</p>
            <div class="actions">
              <a class="btn call-btn" href="#" data-i18n="routine.callBtn">電話する</a>
              <a class="btn btn-outline site-btn" href="#" target="_blank" rel="noopener" data-i18n="routine.siteBtn">ウェブサイト</a>
              <a class="btn btn-outline apply-btn" href="#" target="_blank" rel="noopener" data-i18n="routine.applyBtn">オンライン申込</a>
            </div>
          </article>

          <!-- FCS -->
          <article class="agency-card" data-agency="fcs" data-phone="918-587-9471">
            <header class="agency-head">
              <div class="agency-title">
                <span class="name" data-i18n="routine.fcs.full">Family & Children’s Services</span>
              </div>
              <div class="tags">
                <span class="pill" data-i18n="routine.fcs.pill.sliding">スライディングスケール</span>
              </div>
            </header>
            <p class="desc" data-i18n="routine.fcs.desc">タルサ地域の包括的な子ども・家族支援センター。危機安定化、統合的ヘルスケア、相談・治療サービスを実施しています。</p>
            <div class="actions">
              <a class="btn call-btn" href="#" data-i18n="routine.callBtn">電話する</a>
              <a class="btn btn-outline site-btn" href="#" target="_blank" rel="noopener" data-i18n="routine.siteBtn">ウェブサイト</a>
              <a class="btn btn-outline apply-btn" href="#" target="_blank" rel="noopener" data-i18n="routine.applyBtn">オンライン申込</a>
            </div>
          </article>

          <!-- CHC -->
          <article class="agency-card" data-agency="chc" data-phone="918-622-0641">
            <header class="agency-head">
              <div class="agency-title">
                <span class="name" data-i18n="routine.chc.full">Community Health Connection</span>
              </div>
              <div class="tags">
                <span class="pill" data-i18n="routine.chc.pill.pc">プライマリケア統合</span>
                <span class="pill" data-i18n="routine.chc.pill.sliding">スライディングスケール</span>
              </div>
            </header>
            <p class="desc" data-i18n="routine.chc.desc">連邦認定のコミュニティ健康センター（FQHC）。医療、歯科、行動健康、薬局サービスを提供し、保険未加入者にはスライディングスケールの支払制度があります。</p>
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

