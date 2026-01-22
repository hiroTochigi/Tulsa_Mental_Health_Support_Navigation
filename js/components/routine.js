class MHRoutine extends HTMLElement {
  static get observedAttributes() {
    // Re-render is expensive; we only need to react to changes that affect filtering.
    // When `focus` changes, we update the rendered section's `data-focus` attribute.
    return ["focus"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== "focus" || oldValue === newValue) return;
    if (!this.isConnected) return;
    const sectionId = this._sectionId || this.getAttribute("data-section-id");
    if (!sectionId) return;
    const section = document.getElementById(sectionId);
    if (!section) return;
    // `data-focus` drives the CSS-only filtering of titles/body text/CTAs.
    section.setAttribute("data-focus", this.getAttribute("focus") || "all");
  }

  connectedCallback() {
    const passedId = this.getAttribute("section-id") || this.getAttribute("id");
    const sectionId = passedId && passedId.trim() ? passedId.trim() : "routine";
    // Cache the section id so attributeChangedCallback can find the right DOM node.
    this._sectionId = sectionId;
    // Initial filter mode: "therapy" | "meds" | "all" (fallback).
    const focus = (this.getAttribute("focus") || "all").trim() || "all";

    // Ensure agency styles are present
    if (!document.querySelector('link[href="css/components/agency.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "css/components/agency.css";
      document.head.appendChild(link);
    }

    /* Focus-based filtering (CSS only)
     *
     * We mark elements with `data-mode="therapy"`, `data-mode="meds"`, or `data-mode="all"`.
     * Then we set `data-focus` on the section (via the component's `focus` attribute).
     * These rules make only the relevant bits visible:
     * - For text spans: use `display: inline`
     * - For buttons/links inside `.actions`: use `display: inline-flex`
     */

    this.innerHTML = `
      <section id="${sectionId}" class="result" data-focus="${focus}" role="region" aria-labelledby="${sectionId}-title">
        <style>
          #${sectionId} .agency-list { display: block; }
          #${sectionId} .card header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
          #${sectionId} .card header .left { display: flex; align-items: center; gap: 10px; }
          #${sectionId} .icon { width: 24px; height: 24px; flex: 0 0 24px; }
          #${sectionId} .explainer { margin: 0 0 12px 0; }
          #${sectionId} .actions > .btn { flex: 1 1 100%; }
          @media (min-width: 640px) { #${sectionId} .actions > .btn { flex: 0 0 auto; } }
          #${sectionId} [data-mode] { display: none; }
          #${sectionId}[data-focus="therapy"] [data-mode="all"],
          #${sectionId}[data-focus="therapy"] [data-mode="therapy"] { display: inline; }
          #${sectionId}[data-focus="meds"] [data-mode="all"],
          #${sectionId}[data-focus="meds"] [data-mode="meds"] { display: inline; }
          #${sectionId}[data-focus="all"] [data-mode="all"] { display: inline; }
          #${sectionId} .actions [data-mode] { display: none; }
          #${sectionId}[data-focus="therapy"] .actions [data-mode="all"],
          #${sectionId}[data-focus="therapy"] .actions [data-mode="therapy"] { display: inline-flex; }
          #${sectionId}[data-focus="meds"] .actions [data-mode="all"],
          #${sectionId}[data-focus="meds"] .actions [data-mode="meds"] { display: inline-flex; }
          #${sectionId}[data-focus="all"] .actions [data-mode="all"] { display: inline-flex; }
          /* optional light accents */
          #${sectionId} .card--crs { border-color: #2b6cb0; }
          #${sectionId} .card--fcs { border-color: #9b2c2c; }
          #${sectionId} .card--chc { border-color: #2f855a; }
        </style>
        <h3 id="${sectionId}-title">
          <span data-mode="all" data-i18n="routine.title">Connection to routine outpatient services (Adults)</span>
          <span data-mode="therapy" data-i18n="routine.title.therapy">Counseling & therapy options (Adults)</span>
          <span data-mode="meds" data-i18n="routine.title.meds">Medication support options (Adults)</span>
        </h3>

        <p>
          <span data-mode="all" data-i18n="routine.body">The following agencies provide routine outpatient care such as counseling, medication management, and SUD support.</span>
          <span data-mode="therapy" data-i18n="routine.body.therapy">The following agencies can help you start counseling or therapy. Call and ask about your first appointment and costs.</span>
          <span data-mode="meds" data-i18n="routine.body.meds">The following agencies can help with medication evaluation, prescriptions, and ongoing medication management. Call and ask about intake and costs.</span>
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
                <span class="pill" data-i18n="routine.crs.pill.uninsured">Uninsured OK</span>
                <span class="pill" data-i18n="routine.crs.pill.sliding">Sliding scale</span>
              </div>
            </header>
            <p class="explainer" data-i18n="routine.crs.desc">Nonprofit based in Tulsa, OK. Provides mental health care, counseling, substance use treatment, and crisis response services.</p>
            <div class="actions">
              <a class="btn call-btn" data-mode="all" href="tel:+19184922554" data-i18n="routine.crs.callBtn">Call 918-492-2554</a>
              <a class="btn btn-outline site-btn" data-mode="all" href="https://crsok.org/adult-services/" target="_blank" rel="noopener" data-i18n="routine.siteBtn">Website</a>
              <a class="btn btn-outline apply-btn" data-mode="all" href="https://crsok.org/contact-us/" target="_blank" rel="noopener" data-i18n="routine.applyBtn">Get in Touch</a>
              <button
                class="btn btn-outline"
                type="button"
                data-mode="all"
                data-open="#${sectionId}-crs-modal"
                data-i18n="routine.crs.moreBtn"
              >
                About CRSOK
              </button>
            </div>
            <mh-modal id="${sectionId}-crs-modal">
              <h4 slot="heading" data-i18n="routine.crs.modalHeading">About</h4>
              <div slot="body">
                <div data-i18n="routine.crs.modalBody"></div>
              </div>
              <button
                slot="actions"
                type="button"
                class="btn btn-link"
                data-i18n="close"
                data-modal-close
              >
                Close
              </button>
            </mh-modal>
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
                <span class="pill" data-i18n="routine.fcs.pill.sliding">Sliding scale</span>
              </div>
            </header>
            <p class="explainer" data-i18n="routine.fcs.desc">Comprehensive behavioral-health services for adults, youth and families in the Tulsa area, including outpatient counseling, medication management, integrated healthcare and crisis stabilization.</p>
            <div class="actions">
              <a class="btn call-btn" data-mode="all" href="tel:+19185879471" data-i18n="routine.fcs.callBtn">Call 918-587-9471</a>
              <a class="btn btn-outline site-btn" data-mode="therapy" href="https://www.fcsok.org/services/adult-and-family-counseling/" target="_blank" rel="noopener" data-i18n="routine.fcs.siteBtn">Start Counselling & Therapy</a>
              <a class="btn btn-outline apply-btn" data-mode="meds" href="https://www.fcsok.org/services/pharmacy/" target="_blank" rel="noopener" data-i18n="routine.fcs.applyBtn">Get Medication Help & Management</a>
              <button
                class="btn btn-outline"
                type="button"
                data-mode="all"
                data-open="#${sectionId}-fcs-modal"
                data-i18n="routine.fcs.rateBtn"
              >
                Check My Rate
              </button>
            </div>
            <mh-fcs-rate-modal
              modal-id="${sectionId}-fcs-modal"
              section-id="${sectionId}"
            ></mh-fcs-rate-modal>
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
                <span class="pill" data-i18n="routine.chc.pill.pc">Integrated primary care</span>
                <span class="pill" data-i18n="routine.chc.pill.sliding">Sliding scale</span>
              </div>
            </header>
            <p class="explainer" data-i18n="routine.chc.desc">Adult-friendly Federally Qualified Health Center (FQHC) in northeast Oklahoma offering primary care, dental, behavioral-health counseling and medication services (via on-site pharmacy), with sliding-fee option for uninsured.</p>
            <div class="actions">
              <a class="btn call-btn" data-mode="all" href="tel:+19186220641" data-i18n="routine.chc.callBtn">Call 918-622-0641</a>
              <a class="btn btn-outline site-btn" data-mode="therapy" href="https://communityhealthconnection.org/services/behavioral-health/" target="_blank" rel="noopener" data-i18n="routine.chc.counselingBtn">Start Counseling</a>
              <a class="btn btn-outline apply-btn" data-mode="meds" href="https://communityhealthconnection.org/pharmacy/" target="_blank" rel="noopener" data-i18n="routine.chc.medicationBtn">Medication Support Appointment</a>
              <button
                class="btn btn-outline"
                type="button"
                data-mode="all"
                data-open="#${sectionId}-chc-modal"
                data-i18n="routine.chc.rateBtn"
              >
                Check My Rate
              </button>
            </div>
            <mh-chc-rate-modal
              modal-id="${sectionId}-chc-modal"
              section-id="${sectionId}"
            ></mh-chc-rate-modal>
          </article>
        </div>

        <div class="divider"></div>
        <button class="btn btn-outline" data-reset data-i18n="reset">Back to the first question</button>
      </section>
    `;

    this.setAttribute("data-section-id", sectionId);
    if (this.hasAttribute("id") && this.getAttribute("id") === sectionId) {
      this.removeAttribute("id");
    }
  }
}

customElements.define("mh-routine", MHRoutine);
