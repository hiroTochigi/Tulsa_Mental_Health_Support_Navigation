class MHChcRateModal extends HTMLElement {
  connectedCallback() {
    const modalId = this.getAttribute("modal-id") || "chc-rate-modal";
    const sectionId = this.getAttribute("section-id") || "routine";

    this.innerHTML = `
      <style>
        #${modalId} .chc-modal { display: grid; gap: 16px; }
        #${modalId} .chc-modal h5 { margin: 0 0 8px 0; font-size: 1rem; }
        #${modalId} .wizard { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
        #${modalId} .wizard-step { border: 1px dashed var(--border, #223049); border-radius: 10px; padding: 12px; display: grid; gap: 10px; }
        #${modalId} .field { display: grid; gap: 6px; }
        #${modalId} .field label { font-weight: 600; }
        #${modalId} .field input,
        #${modalId} .field select { padding: 8px 10px; border-radius: 8px; border: 1px solid var(--border, #223049); background: transparent; color: inherit; }
        #${modalId} .hint { font-size: 0.9rem; color: rgba(255,255,255,.7); }
        #${modalId} .period-options { display: flex; flex-wrap: wrap; gap: 8px; }
        #${modalId} .period-options label { display: inline-flex; gap: 8px; align-items: center; padding: 6px 10px; border-radius: 999px; border: 1px solid var(--border, #223049); }
        #${modalId} .doc-list { display: grid; gap: 10px; }
        #${modalId} .doc-item { border: 1px solid var(--border, #223049); border-radius: 10px; padding: 10px; }
        #${modalId} .doc-item label { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        #${modalId} .slide-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        #${modalId} .slide-results { display: grid; gap: 6px; margin-top: 10px; }
        #${modalId} .slide-output { margin: 0; font-weight: 600; }
      </style>
      <mh-modal id="${modalId}">
        <h4 slot="heading" data-i18n="routine.chc.modalHeading">Check My Rate</h4>
        <div slot="body">
          <div class="chc-modal">
            <p class="hint" data-i18n="routine.chc.modalIntro">Answer a few quick questions to estimate your sliding-fee level. A CHC team member will confirm details with you.</p>

            <section>
              <h5 data-i18n="routine.chc.docs.title">Document helper checklist</h5>
              <p class="hint" data-i18n="routine.chc.docs.subtitle">Check what you have on hand:</p>
              <div class="doc-list">
                <div class="doc-item doc-item--paystubs">
                  <label>
                    <input class="doc-toggle" type="radio" name="chc-docs" />
                    <span data-i18n="routine.chc.docs.paystubs">Last 2 Paystubs</span>
                  </label>
                </div>
                <div class="doc-item">
                  <label>
                    <input type="radio" name="chc-docs" />
                    <span data-i18n="routine.chc.docs.foodstamp">Food Stamp Letter</span>
                  </label>
                </div>
                <div class="doc-item">
                  <label>
                    <input type="radio" name="chc-docs" />
                    <span data-i18n="routine.chc.docs.w2">W-2</span>
                  </label>
                </div>
              </div>
            </section>

            <ol class="wizard">
              <li class="wizard-step">
                <h5 data-i18n="routine.chc.step1.title">Step 1: Household context</h5>
                <div class="field">
                  <label for="${sectionId}-chc-household" data-i18n="routine.chc.step1.q">How many people live in your household?</label>
                  <input id="${sectionId}-chc-household" name="chc-household" type="number" min="1" inputmode="numeric" placeholder="1" />
                </div>
              </li>
              <li class="wizard-step">
                <h5 data-i18n="routine.chc.step2.title">Step 2: Income period</h5>
                <div class="field">
                  <label id="${sectionId}-chc-period-label" data-i18n="routine.chc.step2.q">How do you prefer to calculate your income?</label>
                  <div class="period-options" role="radiogroup" aria-labelledby="${sectionId}-chc-period-label">
                    <label>
                      <input type="radio" name="chc-income-period" value="yearly" />
                      <span data-i18n="routine.chc.step2.yearly">Yearly</span>
                    </label>
                    <label>
                      <input type="radio" name="chc-income-period" value="monthly" />
                      <span data-i18n="routine.chc.step2.monthly">Monthly</span>
                    </label>
                    <label>
                      <input type="radio" name="chc-income-period" value="biweekly" />
                      <span data-i18n="routine.chc.step2.biweekly">Bi-weekly</span>
                    </label>
                    <label>
                      <input type="radio" name="chc-income-period" value="weekly" />
                      <span data-i18n="routine.chc.step2.weekly">Weekly</span>
                    </label>
                  </div>
                </div>
              </li>
              <li class="wizard-step">
                <h5 data-i18n="routine.chc.step3.title">Step 3: Income amount</h5>
                <div class="field">
                  <label for="${sectionId}-chc-income" data-i18n="routine.chc.step3.q">Enter the total gross amount from your documents (W-2, pay stubs, etc.)</label>
                  <input id="${sectionId}-chc-income" name="chc-income" type="text" inputmode="decimal" placeholder="$0.00" />
                  <span class="hint" data-i18n="routine.chc.step3.hint">Be sure to use Gross Income (the amount before taxes are taken out).</span>
                </div>
              </li>
            </ol>

            <section>
              <h5 data-i18n="routine.chc.slide.title">Slide level estimate</h5>
              <div class="field">
                <label data-i18n="routine.chc.slide.label">Estimate your slide level</label>
                <div class="slide-row">
                  <button class="btn btn-outline" type="button" data-slide-calc data-i18n="routine.chc.slide.calcBtn">Show slide level</button>
                </div>
                <div class="slide-results" aria-live="polite">
                  <p class="slide-output" data-annual-output data-i18n="routine.chc.slide.annualPlaceholder">Annual income: Not calculated yet.</p>
                  <p class="slide-output" data-perperson-output data-i18n="routine.chc.slide.perPersonPlaceholder">Income per person: Not calculated yet.</p>
                  <p class="slide-output" data-slide-output data-i18n="routine.chc.slide.resultPlaceholder">Slide level: Not calculated yet.</p>
                </div>
                <p class="hint" data-i18n="routine.chc.slide.note">This is an estimate; staff will confirm your final slide.</p>
              </div>
            </section>
          </div>
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
    `;

    if (!this._chcHandlersBound) {
      this.addEventListener("click", (event) => {
        const slideButton = event.target.closest("[data-slide-calc]");
        if (slideButton) {
          const annualEl = this.querySelector("[data-annual-output]");
          const perPersonEl = this.querySelector("[data-perperson-output]");
          const slideEl = this.querySelector("[data-slide-output]");
          if (!annualEl || !perPersonEl || !slideEl) return;

          const storeLabel = (el) => {
            if (!el.dataset.label) {
              el.dataset.label = el.textContent.trim();
            }
          };
          storeLabel(annualEl);
          storeLabel(perPersonEl);
          storeLabel(slideEl);

          const parseMoney = (value) => {
            const cleaned = String(value || "").replace(/[^0-9.-]/g, "");
            return cleaned ? Number.parseFloat(cleaned) : Number.NaN;
          };

          const incomeInput = this.querySelector('[name="chc-income"]');
          const periodInput = this.querySelector('input[name="chc-income-period"]:checked');
          const householdInput = this.querySelector('[name="chc-household"]');
          const incomeValue = incomeInput ? parseMoney(incomeInput.value) : Number.NaN;
          const householdValue = householdInput ? Number.parseInt(householdInput.value, 10) : Number.NaN;

          if (!Number.isFinite(incomeValue) || !periodInput) {
            annualEl.textContent = annualEl.dataset.label;
            perPersonEl.textContent = perPersonEl.dataset.label;
            slideEl.textContent = slideEl.dataset.label;
            return;
          }

          const multiplierByPeriod = {
            yearly: 1,
            monthly: 12,
            biweekly: 26,
            weekly: 52,
          };
          const multiplier = multiplierByPeriod[periodInput.value] || 1;
          const annualIncome = incomeValue * multiplier;
          const formattedAnnual = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(annualIncome);
          annualEl.textContent = `${annualEl.dataset.label} ${formattedAnnual}`;

          if (Number.isFinite(householdValue) && householdValue > 0) {
            const perPerson = annualIncome / householdValue;
            const formattedPerPerson = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(perPerson);
            perPersonEl.textContent = `${perPersonEl.dataset.label} ${formattedPerPerson}`;
          } else {
            perPersonEl.textContent = perPersonEl.dataset.label;
          }

          slideEl.textContent = slideEl.dataset.label;
        }
      });
      this._chcHandlersBound = true;
    }
  }
}

if (!customElements.get("mh-chc-rate-modal")) {
  customElements.define("mh-chc-rate-modal", MHChcRateModal);
}
