class MHAdultCrisis extends HTMLElement {
  connectedCallback() {
    const passedId = this.getAttribute("section-id") || this.getAttribute("id");
    const sectionId =
      passedId && passedId.trim() ? passedId.trim() : "adult-crisis";

    // Ensure needed component styles are loaded (buttons, results)
    if (!document.querySelector('link[href="css/components/buttons.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/buttons.css";
      document.head.appendChild(link);
    }
    if (!document.querySelector('link[href="css/components/results.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/results.css";
      document.head.appendChild(link);
    }

    this.innerHTML = `
      <section id="${sectionId}" class="result hidden" role="region" aria-labelledby="${sectionId}-title">
        <h3 id="${sectionId}-title" data-i18n="adultCrisis.title">24時間の緊急オプション（成人）</h3>
        <div class="grid">
          <div>
            <h4 data-i18n="adultCrisis.copes.h">① 今すぐ電話/モバイル対応（COPES）</h4>
            <p class="subtitle" data-i18n="adultCrisis.copes.subtitle">タルサ郡の24時間電話相談と必要に応じたモバイル危機対応</p>
            <div class="cta">
              <a class="btn" href="tel:9187444800" data-i18n="adultCrisis.copes.callBtn">COPESに電話（918-744-4800）</a>
            </div>
            <div class="chips" aria-label="When this option is helpful">
              <span class="pill" data-i18n="adultCrisis.copes.pill1">🏠 家から出られない場合</span>
              <span class="pill" data-i18n="adultCrisis.copes.pill2">🚗 移動手段がない場合</span>
            </div>
          </div>
          <div>
            <h4 data-i18n="adultCrisis.urc.h">② 24時間ウォークイン（Grand Mental Health – URC）</h4>
            <p class="subtitle" data-i18n="adultCrisis.urc.subtitle">予約不要。現在の環境から離れて直接支援を受けたい場合に有効</p>
            <div class="cta">
              <a class="btn" href="https://www.grandmh.com/services-programs/urgent-recover-centers/" target="_blank" rel="noopener noreferrer" aria-disabled="true" data-i18n="adultCrisis.urc.visitBtn" data-i18n-attr="title:adultCrisis.urc.visitBtnTitle">URC を訪問（24h / 予約不要）</a>
              <a class="btn btn-outline" href="https://www.grandmh.com/locations/" target="_blank" rel="noopener noreferrer" data-i18n="adultCrisis.urc.locationsBtn">すべての場所を見る</a>
            </div>
            <div class="chips" aria-label="What you can expect">
              <span class="pill" data-i18n="adultCrisis.urc.pill1">👥 対面で相談できる</span>
              <span class="pill" data-i18n="adultCrisis.urc.pill2">⏰ いつでも利用可（24時間365日）</span>
            </div>
          </div>
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

customElements.define("mh-adult-crisis", MHAdultCrisis);
