class MHModal extends HTMLElement {
  connectedCallback() {
    if (this.__inited) return;
    this.__inited = true;

    // Ensure minimal styles once
    const STYLE_ID = "mh-modal-styles";
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        .mh-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.6); display: none; align-items: center; justify-content: center; z-index: 10000; }
        .mh-modal-backdrop[aria-hidden="false"] { display: flex; }
        .mh-modal { background: #0b1427; border: 1px solid #223049; border-radius: 12px; width: min(92vw, 640px); max-height: 85vh; overflow: auto; box-shadow: 0 10px 30px rgba(0,0,0,.4); }
        .mh-modal .content { padding: 16px; }
        .mh-modal .mh-modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }
      `;
      document.head.appendChild(style);
    }

    const headingKey = this.getAttribute("data-heading-i18n") || "";
    const bodyKey = this.getAttribute("data-body-i18n") || "";
    const listKeys = (this.getAttribute("data-list-i18n") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const closeKey = this.getAttribute("data-close-i18n") || "close";

    const titleId = `${this.id || Math.random().toString(36).slice(2)}-title`;

    this.innerHTML = `
      <div class="mh-modal-backdrop" aria-hidden="true">
        <div class="mh-modal" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
          <div class="content">
            <h4 id="${titleId}" tabindex="-1" data-i18n="${headingKey}">About</h4>
            <div class="info-panel-body">
              ${bodyKey ? `<div data-i18n="${bodyKey}"></div>` : ""}
              ${
                listKeys.length
                  ? `<ul>${listKeys
                      .map((k) => `<li data-i18n="${k}"></li>`)
                      .join("")}</ul>`
                  : ""
              }
              <div class="mh-modal-actions">
                <button type="button" class="btn btn-link" data-i18n="${closeKey}">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this._backdrop = this.querySelector(".mh-modal-backdrop");
    this._dialog = this.querySelector(".mh-modal");
    this._heading = this.querySelector(`#${titleId}`);
    this._closeBtn = this.querySelector(".mh-modal-actions .btn");

    // Events
    this._onKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        this.close();
        return;
      }
      if (e.key === "Tab") {
        this._trapFocus(e);
      }
    };
    this._onBackdropClick = (e) => {
      if (e.target === this._backdrop) {
        this.close();
      }
    };
    if (this._closeBtn) {
      this._closeBtn.addEventListener("click", () => this.close());
    }
    if (this._backdrop) {
      this._backdrop.addEventListener("click", this._onBackdropClick);
    }
  }

  open() {
    this._previouslyFocused = document.activeElement;
    if (this._backdrop) this._backdrop.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", this._onKeyDown, true);
    queueMicrotask(() => {
      if (this._heading) this._heading.focus();
    });
    this.dispatchEvent(new CustomEvent("mh-modal:open", { bubbles: true }));
  }

  close() {
    if (this._backdrop) this._backdrop.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", this._onKeyDown, true);
    if (
      this._previouslyFocused &&
      typeof this._previouslyFocused.focus === "function"
    ) {
      this._previouslyFocused.focus();
    }
    this.dispatchEvent(new CustomEvent("mh-modal:close", { bubbles: true }));
  }

  _trapFocus(e) {
    const focusableSelectors = [
      "a[href]",
      "button:not([disabled])",
      "textarea",
      'input[type="text"]',
      'input[type="radio"]',
      'input[type="checkbox"]',
      "select",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");
    const nodes = this._dialog
      ? Array.from(this._dialog.querySelectorAll(focusableSelectors))
      : [];
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

if (!customElements.get("mh-modal")) {
  customElements.define("mh-modal", MHModal);
}

// Delegated trigger: open any <mh-modal> via [data-open="#modalId"] on click
if (!window.__mhModalDelegatedOpen) {
  window.__mhModalDelegatedOpen = true;
  document.addEventListener("click", async (e) => {
    const trigger = e.target && e.target.closest("[data-open]");
    if (!trigger) return;
    const sel = trigger.getAttribute("data-open");
    if (!sel) return;
    e.preventDefault();
    if (!customElements.get("mh-modal")) {
      await customElements.whenDefined("mh-modal");
    }
    const modal = document.querySelector(sel);
    if (modal && typeof modal.open === "function") {
      modal.open();
    } else if (modal) {
      const backdrop = modal.querySelector(".mh-modal-backdrop");
      if (backdrop) backdrop.setAttribute("aria-hidden", "false");
    }
  });
}
