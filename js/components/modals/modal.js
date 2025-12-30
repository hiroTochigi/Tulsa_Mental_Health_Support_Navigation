class MHModal extends HTMLElement {
  connectedCallback() {
    if (this.__inited) return;
    this.__inited = true;

    const slotBuckets = { heading: [], body: [], actions: [], fallback: [] };
    const initialNodes = Array.from(this.childNodes);
    initialNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const slotName = node.getAttribute("slot");
        if (slotName === "heading") {
          slotBuckets.heading.push(node);
        } else if (slotName === "body") {
          slotBuckets.body.push(node);
        } else if (slotName === "actions") {
          slotBuckets.actions.push(node);
        } else {
          slotBuckets.fallback.push(node);
        }
      } else if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent &&
        node.textContent.trim()
      ) {
        slotBuckets.fallback.push(node);
      }
    });

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

    this._titleIdBase = this.id || Math.random().toString(36).slice(2);

    this.innerHTML = `
      <div class="mh-modal-backdrop" aria-hidden="true">
        <div class="mh-modal" role="dialog" aria-modal="true" tabindex="-1">
          <div class="content">
            <div class="mh-modal-heading"></div>
            <div class="info-panel-body">
              <div class="mh-modal-actions">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this._backdrop = this.querySelector(".mh-modal-backdrop");
    this._dialog = this.querySelector(".mh-modal");
    this._headingContainer = this.querySelector(".mh-modal-heading");
    this._bodyContainer = this.querySelector(".info-panel-body");
    this._actionsContainer = this.querySelector(".mh-modal-actions");

    if (this._headingContainer) {
      slotBuckets.heading.forEach((node) =>
        this._headingContainer.appendChild(node)
      );
    }
    if (this._bodyContainer) {
      slotBuckets.body.forEach((node) =>
        this._bodyContainer.insertBefore(node, this._actionsContainer)
      );
      slotBuckets.fallback.forEach((node) =>
        this._bodyContainer.insertBefore(node, this._actionsContainer)
      );
    }
    if (this._actionsContainer) {
      slotBuckets.actions.forEach((node) =>
        this._actionsContainer.appendChild(node)
      );
    }

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
    this._onClick = (e) => {
      const closeTrigger =
        e.target && e.target.closest && e.target.closest("[data-modal-close]");
      if (closeTrigger && this.contains(closeTrigger)) {
        e.preventDefault();
        this.close();
      }
    };
    if (this._backdrop) {
      this._backdrop.addEventListener("click", this._onBackdropClick);
    }
    this.addEventListener("click", this._onClick);
    this._syncHeading();
  }

  open() {
    this._previouslyFocused = document.activeElement;
    if (this._backdrop) this._backdrop.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", this._onKeyDown, true);
    queueMicrotask(() => {
      if (this._heading) {
        this._heading.focus();
      } else if (this._dialog) {
        this._dialog.focus();
      }
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

  _syncHeading() {
    if (!this._headingContainer || !this._dialog) return;
    const headingEl = this._headingContainer.firstElementChild || null;
    if (headingEl) {
      if (!headingEl.id) {
        headingEl.id = `${this._titleIdBase}-title`;
      }
      if (!headingEl.hasAttribute("tabindex")) {
        headingEl.setAttribute("tabindex", "-1");
      }
      this._dialog.setAttribute("aria-labelledby", headingEl.id);
      this._heading = headingEl;
    } else {
      this._dialog.removeAttribute("aria-labelledby");
      this._heading = null;
    }
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
