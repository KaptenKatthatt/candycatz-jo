import { renderCart, renderCartBadge } from "./cart";
import { renderCheckoutCart } from "./renderCheckoutCart";

export const offCan = document.querySelector<HTMLDivElement>("#offCan")!;

export const renderOffCan = function () {
  offCan.innerHTML = `
    <div
      class="offcanvas offcanvas-end rounded-top-4"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      data-bs-scroll="false"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Your Candy Cart</h5>
        <i class="bi bi-cart4 fs-3 ps-2"></i>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <!-- Cart products container -->
      <div class="offcanvas-body offcanvasBody">
        <div class="productContainer card">
          <div class="card-body">
            <div class="row align-items-center cart-item">
              <!-- Inject cart contents from cart.ts -->
              <div class="cartContainer"></div>
            </div>
            <hr />
            <div class="d-flex justify-content-between mb-4">
              <strong>Totalt</strong>
              <span class="totalCostContainer"><strong></strong></span>
            </div>
          </div>
        </div>

        <!-- Continue Shopping Button -->
        <button
          type="button"
          class="continueShoppingBtn"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i class="bi bi-arrow-left me-2"></i>Fortsätt Handla
        </button>

        <button
          class="checkOutBtn"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          Gå till kassan
          <i class="bi bi-arrow-right ms-2"></i>
        </button>

        <div class="heartCatContainer"></div>
      </div>
    </div>
  `;
  // EventListener for Proceed to Checkout
  const cartCheckoutContainer = document.querySelector<HTMLDivElement>(
    "#cartCheckoutContainer"
  );
  const checkOutBtn =
    document.querySelector<HTMLButtonElement>(".checkOutBtn")!;

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
    const allCardsContainerEl =
      document.querySelector<HTMLDivElement>(".allCardsContainer")!;
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
    if (target.classList.contains("continueShoppingBtn")) {
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
