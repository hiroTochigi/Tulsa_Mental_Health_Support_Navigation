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
            <div class="sr-only" data-slide-label="A" data-i18n="routine.chc.slide.levelA">Slide A (Nominal Fee)</div>
            <div class="sr-only" data-slide-label="B" data-i18n="routine.chc.slide.levelB">Slide B</div>
            <div class="sr-only" data-slide-label="C" data-i18n="routine.chc.slide.levelC">Slide C (50% Discount)</div>
            <div class="sr-only" data-slide-label="D" data-i18n="routine.chc.slide.levelD">Slide D</div>
            <div class="sr-only" data-slide-label="E" data-i18n="routine.chc.slide.levelE">Slide E</div>
            <div class="sr-only" data-slide-label="F" data-i18n="routine.chc.slide.levelF">Slide F (Full Price)</div>
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

          const ensurePlaceholder = (el) => {
            if (!el.dataset.placeholder) {
              el.dataset.placeholder = el.textContent.trim();
            }
          };
          ensurePlaceholder(annualEl);
          ensurePlaceholder(perPersonEl);
          ensurePlaceholder(slideEl);

          const parseMoney = (value) => {
            const cleaned = String(value || "").replace(/[^0-9.-]/g, "");
            return cleaned ? Number.parseFloat(cleaned) : Number.NaN;
          };

          const getPrefix = (text) => {
            const parts = text.split(":");
            return parts.length > 1 ? parts[0].trim() : text.trim();
          };

          const setWithValue = (el, valueText) => {
            const prefix = getPrefix(el.dataset.placeholder || el.textContent);
            el.textContent = `${prefix}: ${valueText}`;
          };

          const incomeInput = this.querySelector('[name="chc-income"]');
          const periodInput = this.querySelector('input[name="chc-income-period"]:checked');
          const householdInput = this.querySelector('[name="chc-household"]');
          const incomeValue = incomeInput ? parseMoney(incomeInput.value) : Number.NaN;
          const householdValue = householdInput ? Number.parseInt(householdInput.value, 10) : Number.NaN;

          if (!Number.isFinite(incomeValue) || !periodInput || !Number.isFinite(householdValue) || householdValue <= 0) {
            annualEl.textContent = annualEl.dataset.placeholder;
            perPersonEl.textContent = perPersonEl.dataset.placeholder;
            slideEl.textContent = slideEl.dataset.placeholder;
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
          setWithValue(annualEl, formattedAnnual);

          const perPerson = annualIncome / householdValue;
          const formattedPerPerson = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(perPerson);
          setWithValue(perPersonEl, formattedPerPerson);

          const slideText = this.getSlideLevel(householdValue, annualIncome);
          setWithValue(slideEl, slideText);
        }
      });
      this._chcHandlersBound = true;
    }
  }

  getSlideLevel(householdSize, annualIncome) {
    const basePoverty = 15650;
    const increment = 5500;
    const adjustedHousehold = Math.max(1, Number.parseInt(householdSize, 10) || 1);
    const fpg100 = basePoverty + Math.max(0, adjustedHousehold - 1) * increment;
    const slideLabels = Array.from(this.querySelectorAll("[data-slide-label]")).reduce(
      (acc, el) => {
        acc[el.dataset.slideLabel] = el.textContent.trim();
        return acc;
      },
      {}
    );

    if (annualIncome <= fpg100) {
      return slideLabels.A || "Slide A (Nominal Fee)";
    }
    if (annualIncome <= fpg100 * 1.25) {
      return slideLabels.B || "Slide B";
    }
    if (annualIncome <= fpg100 * 1.5) {
      return slideLabels.C || "Slide C (50% Discount)";
    }
    if (annualIncome <= fpg100 * 1.75) {
      return slideLabels.D || "Slide D";
    }
    if (annualIncome <= fpg100 * 2.0) {
      return slideLabels.E || "Slide E";
    }
    return slideLabels.F || "Slide F (Full Price)";
  }
}

if (!customElements.get("mh-chc-rate-modal")) {
  customElements.define("mh-chc-rate-modal", MHChcRateModal);
}
