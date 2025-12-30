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
        #${modalId} .paystub-calc { margin-top: 10px; display: none; gap: 8px; }
        #${modalId} .doc-item--paystubs .doc-toggle:checked ~ .paystub-calc { display: grid; }
        #${modalId} .calc-row { display: grid; gap: 8px; }
        #${modalId} .calc-row button { justify-self: start; }
        #${modalId} .calc-result { font-weight: 700; }
        #${modalId} .slide-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
        #${modalId} .slide-output { margin: 6px 0 0 0; font-weight: 600; }
      </style>
      <mh-modal id="${modalId}">
        <h4 slot="heading" data-i18n="routine.chc.modalHeading">Check My Rate</h4>
        <div slot="body">
          <div class="chc-modal">
            <p class="hint" data-i18n="routine.chc.modalIntro">Answer a few quick questions to estimate your sliding-fee level. A CHC team member will confirm details with you.</p>

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
              <h5 data-i18n="routine.chc.docs.title">Document helper checklist</h5>
              <p class="hint" data-i18n="routine.chc.docs.subtitle">Check what you have on hand:</p>
              <div class="doc-list">
                <div class="doc-item doc-item--paystubs">
                  <label>
                    <input class="doc-toggle" type="radio" name="chc-docs" />
                    <span data-i18n="routine.chc.docs.paystubs">Last 2 Paystubs</span>
                  </label>
                  <div class="paystub-calc">
                    <h5 data-i18n="routine.chc.docs.paystubHelper">Paystub helper</h5>
                    <div class="field">
                      <label for="${sectionId}-paystub-1" data-i18n="routine.chc.docs.paystubAmount1">Paystub 1 amount</label>
                      <input id="${sectionId}-paystub-1" type="text" inputmode="decimal" data-paystub-amount placeholder="$0.00" />
                    </div>
                    <div class="field">
                      <label for="${sectionId}-paystub-2" data-i18n="routine.chc.docs.paystubAmount2">Paystub 2 amount</label>
                      <input id="${sectionId}-paystub-2" type="text" inputmode="decimal" data-paystub-amount placeholder="$0.00" />
                    </div>
                    <div class="field">
                      <label data-i18n="routine.chc.docs.paystubFrequency">Paystub frequency</label>
                      <div class="period-options">
                        <label>
                          <input type="radio" name="chc-paystub-frequency" value="weekly" checked />
                          <span data-i18n="routine.chc.docs.paystubWeekly">Weekly (x52)</span>
                        </label>
                        <label>
                          <input type="radio" name="chc-paystub-frequency" value="biweekly" />
                          <span data-i18n="routine.chc.docs.paystubBiweekly">Bi-weekly (x26)</span>
                        </label>
                      </div>
                    </div>
                    <div class="calc-row">
                      <button class="btn btn-outline" type="button" data-paystub-calc data-i18n="routine.chc.docs.paystubCalcBtn">Estimate annual income</button>
                      <div class="calc-result" aria-live="polite" data-paystub-result data-i18n="routine.chc.docs.paystubResult">Estimated annual income:</div>
                    </div>
                  </div>
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

            <section>
              <h5 data-i18n="routine.chc.slide.title">Slide level estimate</h5>
              <div class="field">
                <label for="${sectionId}-slide-select" data-i18n="routine.chc.slide.label">Select a slide to display</label>
                <div class="slide-row">
                  <select id="${sectionId}-slide-select" data-slide-select>
                    <option value="" data-i18n="routine.chc.slide.selectPlaceholder">Choose a slide</option>
                    <option value="A" data-i18n="routine.chc.slide.optionA">Slide A</option>
                    <option value="B" data-i18n="routine.chc.slide.optionB">Slide B</option>
                    <option value="C" data-i18n="routine.chc.slide.optionC">Slide C</option>
                    <option value="D" data-i18n="routine.chc.slide.optionD">Slide D</option>
                    <option value="E" data-i18n="routine.chc.slide.optionE">Slide E</option>
                    <option value="F" data-i18n="routine.chc.slide.optionF">Slide F</option>
                  </select>
                  <button class="btn btn-outline" type="button" data-slide-calc data-i18n="routine.chc.slide.calcBtn">Show slide level</button>
                </div>
                <p class="slide-output" aria-live="polite" data-slide-output data-i18n="routine.chc.slide.resultPlaceholder">Slide level: Not calculated yet.</p>
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
        const paystubButton = event.target.closest("[data-paystub-calc]");
        if (paystubButton) {
          const amountInputs = Array.from(this.querySelectorAll("[data-paystub-amount]"));
          const resultEl = this.querySelector("[data-paystub-result]");
          if (!amountInputs.length || !resultEl) return;

          if (!resultEl.dataset.label) {
            resultEl.dataset.label = resultEl.textContent.trim();
          }

          const parseMoney = (value) => {
            const cleaned = String(value || "").replace(/[^0-9.-]/g, "");
            return cleaned ? Number.parseFloat(cleaned) : Number.NaN;
          };

          const amounts = amountInputs.map((input) => parseMoney(input.value));
          const valid = amounts.filter((value) => Number.isFinite(value));
          if (!valid.length) {
            resultEl.textContent = resultEl.dataset.label;
            return;
          }

          const average = valid.reduce((sum, value) => sum + value, 0) / valid.length;
          const frequency = this.querySelector('input[name="chc-paystub-frequency"]:checked');
          const multiplier = frequency && frequency.value === "biweekly" ? 26 : 52;
          const annual = average * multiplier;
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(annual);
          resultEl.textContent = `${resultEl.dataset.label} ${formatted}`;
          return;
        }

        const slideButton = event.target.closest("[data-slide-calc]");
        if (slideButton) {
          const selectEl = this.querySelector("[data-slide-select]");
          const outputEl = this.querySelector("[data-slide-output]");
          if (!selectEl || !outputEl) return;

          if (!outputEl.dataset.placeholder) {
            outputEl.dataset.placeholder = outputEl.textContent.trim();
          }

          const selectedOption = selectEl.options[selectEl.selectedIndex];
          if (!selectEl.value || !selectedOption) {
            outputEl.textContent = outputEl.dataset.placeholder;
            return;
          }

          const optionText = selectedOption.textContent.trim();
          const placeholder = outputEl.dataset.placeholder || "";
          const prefix = placeholder.includes(":") ? placeholder.split(":")[0] : "";
          outputEl.textContent = prefix ? `${prefix}: ${optionText}` : optionText;
        }
      });
      this._chcHandlersBound = true;
    }
  }
}

if (!customElements.get("mh-chc-rate-modal")) {
  customElements.define("mh-chc-rate-modal", MHChcRateModal);
}
