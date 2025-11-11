class MHEmergency extends HTMLElement {
  connectedCallback() {
    const passedId = this.getAttribute("section-id") || this.getAttribute("id");
    const sectionId =
      passedId && passedId.trim() ? passedId.trim() : "emergency";

    this.innerHTML = `
      <section
        id="${sectionId}"
        class="result emergency hidden"
        role="alert"
        aria-live="assertive"
        aria-labelledby="${sectionId}-title"
      >
        <style>
          /* Scope styles to this section to avoid bleed */

          /* General Card Styles */
          #${sectionId} .card {
            padding: 16px;
            border-radius: 12px;
            border: 1px solid #223049;
            box-shadow: 0 1px 4px rgba(0,0,0,.12);
            margin-block: 24px;
            background: transparent;
          }
          #${sectionId} .card header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
          }
          #${sectionId} .card .icon {
            width: 24px;
            height: 24px;
            flex: 0 0 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          #${sectionId} .card h4 {
            margin: 0;
            font-size: 1.05rem;
          }
          #${sectionId} .card .explainer {
            margin: 6px 0 12px;
          }

          /* Accent Variants */
          #${sectionId} .card--emergency {
            border-left: 4px solid #e02424;
          }
          #${sectionId} .card--emergency .icon {
            color: #e02424;
          }

          #${sectionId} .card--crisis {
            border-left: 4px solid #dc2626;
          }
          #${sectionId} .card--crisis .icon {
            color: #dc2626;
          }

          #${sectionId} .card--local {
            border-left: 4px solid #b91c1c;
          }
          #${sectionId} .card--local .icon {
            color: #b91c1c;
          }

          #${sectionId} .card--211 {
            border-left: 4px solid #ef4444;
          }
          #${sectionId} .card--211 .icon {
            color: #ef4444;
          }

          /* Button Styles */
          #${sectionId} .btn-primary {
            background: #dc2626;
            border-color: #dc2626;
            color: #fff;
          }
          #${sectionId} .btn-primary:hover {
            filter: brightness(1.05);
          }

          #${sectionId} .btn-support {
            background: #b91c1c;
            border-color: #b91c1c;
            color: #fff;
          }
          #${sectionId} .btn-support:hover {
            filter: brightness(1.05);
          }

          #${sectionId} .card--crisis .btn-outline {
            color: #dc2626;
            border-color: #dc2626;
          }
          #${sectionId} .card--crisis .btn-outline:hover {
            background: rgba(220, 38, 38, 0.08);
          }

          #${sectionId} .card--local .btn-outline {
            color: #b91c1c;
            border-color: #b91c1c;
          }
          #${sectionId} .card--local .btn-outline:hover {
            background: rgba(185, 28, 28, 0.08);
          }

          #${sectionId} .card--211 .btn:not(.btn-outline) {
            background: #ef4444;
            border-color: #ef4444;
            color: #fff;
          }
          #${sectionId} .card--211 .btn:not(.btn-outline):hover {
            filter: brightness(1.05);
          }
          #${sectionId} .card--211 .btn-outline {
            color: #ef4444;
            border-color: #ef4444;
          }
          #${sectionId} .card--211 .btn-outline:hover {
            background: rgba(239, 68, 68, 0.08);
          }

          /* Actions Layout */
          #${sectionId} .actions {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
          }
          #${sectionId} .actions > .btn {
            flex: 1 1 100%;
          }
          @media (min-width: 640px) {
            #${sectionId} .actions > .btn {
              flex: 0 0 auto;
            }
          }

          /* Utility Classes */
          #${sectionId} .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0,0,0,0);
            white-space: nowrap;
            border: 0;
          }
        </style>
        <h3 id="${sectionId}-title" data-i18n="emergency.title"></h3>
        
        <!-- Card A: 911 Life-threatening emergency -->
        <article class="card card--emergency" role="group" aria-labelledby="${sectionId}-911-heading">
          <header>
            <span class="icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
            <h4 id="${sectionId}-911-heading" data-i18n="emergency.lifeThreatLabel"></h4>
          </header>
          <div class="actions">
            <a class="btn btn-danger" href="tel:911" data-i18n="emergency.call911">
              911 に電話（警察・消防・救急）
            </a>
          </div>
        </article>

        <!-- Card B: 988 Mental health crisis -->
        <article class="card card--crisis" role="group" aria-labelledby="${sectionId}-988-heading">
          <header>
            <span class="icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
                <path d="M15.5 12.5a3.5 3.5 0 0 1-7 0"/>
                <path d="M17 7h.01"/>
                <path d="M7 7h.01"/>
              </svg>
            </span>
            <h4 id="${sectionId}-988-heading" data-i18n="banner.mentalCrisisLabel"></h4>
          </header>
          <p class="explainer" data-i18n="emergency.crisisExplainer"></p>
          <div class="actions">
            <a class="btn btn-primary" href="tel:988" data-i18n="emergency.call988Explained"></a>
            <a class="btn btn-outline" href="sms:988" data-i18n="emergency.text988Explained"></a>
          </div>
        </article>

        <!-- Card B2: 2-1-1 Eastern Oklahoma (information & referral) -->
        <article class="card card--211" role="group" aria-labelledby="${sectionId}-211-heading">
          <header>
            <span class="icon" aria-hidden="true">
              <!-- Headset/help icon -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                <path d="M12 3a7 7 0 0 0-7 7v3"/>
                <path d="M12 3a7 7 0 0 1 7 7v3"/>
                <path d="M4 13v3a2 2 0 0 0 2 2h1"/>
                <path d="M20 13v3a2 2 0 0 1-2 2h-1"/>
              </svg>
            </span>
            <h4 id="${sectionId}-211-heading" data-i18n="emergency.211Label"></h4>
          </header>
          <p class="explainer" data-i18n="emergency.211Explainer"></p>
          <div class="actions">
            <a class="btn" href="tel:211" data-i18n="emergency.call211Btn"></a>
            <a class="btn btn-outline" href="sms:+18778362111" data-i18n="emergency.text211Btn"></a>
            <a class="btn btn-outline" target="_blank" href="https://home-c11.incontact.com/incontact/chatclient/chatclient.aspx?poc=9324c21d-03b7-49c3-a5be-e4d1b79a3c35&bu=4594083" data-i18n="emergency.chat211Btn"></a>
            <a class="btn btn-outline" target="_blank" href="http://www.navigateresources.net/tulh/" data-i18n="emergency.search211Btn"></a>
          </div>
        </article>

        <!-- Card C: Local support (COPES) -->
        <article class="card card--local" role="group" aria-labelledby="${sectionId}-copes-heading">
          <header>
            <span class="icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24">
                <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 1 1 18 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            <h4 id="${sectionId}-copes-heading" data-i18n="emergency.tulsaSupportLabel"></h4>
          </header>
          <p class="explainer" data-i18n="emergency.copesExplain"></p>
          <div class="actions">
            <a class="btn btn-support" href="tel:+19187444800" data-i18n="emergency.copesNumberBtn">
              COPES に電話（918-744-4800）
            </a>
            <button
              class="btn btn-outline"
              type="button"
              id="${sectionId}-copes-whatIsBtn"
              data-open="#${sectionId}-copes-modal"
              data-i18n="emergency.copesWhatIsBtn"
            >
              What is COPES?
            </button>
          </div>
          <mh-modal
            id="${sectionId}-copes-modal"
            data-heading-i18n="emergency.copesWhatIsHeading"
            data-body-i18n="emergency.copesWhatIsBody"
            data-list-i18n="emergency.copesWhatIsList1,emergency.copesWhatIsList2,emergency.copesWhatIsList3,emergency.copesWhatIsList4"
            data-close-i18n="close"
          ></mh-modal>
        </article>

        <p class="footer" data-i18n="emergency.footer"></p>
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
