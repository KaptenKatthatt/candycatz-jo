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
        <div class="col-lg-8">

            <!-- Cart Items -->
            <div class="card mb-4">
                <div class="card-body">
                    <div class="row cart-item mb-3">
                        <div class="col-md-3">
                            <img src="https://via.placeholder.com/100" alt="Product 1" class="img-fluid rounded">
                        </div>

                        <div class="col-md-5">
                            <p> Product 1 Name </p>
                        </div>
                   
                        <div class="col-md-2 qty-controls">
                        <button class = "minusBtn" data-action="minus" type = "button">-</button>
                        <input class = "product-qty" type="number" name= "product-qty" min="0" max="10" value="1"> 
                        <button class = "plusBtn" data-action= "plus" type = "button">+</button>
                        </div>

                        <div class="col-md-2 text-end">
                            <p class="fw-bold">XX kr</p>
                            <button class="btn btn-sm btn-outline-danger">
                            <i class="bi bi-trash"></i>
                                </button>
                        </div>
                    </div>

                    <hr>
<!-- Cart 2 -->
                    <div class="row align-items-center cart-item">
                        <div class="col-md-3">
                            <img src="https://via.placeholder.com/100" alt="Product 2" class="img-fluid rounded">
                        </div>
                        <div class="col-md-5">
                    <p> Product 2 Name </p>
                        </div>

                        
                         <div class="col-md-2 qty-controls">
                        <button class = "minusBtn" data-action="minus" type = "button">-</button>
                        <input class = "product-qty" type="number" name= "product-qty" min="0" max="10" value="1"> 
                        <button class = "plusBtn" data-action= "plus" type = "button">+</button>
                        </div>

                        <div class="col-md-2 text-end">
                            <p class="fw-bold">XX kr</p>
                            <button class="btn btn-sm btn-outline-danger">
                            <i class="bi bi-trash"></i>
                              </button>
                        </div>
                    </div>

                </div>
            </div>
            <!-- Continue Shopping Button -->
            <div class="text-start mb-4">
                <a href="#" class="btn btn-outline-primary">
                    <i class="bi bi-arrow-left me-2"></i>Continue Shopping</a>
            </div>
        </div>
        <div class="col-lg-4">
            <!-- Cart Summary -->
            <div class="card cart-summary">
                <div class="card-body">
                    <h5 class="card-title mb-4 ">Order Summary</h5>
                    <div class="d-flex justify-content-between mb-3">
                        <span>Subtotal</span>
                        <span>XX kr</span>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                        <span>Shipping</span>
                        <span>XX kr</span>
                    </div>
                   
                    <hr>
                    <div class="d-flex justify-content-between mb-4">
                        <strong>Total</strong>
                        <strong>XX kr</strong>
                    </div>
                    <button class="btn btn-primary w-100">Proceed to Checkout</button>
                </div>
            </div>
        
         
    </div>
</div>























`;
};

/*
const qtyControls = document.querySelectorAll<HTMLDivElement>('.qty-controls')!;

qtyContainers.forEach(container => {
  const minusBtn = container.querySelector<HTMLButtonElement>(".minusBtn")!;
  const plusBtn = container.querySelector<HTMLButtonElement>(".plusBtn")!;
  const input = container.querySelector<HTMLInputElement>(".product.qty")!;
});
*/
