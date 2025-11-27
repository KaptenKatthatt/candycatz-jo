export const offCan = document.querySelector<HTMLDivElement>("#offCan")!;

export const renderOffCan = function () {
  offCan.innerHTML = `
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Your Candy Cart🍬 </h5><i class="bi bi-cart4 fs-3"></i>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    Cart details here
  </div>



<div class="candyCart-btn-container">
<div class="qty-controls"> 

  <button class = "minusBtn" data-action="minus" type = "button">-</button>

  <input class = "product-qty" type="number" name= "product-qty" min="0" max="10" value="1"> 

  <button class = "plusBtn" data-action= "plus" type = "button">+</button>


</div>
</div>
`;
};
