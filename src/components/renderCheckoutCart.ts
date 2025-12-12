import {
  cartArray,
  increaseAmountOfProductInCart,
  decreaseAmountOfProductInCart,
  deleteProductFromCart,
  renderCartBadge,
  getTotalCostOfProductsInCart,
  shipping,
} from "./cart";

export const renderCheckoutCart = function () {
  const checkoutCartContainerEl = document.querySelector<HTMLDivElement>(
    ".checkoutCartContainer"
  );
  // Render a card with added item
  if (checkoutCartContainerEl) {
    checkoutCartContainerEl.innerHTML = cartArray
      .map((product) => {
        let thumbnailURL = `https://www.bortakvall.se${product.thumbnail}`;
        return `
          <div
            class="checkoutCartListItem cartListItem d-flex flex-column flex-md-row rounded-4 p-1 "
            data-product-id="${product.id}"
          >
            <img
              src="${thumbnailURL}"
              class="checkOutThumbnail img-fluid rounded-4 border border-dark me-2"
              alt="Image of ${product.name}"
            />

            <div class="container div-flex flex-row justify-content-center">
              <h5 class="card-title checkOutCartTitle click fs-5 me-2">${
                product.name
              }</h5>
              <p class="checkOutCartPrice me-2"><strong>${
                product.price
              }:-</strong>/skopa</p>
              <p class="checkOutCartTootalme-2">
                Produktpris: <strong>${product.qty * product.price}:-</strong>
              </p>
            </div>
            <div class="buttonContainer d-flex flex-row align-items-center">
              <button class="decreaseBtn cartMinusBtn btn me-2" type="button">
                -
              </button>
              <p
                class="checkOutCartQty me-2 d-flex align-items-center justify-content-center m-0"
              >
                ${product.qty}
              </p>
              <button
                class="increaseBtn cartPlusBtn btn me-2"
                type="button"
                ${product.qty >= product.stock_quantity ? "disabled" : ""}
              >
                +
              </button>
              <button class="deleteBtn btn btn-sm btn-danger">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        `;
      })
      .join("");

    checkoutCartContainerEl.onclick = (e) => {
      const target = e.target as HTMLElement;
      const candyCard = target.closest<HTMLDivElement>(".cartListItem");
      const productId = Number(candyCard?.dataset.productId);

      if (target.closest(".increaseBtn")) {
        increaseAmountOfProductInCart(productId);
      } else if (target.closest(".decreaseBtn")) {
        decreaseAmountOfProductInCart(productId);
      } else if (target.closest(".deleteBtn")) {
        deleteProductFromCart(productId);
      }
      renderCheckoutCart();
      renderCartBadge();
    };
  }

  const subtotalContainerEl = document.querySelector(
    ".subtotalContainer"
  ) as HTMLSpanElement;

  subtotalContainerEl.innerText = `${getTotalCostOfProductsInCart()} kr`;
  const totalCostContainerEl = document.querySelector(
    ".totalCostContainer"
  ) as HTMLSpanElement;
  totalCostContainerEl.innerHTML = `<strong>${String(
    getTotalCostOfProductsInCart() + shipping
  )} kr</strong>`;
};
