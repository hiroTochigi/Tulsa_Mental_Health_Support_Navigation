class MHEmergency extends HTMLElement {
  connectedCallback() {
    const passedId = this.getAttribute("section-id") || this.getAttribute("id");
    const sectionId = passedId && passedId.trim() ? passedId.trim() : "emergency";

    this.innerHTML = `
      <section
        id="${sectionId}"
        class="result emergency hidden"
        role="alert"
        aria-live="assertive"
        aria-labelledby="${sectionId}-title"
      >
        <h3 id="${sectionId}-title" data-i18n="emergency.title"></h3>
        <ul>
          <li>
            <span class="label" data-i18n="emergency.lifeThreatLabel"></span>
            <div class="actions">
              <a class="btn btn-danger" href="tel:911" data-i18n="emergency.call911">
                911 に電話（警察・消防・救急）
              </a>
            </div>
          </li>
          <li>
            <span class="label crisis-label" data-i18n="banner.mentalCrisisLabel"></span>
            <p class="crisis-explainer" data-i18n="emergency.crisisExplainer"></p>
            <div class="actions">
              <a class="btn btn-danger" href="tel:988" data-i18n="emergency.call988Explained"></a>
              <a class="btn btn-outline" href="sms:988" data-i18n="emergency.text988Explained"></a>
            </div>
          </li>
          <li>
            <span class="label" data-i18n="emergency.tulsaSupportLabel"></span>
            <p class="explain" data-i18n="emergency.copesExplain"></p>
            <div class="actions">
              <a class="btn btn-outline" href="tel:+19187444800" data-i18n="emergency.copesNumberBtn">
                COPES に電話（918-744-4800）
              </a>
            </div>
          </li>
        </ul>
        <p class="footer" data-i18n="emergency.footer"></p>
        <div class="divider"></div>
        <button class="btn btn-outline" data-reset data-i18n="reset"></button>
      </section>
    `;

    this.setAttribute("data-section-id", sectionId);
    if (this.hasAttribute("id") && this.getAttribute("id") === sectionId) {
      this.removeAttribute("id");
    }
  }
}

customElements.define("mh-emergency", MHEmergency);

