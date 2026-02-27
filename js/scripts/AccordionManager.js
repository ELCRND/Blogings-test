export class AccordionManager {
  constructor(selector = ".accordions-item", timeout = 1000) {
    this.selector = selector;
    this.timeout = timeout;
    this.timeoutId = null;
    this.init();
  }

  isTouchDevice() {
    const touchCheck =
      ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) ||
      ("msMaxTouchPoints" in navigator && navigator.msMaxTouchPoints > 0);

    const hoverCheck = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;

    const screenWidthCheck = window.innerWidth <= 1024;

    return touchCheck || hoverCheck || screenWidthCheck;
  }

  handlePointerEnter(details) {
    return () => {
      clearTimeout(this.timeoutId);
      details.open = true;
    };
  }

  handlePointerLeave(details) {
    return () => {
      clearTimeout(this.timeoutId);

      if (this.isTouchDevice()) {
        details.open = false;
        return;
      }

      this.timeoutId = setTimeout(() => {
        details.open = false;
      }, this.timeout);
    };
  }

  init() {
    document.querySelectorAll(this.selector).forEach((el) => {
      const details = el.querySelector("details");
      if (!details) return;

      el.addEventListener("pointerenter", this.handlePointerEnter(details));
      el.addEventListener("pointerleave", this.handlePointerLeave(details));
    });
  }

  refresh() {
    this.init();
  }

  destroy() {
    clearTimeout(this.timeoutId);
  }
}
