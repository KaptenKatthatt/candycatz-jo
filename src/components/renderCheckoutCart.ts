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
  let totalAmountSaved = 0;
  const checkoutCartContainerEl = document.querySelector<HTMLDivElement>(
    ".checkoutCartContainer"
  );
  // Render a card with added item
  if (checkoutCartContainerEl) {
    checkoutCartContainerEl.innerHTML = cartArray
      .map((product) => {
        let thumbnailURL = `https://www.bortakvall.se${product.thumbnail}`;
        let productOnDiscount = product.on_sale ? "text-danger" : "text-dark";

        const productTotalPrice = product.qty * product.price;

        totalAmountSaved += product.on_sale
          ? productTotalPrice - Math.round(productTotalPrice * 0.7)
          : 0;

        return `
          <div
            class="checkoutCartListItem cartListItem rounded-4"
            data-product-id="${product.id}"
          >
            <img
              src="${thumbnailURL}"
              class="checkOutThumbnail rounded-4"
              alt="Image of ${product.name}"
            />
            <h3 class="checkOutCartTitle fs-5">${product.name}</h3>
            <p class="checkOutCartPrice"><strong class="${productOnDiscount}">${
          product.price
        }:-</strong>/skopa</p>
            <p class="checkOutCartTotal">Totalt: <strong>${
              product.qty * product.price
            }:-</strong></p>

            <div class="buttonContainer d-flex flex-row align-items-center">
            <span class="smallButtonContainer">
              <button class="cartMinusBtn btn" type="button">
                -
              </button>
              <p class="cartQty d-flex align-items-center justify-content-center">
                ${product.qty}
              </p>
              <button
                class="cartPlusBtn btn"
                type="button"
                ${product.qty >= product.stock_quantity ? "disabled" : ""}
              >
                +
              </button>
              </span>
              <button class="deleteBtn btn btn-sm btn-danger ms-2">
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

      if (target.closest(".cartPlusBtn")) {
        increaseAmountOfProductInCart(productId);
      } else if (target.closest(".cartMinusBtn")) {
        decreaseAmountOfProductInCart(productId);
      } else if (target.closest(".deleteBtn")) {
        deleteProductFromCart(productId);
      }
      renderCheckoutCart();
      renderCartBadge();
    };
  }
  const checkoutSubtotalContainerEl = document.querySelector(
    ".checkoutSubtotalContainer"
  ) as HTMLSpanElement;

  checkoutSubtotalContainerEl.innerText = `${getTotalCostOfProductsInCart()} kr`;

  const totalCostContainerEl = document.querySelector(
    ".totalCostContainer"
  ) as HTMLSpanElement;
  const checkoutTotalCostContainerEl = document.querySelector(
    ".checkoutTotalCostContainer"
  ) as HTMLSpanElement;

  totalCostContainerEl.innerHTML = `<strong>${String(
    getTotalCostOfProductsInCart() + shipping
  )} kr</strong>`;
  checkoutTotalCostContainerEl.innerHTML = `<strong>${String(
    getTotalCostOfProductsInCart() + shipping
  )} kr</strong>`;

  const haveDiscountContainerEl = document.querySelector<HTMLDivElement>(
    ".haveDiscountContainer"
  );
  if (haveDiscountContainerEl && totalAmountSaved > 0) {
    haveDiscountContainerEl.innerHTML = `
      <span class="text-danger">Rabatt avdragen</span>
      <span class="amountSavedContainer text-danger">${totalAmountSaved} kr</span>`;
  } else {
    haveDiscountContainerEl!.innerHTML = "";
  }
};
