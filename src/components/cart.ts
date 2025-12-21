import { discountMultiplier } from "../main";
import { getCandyProductInfo } from "../services/candyAPI";
import type { CartProduct } from "../services/candyApiTypes";
import {
  getCartArrayFromLocalStorage,
  saveCartArrayToLocalStorage,
} from "./localStorage";
import { openOffCanvas } from "./offcan";
import { renderCheckoutCart } from "./renderCheckoutCart";

const allCardsContainerEl = document.querySelector<HTMLDivElement>(
  ".all-cards-container"
);
const cartAmountEl =
  document.querySelector<HTMLParagraphElement>(".cartAmount");
const cartTotalPriceEl =
  document.querySelector<HTMLParagraphElement>(".totalPrice");
export const mainContainerEl = document.querySelector<HTMLDivElement>("main");

export let clickedCandyId = 0;
export let cartArray: CartProduct[] = getCartArrayFromLocalStorage() || [];

export const addToCart = async function (clickedCandyId: number) {
  const fetchedCandyObject = await getCandyProductInfo(clickedCandyId);
  const maxStock = fetchedCandyObject.data.stock_quantity;
  const candyPrice = fetchedCandyObject.data.on_sale
    ? Math.round(fetchedCandyObject.data.price * discountMultiplier)
    : fetchedCandyObject.data.price;
  const foundSameCandyInCart = cartArray.some(
    (product) => product.id === clickedCandyId
  );
  if (!foundSameCandyInCart) {
    const candyProduct: CartProduct = {
      id: fetchedCandyObject.data.id,
      name: fetchedCandyObject.data.name,
      qty: 1,
      price: candyPrice,
      thumbnail: fetchedCandyObject.data.images.thumbnail,
      on_sale: fetchedCandyObject.data.on_sale,
      stock_quantity: maxStock,
    };

    cartArray.push(candyProduct);
  } else if (foundSameCandyInCart) {
    const candyFound = cartArray.find(
      (product: CartProduct) => product.id === clickedCandyId
    );

    if (candyFound!.qty < candyFound!.stock_quantity) {
      candyFound!.qty++;
    } else {
      alert(`Kan icke lägga till mer av ${candyFound!.name}, slut i lager.`);
    }
  }
  renderCart();
  saveCartArrayToLocalStorage(cartArray);
};

export const clearCart = function () {
  localStorage.removeItem("candyCartArray");
  initStore();
};

