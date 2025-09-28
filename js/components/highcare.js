class MHHighcare extends HTMLElement {
  connectedCallback() {
    // Resolve section id: prefer section-id attr, then id attr, then default
    const passedId = this.getAttribute("section-id") || this.getAttribute("id");
    const sectionId = passedId && passedId.trim() ? passedId.trim() : "highcare";

    if (!document.querySelector('link[href="css/components/highcare.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/highcare.css";
      document.head.appendChild(link);
    }

    this.innerHTML = `
      <section
        id="${sectionId}"
        class="result hidden emergency"
        role="region"
        aria-labelledby="${sectionId}-title"
      >
        <h3 id="${sectionId}-title" data-i18n="highcare.title">至急の医療評価を推奨</h3>
        <p data-i18n="highcare.body">
          選択された内容から、外来クリニックでは対応困難な可能性があります。以下のいずれかに<strong>至急</strong>ご連絡ください。
        </p>

        <div class="option-list">
          <article class="option-card tel" aria-labelledby="hc-copes-title">
            <div class="icon" aria-hidden="true">📞</div>
            <div class="content">
              <div id="hc-copes-title" class="title" data-i18n="emergency.copes">COPES 危機ライン</div>
              <p class="desc" data-i18n="emergency.copesExplain">
                <strong>COPES</strong>（Community Outreach Psychiatric Emergency Services）はタルサ地域の移動型危機対応チームです。専門スタッフが現場に駆けつけます。
              </p>
              <a
                class="btn btn-danger btn-flex"
                href="tel:+19187444800"
                data-i18n="highcare.copesBtn"
              >
                918-744-4800 に電話
              </a>
            </div>
          </article>

          <article class="option-card er" aria-labelledby="hc-er-title">
            <div class="icon" aria-hidden="true">🏥</div>
            <div class="content">
              <div id="hc-er-title" class="title" data-i18n="highcare.er">病院の救急外来（ER）を受診</div>
              <p class="desc" data-i18n="highcare.erDesc">直接の対面診療を希望する場合は、お近くの救急外来へ向かってください。</p>
              <a
                class="btn btn-outline btn-flex"
                href="https://www.google.com/maps/search/emergency+room+near+me"
                target="_blank"
                rel="noopener"
                data-i18n="highcare.findEr"
              >
                近くのERを探す
              </a>
            </div>
          </article>
        </div>

        <div class="divider"></div>
        <button class="btn btn-outline" data-reset data-i18n="reset">最初の質問に戻る</button>
      </section>
    `;

    // Expose the resolved section id to the host for consumers
    this.setAttribute("data-section-id", sectionId);
    // Avoid duplicate IDs in the DOM if id was provided on host
    if (this.hasAttribute("id") && this.getAttribute("id") === sectionId) {
      this.removeAttribute("id");
    }
  }
}

customElements.define("mh-highcare", MHHighcare);
