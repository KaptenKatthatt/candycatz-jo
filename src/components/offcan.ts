import { initStore, renderCheckoutCart } from "./cart";

export const mainContainerEl = document.querySelector<HTMLDivElement>("main");
export const offCan = document.querySelector<HTMLDivElement>("#offCan")!;

export const renderOffCan = function () {
  offCan.innerHTML = `
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Your Candy Cart🍬 </h5>
    <i class="bi bi-cart4 fs-3"></i>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>

  <div class="container py-5">
    <div class="row">
      <div class="col-12 mt-3">

        <!-- Cart Items -->

      </div>
      <div class="card mb-2">
        <div class="card-body">
          <div class="row align-items-center mb-2 cart-item">

            <!-- Cart products container -->
            <div class="col-12 col-md-12 d-flex justify-content-end align-items-center mt-3 mb-2 qty-controls">
            </div>
            <div class=" col-12 col-md-4  mb-2 mb-md-0">
            </div>
            <div class="cartContainer text-center">Kundvagnen är tom just nu. Iväg o handla med dig!</div>
            <button class="clearCartBtn btn btn-warning"><i class="bi bi-cart-x fs-1 mb-3"></i>Töm kundvagnen</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Summary -->
    <div class="col-12 mt-3">

      <div class="card cart-summary">
        <div class="card-body">
          <h5 class="card-title mb-4 ">Order Summary</h5>
          <div class="d-flex justify-content-between mb-3">
            <span>Subtotal</span>
            <span class="subtotalContainer">XX kr</span>
          </div>
          <div class="d-flex justify-content-between mb-4">
            <span>Shipping</span>
            <span>19kr</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between mb-4">
            <strong>Total</strong>
            <span class="totalCostContainer"><strong></strong></span>
          </div>
          <button class="checkOutBtn btn btn-primary w-100" data-bs-dismiss="offcanvas" aria-label="Close">Proceed to
            Checkout</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Continue Shopping Button -->
  <div class="text-start mt-4 mb-4">
    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="offcanvas" aria-label="Close">
      <i class="bi bi-arrow-left me-2"></i>Continue Shopping
    </button>
  </div>
</div>
</div>
</div>
`;
  // EventListener for Proceed to Checkout
  const cartCheckoutContainer = document.querySelector<HTMLDivElement>(
    "#cartCheckoutContainer"
  )!;
  const checkOutBtn =
    document.querySelector<HTMLButtonElement>(".checkOutBtn")!;

  checkOutBtn.addEventListener("click", () => {
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
    const allCardsContainerEl =
      document.querySelector<HTMLDivElement>(".allCardsContainer")!;
    allCardsContainerEl.classList.add("d-none");

    // show accordion
    cartCheckoutContainer.classList.remove("d-none");
  });

  // Event listeners for closing offcanvas
  const btnClose = document.querySelector<HTMLButtonElement>(".btn-close");
  if (btnClose) {
    btnClose.addEventListener("click", closeOffCanvas);
  }

  const continueShoppingBtn = document.querySelector<HTMLButtonElement>(
    ".btn-outline-primary"
  );
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener("click", closeOffCanvas);
  }
};

export const openOffCanvas = function () {
  const offCanvas = document.querySelector<HTMLDivElement>(".offcanvas")!;
  offCanvas.classList.add("show");
  // offCanvas.setAttribute("aria-modal", "true");
  // offCanvas.setAttribute("role", "dialog");

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
  // offCanvas.removeAttribute("aria-modal");
  // offCanvas.removeAttribute("role");

  const backdrop = document.querySelector(".offcanvas-backdrop");
  if (backdrop) {
    backdrop.remove();
  }
};

const clearCart = function () {
  localStorage.clear();
  initStore();
};

mainContainerEl!.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.closest(".clearCartBtn")) clearCart();
});
