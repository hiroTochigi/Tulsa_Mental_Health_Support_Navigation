class MHYouth extends HTMLElement {
  connectedCallback() {
    // Resolve section id. Default to 'youth'
    const passedId = this.getAttribute("section-id") || this.getAttribute("id");
    const sectionId = passedId && passedId.trim() ? passedId.trim() : "youth";

    // Ensure card styles are present (reuse highcare.css option card styles)
    if (!document.querySelector('link[href="css/components/highcare.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/highcare.css";
      document.head.appendChild(link);
    }

    this.innerHTML = `
      <section
        id="${sectionId}"
        class="result"
        role="region"
        aria-labelledby="${sectionId}-title"
      >
        <style>
          /* Scope spacing tweaks to this section only */
          #${sectionId} .option-card .title { margin: 4px 0 10px; line-height: 1.2; }
          #${sectionId} .option-card .pill-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 4px 0 12px; }
          #${sectionId} .option-card .desc { margin: 6px 0 16px; }
          #${sectionId} .option-card .btn-row { margin-top: 6px; gap: 10px; }
        </style>
        <h3 id="${sectionId}-title" data-i18n="youth.title">若年層向けの24時間支援</h3>

        <div class="option-list">
          <!-- YES Tulsa -->
          <article class="option-card tel" aria-labelledby="yes-title">
            <div class="icon" aria-hidden="true">👧</div>
            <div class="content">
              <!-- Short name in title -->
              <div id="yes-title" class="title" data-i18n="youth.yesTulsaName">YES Tulsa</div>

              <!-- Pills for metadata -->
              <div class="pill-row">
                <span class="pill" data-i18n="youth.ages5to17">5～17歳</span>
                <span class="pill" data-i18n="youth.available247">24時間</span>
              </div>

              <p class="desc" data-i18n="youth.yesTulsaDesc">青少年向けの危機対応と支援。24時間いつでも相談できます。</p>

              <div class="btn-row">
                <a
                  class="btn btn-outline btn-flex"
                  href="tel:+19187794357"
                  data-i18n="youth.yesTulsaBtn"
                  data-i18n-attr="aria-label:youth.yesTulsaCallAria"
                >
                  918-779-HELP <span class="sr-only">(918-779-4357)</span>
                </a>
                <a
                  class="btn btn-outline site-btn"
                  href="https://crsok.org/yestulsa/"
                  target="_blank"
                  rel="noopener"
                  data-i18n="routine.siteBtn"
                >
                  Website
                </a>
              </div>
            </div>
          </article>

          <!-- CALM Center -->
          <article class="option-card tel" aria-labelledby="calm-title">
            <div class="icon" aria-hidden="true">🏥</div>
            <div class="content">
              <!-- Keep title short to prevent wrapping -->
              <div id="calm-title" class="title" data-i18n="youth.calmName">CALM Center</div>

              <!-- Pills capture the long info that used to be in the title -->
              <div class="pill-row">
                <span class="pill" data-i18n="youth.ages10to17">10～17歳</span>
                <span class="pill" data-i18n="youth.shortTermInpatient">短期入院</span>
                <span class="pill" data-i18n="youth.crisisStabilization">危機安定化</span>
              </div>

              <p class="desc" data-i18n="youth.calmDesc">危機的な状況の青少年に短期入院や安定化サービスを提供します。</p>

              <div class="btn-row">
                <a
                  class="btn btn-outline btn-flex"
                  href="tel:+19183942256"
                  data-i18n="youth.calmBtn"
                  data-i18n-attr="aria-label:youth.calmCallAria"
                >
                  918-394-2256
                </a>
                <a
                  class="btn btn-outline site-btn"
                  href="https://crsok.org/the-calm-center/"
                  target="_blank"
                  rel="noopener"
                  data-i18n="routine.siteBtn"
                >
                  Website
                </a>
              </div>
            </div>
          </article>
        </div>

        <p class="note" data-i18n="youth.note">
          未成年の方は、成人外来ではなく上記の専門支援に直接つながるのが適切です。
        </p>

        <div class="divider"></div>
        <button class="btn btn-outline" data-reset data-i18n="reset">最初の質問に戻る</button>
      </section>
    `;

    // Expose resolved section id and avoid duplicate host ID
    this.setAttribute("data-section-id", sectionId);
    if (this.hasAttribute("id") && this.getAttribute("id") === sectionId) {
      this.removeAttribute("id");
    }
  }
}

customElements.define("mh-youth", MHYouth);
