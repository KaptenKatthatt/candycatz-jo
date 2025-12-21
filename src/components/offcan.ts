import { renderCart, renderCartBadge } from "./cart";
import { renderCheckoutCart } from "./renderCheckoutCart";
import { offCanvasTemplate } from "./templates";

export const offCan = document.querySelector<HTMLDivElement>("#offCan")!;

export const renderOffCan = function () {
  offCan.innerHTML = offCanvasTemplate();
  // EventListener for Proceed to Checkout
  const cartCheckoutContainer = document.querySelector<HTMLDivElement>(
    "#cartCheckoutContainer"
  );
  const checkOutBtn =
    document.querySelector<HTMLButtonElement>(".checkout-btn")!;

  checkOutBtn.addEventListener("click", () => {
    document.querySelector(".carousel")?.classList.add("d-none");
    document.querySelector(".scroll-container")?.classList.add("d-none");

    renderCheckoutCart();
    // close offcan
    const offCanvas = document.querySelector<HTMLDivElement>(".offcanvas")!;
    offCanvas.classList.remove("show");

    // remove backdrop shadow
    const backdrop = document.querySelector(".offcanvas-backdrop")!;
    if (backdrop) {
      backdrop.remove();
    }

    // hide homepage
    const allCardsContainerEl = document.querySelector<HTMLDivElement>(
      ".all-cards-container"
    )!;
    allCardsContainerEl.classList.add("d-none");

    // show accordion
    cartCheckoutContainer!.classList.remove("d-none");

    // scroll to top
    window.scrollTo({ top: 100, behavior: "smooth" });
  });

  // Event listeners for closing offcanvas
  const btnClose = document.querySelector<HTMLButtonElement>(".btn-close");
  if (btnClose) {
    btnClose.addEventListener("click", closeOffCanvas);
  }

  offCan.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest("#continue-shopping-btn")) {
      closeOffCanvas();
    }
  });
};

export const openOffCanvas = function () {
  const offCanvas = document.querySelector<HTMLDivElement>(".offcanvas")!;
  renderCart();
  renderCartBadge();
  offCanvas.classList.add("show");

  let backdrop = document.querySelector(".offcanvas-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "offcanvas-backdrop fade show";
    backdrop.addEventListener("click", closeOffCanvas);
    document.body.appendChild(backdrop);
  }
};

export const closeOffCanvas = function () {
  const offCanvas = document.querySelector<HTMLDivElement>(".offcanvas")!;
  offCanvas.classList.remove("show");

  const backdrop = document.querySelector(".offcanvas-backdrop");
  if (backdrop) {
    backdrop.remove();
  }
};
