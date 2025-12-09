import { renderCart, renderCartBadge, renderCheckoutCart } from "./cart";

export const offCan = document.querySelector<HTMLDivElement>("#offCan")!;

export const renderOffCan = function () {
  offCan.innerHTML = `
  <div class="offcanvas offcanvas-end rounded-top-4" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" data-bs-scroll="false">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Your Candy Cart🍬 </h5>
    <i class="bi bi-cart4 fs-3"></i>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>

  <!-- Cart products container-->
  <div class=" offcanvasBody px-3">
      <div class="productContainer card px-2">
        <div class="card-body">
          <div class="row align-items-center mb-2 cart-item">
            <div class="cartContainer"></div>
           <button class="clearCartBtn btn btn-secondary p-1"><i class="bi bi-cart-x fs-5 mb-3"></i>Töm kundvagnen</button>
          </div>
        </div>
    </div>

      <div class="card cart-summary mt-4">
        <div class="card-body">
          <h5 class="card-title mb-4 ">Ordersummering</h5>
          <div class="d-flex justify-content-between mb-3">
            <span>Summa</span>
            <span class="subtotalContainer"></span>
          </div>
          <div class="d-flex justify-content-between mb-4">
            <span>Frakt</span>
            <span>19kr</span>
          </div>
          <hr>
          <div class="d-flex justify-content-between mb-4">
            <strong>Total</strong>
            <span class="totalCostContainer"><strong></strong></span>
          </div>
          <button class="checkOutBtn btn btn-primary w-100" data-bs-dismiss="offcanvas" aria-label="Close">Gå till kassan</button>
        </div>
    </div>
  </div>

  <!-- Continue Shopping Button -->
  <div class="text-start ms-3 mt-4 mb-4">
    <button type="button" class="btn btn-outline-primary" data-bs-dismiss="offcanvas" aria-label="Close">
      <i class="bi bi-arrow-left me-2"></i>Fortsätt Handla
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

    // scroll to top
    window.scrollTo({top:0, behavior: "smooth"})
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
  renderCart();
  renderCartBadge();
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