export const decreaseAmountOfProductInCart = function (clickedCandyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  if (candyFound && candyFound.qty === 1) {
    deleteProductFromCart(clickedCandyId);
  } else if (candyFound) {
    candyFound.qty--;
  }
  if (cartAmountEl) {
    cartAmountEl.innerText = `Nbr of  products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;
    cartTotalPriceEl!.innerText = `Total cost: ${String(
      getTotalCostOfProductsInCart()
    )}`;
  }
  saveCartArrayToLocalStorage(cartArray);
};

export const deleteProductFromCart = function (clickedCandyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  if (candyFound) {
    candyFound.qty = 0;
    cartArray = cartArray.filter((product) => product.id !== candyFound.id);
  }
  renderCheckoutCart();
  saveCartArrayToLocalStorage(cartArray);
};

//Spread CandyResponse to new array and add qty property.
export const increaseAmountOfProductInCart = function (clickedCandyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  if (candyFound && candyFound.qty < candyFound.stock_quantity) {
    candyFound!.qty++; //Stop increase if qty is less than stockqty
  }
  saveCartArrayToLocalStorage(cartArray);
};

export const initStore = function () {
  cartArray = getCartArrayFromLocalStorage() || [];
  renderCart();
  renderCartBadge();
};
//Gets nbr of kinds of candy at the moment, not total qty of candy.
export const getTotalAmountOfProductsInCart = function () {
  return cartArray.reduce((acc, curr) => acc + curr.qty, 0);
};
export const getTotalCostOfProductsInCart = function () {
  return cartArray.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
};

export const renderCart = function () {
  const cartContainerEl =
    document.querySelector<HTMLDivElement>(".cart-container");
  // Render a card with added item
  if (cartContainerEl && cartArray.length > 0) {
    cartContainerEl.innerHTML = cartArray
      .map((product: CartProduct) => {
        const productOnDiscount = product.on_sale ? "text-danger" : "text-dark";

        const thumbnailURL = `https://www.bortakvall.se${product.thumbnail}`;
        return `
         <div
            class="off-can-cart-list-item cart-list-item"
            data-product-id="${product.id}"
          >
            
            <img
              src="${thumbnailURL}"
              class="cart-thumbnail"
              alt="Image of ${product.name}"
            />
            <h3 class="off-can-cart-title fs-5">${product.name}</h3>

            <div class="off-can-cart-price">
              <p class="me-2"><strong class=" ${productOnDiscount}">${
          product.price
        }:-</strong>/skopa</p>
            </div>
            <div class="off-can-cart-total">
              <p>
                Totalt: <strong>${product.qty * product.price}:-</strong>
              </p>
            </div>

              <div class="button-container d-flex flex-row align-items-center">
              <span class="small-button-container">
                <button class="cart-minus-btn btn" type="button" aria-label="Decrease number of product in cart">
                  -
                </button>
                <p
                  class="cart-qty"
                >
                  ${product.qty}
                </p>
                <button
                  class="cart-plus-btn btn"
                  type="button"
                  ${product.qty >= product.stock_quantity ? "disabled" : ""}
                >+</button>
                </span>
                <button class="delete-btn ms-1 btn btn-sm btn-danger" aria-label="Delete product from cart">
                  <i class="bi bi-trash"></i>
                </button>
              </div>

          </div>

        `;
      })
      .join("");
    document
      .querySelector<HTMLDivElement>(".heart-cat-container")!
      .classList.remove("d-none");
    document
      .querySelector<HTMLDivElement>(".checkout-btn")!
      .classList.remove("d-none");
    document.querySelector<HTMLDivElement>(
      ".heart-cat-container"
    )!.innerHTML = `<img class="rounded-4 w-100 my-3" src="/img/heartCat.gif" alt="Happy cat with hearts">`;

    cartContainerEl.onclick = (e) => {
      const target = e.target as HTMLElement;
      const candyCard = target.closest<HTMLDivElement>(".cart-list-item");
      clickedCandyId = Number(candyCard?.dataset.productId);

      if (target.closest(".cart-plus-btn")) {
        increaseAmountOfProductInCart(clickedCandyId);
      } else if (target.closest(".cart-minus-btn")) {
        decreaseAmountOfProductInCart(clickedCandyId);
      } else if (target.closest(".delete-btn")) {
        deleteProductFromCart(clickedCandyId);
      }
      renderCart();
      renderCartBadge();
    };
  } else {
    document
      .querySelector<HTMLDivElement>(".heart-cat-container")
      ?.classList.add("d-none");
    document
      .querySelector<HTMLDivElement>(".checkout-btn")!
      .classList.add("d-none");
    cartContainerEl!.innerHTML = `
                    <img src="/img/sadcat.gif" alt="">

    <p class="py-5">
      Kundvagnen är tom just nu. Iväg o handla med dig!</p>`;
  }

  const totalCostContainerEl = document.querySelector(
    ".total-cost-container"
  ) as HTMLSpanElement;

  totalCostContainerEl.innerHTML = `<strong>${String(
    getTotalCostOfProductsInCart()
  )} kr</strong>`;
  renderClearCart();
};

export const renderCartBadge = function () {
  const navbarCartBadgeEl =
    document.querySelector<HTMLSpanElement>(".navbar-cart-badge");
  if (navbarCartBadgeEl) {
    navbarCartBadgeEl.innerText = String(getTotalAmountOfProductsInCart());
  } else {
    console.log("navbarCartBadgeEl does not exist yet.");
  }
};

const renderClearCart = function () {
  if (getCartArrayFromLocalStorage().length === 0) {
    document.querySelector(".cart-summary")?.classList.add("d-none");
    document.querySelector(".clearCartBtn")?.classList.add("d-none");
  } else {
    document.querySelector(".cart-summary")?.classList.remove("d-none");
    document.querySelector(".clearCartBtn")?.classList.remove("d-none");
  }
};

//Adds clicked candy to cart, if exists, increase qty instead.
allCardsContainerEl?.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;
  if (target.closest(".add-to-cart-btn")) {
    const candyCard = target.closest<HTMLDivElement>(".card");
    clickedCandyId = Number(candyCard?.dataset.productId);
    await addToCart(clickedCandyId);

    renderCartBadge();
    openOffCanvas();
  }
});

//Clear cart btn listener
mainContainerEl!.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.closest(".clear-cart-btn")) clearCart();
});
