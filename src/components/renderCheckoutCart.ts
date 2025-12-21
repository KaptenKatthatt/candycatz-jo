import { discountMultiplier, shipping } from "../main";
import {
  cartArray,
  increaseAmountOfProductInCart,
  decreaseAmountOfProductInCart,
  deleteProductFromCart,
  renderCartBadge,
  getTotalCostOfProductsInCart,
} from "./cart";

export const renderCheckoutCart = function () {
  let totalAmountSaved = 0;
  const checkoutCartContainerEl = document.querySelector<HTMLDivElement>(
    ".checkout-cart-container"
  );
  // Render a card with added item
  if (checkoutCartContainerEl) {
    checkoutCartContainerEl.innerHTML = cartArray
      .map((product) => {
        const thumbnailURL = `https://www.bortakvall.se${product.thumbnail}`;
        const productOnDiscount = product.on_sale ? "text-danger" : "text-dark";

        const productTotalPrice = product.qty * product.price;

        totalAmountSaved += product.on_sale
          ? productTotalPrice -
            Math.round(productTotalPrice * discountMultiplier)
          : 0;

        return `
          <div
            class="checkout-cart-list-item cart-list-item rounded-4"
            data-product-id="${product.id}"
          >
            <img
              src="${thumbnailURL}"
              class="checkout-thumbnail rounded-4"
              alt="Image of ${product.name}"
            />
            <h3 class="checkout-cart-title fs-5">${product.name}</h3>
            <p class="checkout-cart-price"><strong class="${productOnDiscount}">${
          product.price
        }:-</strong>/skopa</p>
            <p class="checkout-cart-total">Totalt: <strong>${
              product.qty * product.price
            }:-</strong></p>

            <div class="button-container d-flex flex-row align-items-center">
            <span class="small-button-container">
              <button class="cart-minus-btn btn" type="button" aria-label="Decrease number of product in cart.">
                -
              </button>
              <p class="cart-qty d-flex align-items-center justify-content-center">
                ${product.qty}
              </p>
              <button
                class="cart-plus-btn btn"
                type="button"
                ${product.qty >= product.stock_quantity ? "disabled" : ""}
              >
                +
              </button>
              </span>
              <button class="delete-btn btn btn-sm btn-danger ms-2" aria-label="Delete product from cart.">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        `;
      })
      .join("");

    checkoutCartContainerEl.onclick = (e) => {
      const target = e.target as HTMLElement;
      const candyCard = target.closest<HTMLDivElement>(".cart-list-item");
      const productId = Number(candyCard?.dataset.productId);

      if (target.closest(".cart-plus-btn")) {
        increaseAmountOfProductInCart(productId);
      } else if (target.closest(".cart-minus-btn")) {
        decreaseAmountOfProductInCart(productId);
      } else if (target.closest(".delete-btn")) {
        deleteProductFromCart(productId);
      }
      renderCheckoutCart();
      renderCartBadge();
    };
  }
  const checkoutSubtotalContainerEl = document.querySelector(
    ".checkout-subtotal-container"
  ) as HTMLSpanElement;

  if (checkoutSubtotalContainerEl) {
    checkoutSubtotalContainerEl.innerText = `${getTotalCostOfProductsInCart()} kr`;
  }

  const totalCostContainerEl = document.querySelector(
    ".total-cost-container"
  ) as HTMLSpanElement;
  const checkoutTotalCostContainerEl = document.querySelector(
    ".checkout-total-cost-container"
  ) as HTMLSpanElement;

  totalCostContainerEl.innerHTML = `<strong>${String(
    getTotalCostOfProductsInCart() + shipping
  )} kr</strong>`;
  checkoutTotalCostContainerEl.innerHTML = `<strong>${String(
    getTotalCostOfProductsInCart() + shipping
  )} kr</strong>`;

  const haveDiscountContainerEl = document.querySelector<HTMLDivElement>(
    ".have-discount-container"
  );
  if (haveDiscountContainerEl) {
    if (totalAmountSaved > 0) {
      haveDiscountContainerEl.innerHTML = `
      <span class="text-danger">Rabatt avdragen</span>
      <span class="amount-saved-container text-danger">${totalAmountSaved} kr</span>`;
    } else {
      haveDiscountContainerEl.innerHTML = "";
    }
  }
};
