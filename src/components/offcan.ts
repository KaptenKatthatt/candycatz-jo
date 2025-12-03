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
            <div class="cartContainer"></div>
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
                        <span>XX kr</span>
                    </div>
                    <div class="d-flex justify-content-between mb-4">
                        <span>Shipping</span>
                        <span>19kr</span>
                    </div>
  
                    <hr>

                    <div class="d-flex justify-content-between mb-4">
                        <strong>Total</strong>
                        <strong>XX kr</strong>
                    </div>
                    <button class="checkOutBtn btn btn-primary w-100 data-bs-dismiss="offcanvas"  aria-label="Close">Proceed to Checkout</button>
                </div>
            </div>
    </div>
</div>

 <!-- Continue Shopping Button -->
            <div class="text-start mt-4 mb-4">
                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="offcanvas"  aria-label="Close">
                    <i class="bi bi-arrow-left me-2"></i>Continue Shopping</a>
                    </button>
            </div>
   </div>
      </div>
         </div>

`;

  // EventListner for Proceed to Checkout

  const cartCheckoutContainer = document.querySelector<HTMLDivElement>(
    "#cartCheckoutContainer"
  )!;
  const checkOutBtn =
    document.querySelector<HTMLButtonElement>(".checkOutBtn")!;

  checkOutBtn.addEventListener("click", () => {
    console.log("clicka Proceed to checkout");

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
};
