import { getCandyProductInfo } from "../services/candyAPI";
import {
  getCartArrayFromLocalStorage,
  saveCartArrayToLocalStorage,
} from "./localStorage";
import { openOffCanvas, renderClearCartBtn, renderOffCan } from "./offcan";

const allCardsContainerEl =
  document.querySelector<HTMLDivElement>(".allCardsContainer");
const cartAmountEl =
  document.querySelector<HTMLParagraphElement>(".cartAmount");
const cartTotalPriceEl =
  document.querySelector<HTMLParagraphElement>(".totalPrice");

let clickedCandyId = 0;
let cartArray: CartProduct[] = getCartArrayFromLocalStorage() || [];
const shipping = 19;

export interface CartProduct {
  id: number;
  name: string;
  qty: number;
  price: number;
  thumbnail: string;
}

export const addToCart = async function (clickedCandyId: number) {
  let fetchedCandyObject = await getCandyProductInfo(clickedCandyId);
  let foundSameCandyInCart = cartArray.some(
    (product) => product.id === clickedCandyId
  );
  if (!foundSameCandyInCart) {
    const candyProduct: CartProduct = {
      id: fetchedCandyObject.data.id,
      name: fetchedCandyObject.data.name,
      qty: 1,
      price: fetchedCandyObject.data.price,
      thumbnail: fetchedCandyObject.data.images.thumbnail,
    };

    cartArray.push(candyProduct);
    console.log("CartArray Contents", cartArray);
  } else if (foundSameCandyInCart) {
    const candyFound = cartArray.find(
      (product: CartProduct) => product.id === clickedCandyId
    );
    candyFound!.qty++;

    // console.log("CartArray after qty++", cartArray);
  }
  renderCart();
  saveCartArrayToLocalStorage(cartArray);
  console.log("CartArray from local storage", getCartArrayFromLocalStorage());
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
  saveCartArrayToLocalStorage(cartArray);
};

//Spreada CandyResponse till en ny array och lägg på egenskapen qty på den.
export const increaseAmountOfProductInCart = function (clickedCandyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  candyFound!.qty++;
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
    document.querySelector<HTMLDivElement>(".cartContainer");
  // Render a card with added item
  if (cartContainerEl && cartArray.length > 0) {
    cartContainerEl.innerHTML = cartArray
      .map((product) => {
        let thumbnailURL = `https://www.bortakvall.se${product.thumbnail}`;
        return `
        <div class="productItem container-fluid d-flex flex-row" data-product-id="${
          product.id
        }">
        <img src="${thumbnailURL}" class="img-fluid rounded-4 me-2 w-25" alt="Image of ${
          product.name
        }">
        <div class="container div-flex flex-column justify-content-center align-items-center">
        <h5 class="card-title click fs-5 me-2">${product.name}</h5>
          <p class="me-2"><strong>${product.price}:-</strong>/skopa</p>
          <p class="me-2">Produktpris: <strong>${
            product.qty * product.price
          }:-</strong></p>
          </div>
          <div class="buttonContainer d-flex flex-row align-items-center">
          <button class="decreaseBtn minusBtn me-2" type="button">-</button>
          <p class="me-2 d-flex align-items-center justify-content-center m-0">${
            product.qty
          }</p>
          <button class="increaseBtn plusBtn me-2" type="button">+</button>
          <button class="deleteBtn btn btn-danger"><i class="bi bi-trash"></i></button>
          </div>
        </div>
          <hr>

        `;
      })
      .join("");

    cartContainerEl.onclick = (e) => {
      const target = e.target as HTMLElement;
      const candyCard = target.closest<HTMLDivElement>(".productItem");
      clickedCandyId = Number(candyCard?.dataset.productId);

      if (target.closest(".increaseBtn")) {
        increaseAmountOfProductInCart(clickedCandyId);
      } else if (target.closest(".decreaseBtn")) {
        decreaseAmountOfProductInCart(clickedCandyId);
      } else if (target.closest(".deleteBtn")) {
        deleteProductFromCart(clickedCandyId);
      }
      renderCart();
      renderCartBadge();
    };
  } else {
    cartContainerEl!.innerHTML = `<p class="py-5">
      Kundvagnen är tom just nu. Iväg o handla med dig!</p>`;
  }
  const subtotalContainerEl = document.querySelector(
    ".subtotalContainer"
  ) as HTMLSpanElement;

  subtotalContainerEl.innerText = `${getTotalCostOfProductsInCart()} kr`;
  // const shippingCostContainerEl = document.querySelector<HTMLSpanElement>(
  //   ".shippingCostContainer"
  // );
  // shippingCostContainerEl!.innerText = `${shipping} kr`;
  const totalCostContainerEl = document.querySelector(
    ".totalCostContainer"
  ) as HTMLSpanElement;
  totalCostContainerEl.innerHTML = `<strong>${String(
    getTotalCostOfProductsInCart() + shipping
  )} kr</strong>`;

  renderClearCartBtn();
};

export const renderCartBadge = function () {
  const navCartBadgeEl =
    document.querySelector<HTMLSpanElement>(".navCartBadge");
  if (navCartBadgeEl) {
    navCartBadgeEl.innerText = String(getTotalAmountOfProductsInCart());
  } else {
    console.log("navCartBadgeEl does not exist yet.");
  }
};

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
        <div class="productItem container-fluid d-flex flex-row rounded-4 p-1" data-product-id="${
          product.id
        }">
        <img src="${thumbnailURL}" class="img-fluid w-25 rounded-4 border border-dark me-2" alt="Image of ${
          product.name
        }">
        <div class="container div-flex flex-column justify-content-center">
        <h5 class="card-title click fs-5 me-2">${product.name}</h5>
          <p class="me-2"><strong>${product.price}:-</strong>/skopa</p>
          <p class="me-2">Produktpris: <strong>${
            product.qty * product.price
          }:-</strong></p>
          </div>
          <div class="buttonContainer d-flex flex-row align-items-center">
            <button class="decreaseBtn minusBtn me-2" type="button">-</button>
            <p class="me-2 d-flex align-items-center justify-content-center m-0">${
              product.qty
            }</p>
            <button class="increaseBtn plusBtn me-2" type="button">+</button>
            <button class="deleteBtn btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
          </div>
        </div>

        `;
      })
      .join("");

    checkoutCartContainerEl.onclick = (e) => {
      const target = e.target as HTMLElement;
      const candyCard = target.closest<HTMLDivElement>(".productItem");
      clickedCandyId = Number(candyCard?.dataset.productId);

      if (target.closest(".increaseBtn")) {
        increaseAmountOfProductInCart(clickedCandyId);
      } else if (target.closest(".decreaseBtn")) {
        decreaseAmountOfProductInCart(clickedCandyId);
      } else if (target.closest(".deleteBtn")) {
        deleteProductFromCart(clickedCandyId);
      }
      renderCheckoutCart();
      renderCartBadge();
    };
  }
  const subtotalContainerEl = document.querySelector(
    ".subtotalContainer"
  ) as HTMLSpanElement;

  subtotalContainerEl.innerText = `${getTotalCostOfProductsInCart()} kr`;
  const shipping = 19;
  // const shippingCostContainerEl = document.querySelector<HTMLSpanElement>(
  //   ".shippingCostContainer"
  // );
  // shippingCostContainerEl!.innerText = `${shipping} kr`;
  const totalCostContainerEl = document.querySelector(
    ".totalCostContainer"
  ) as HTMLSpanElement;
  totalCostContainerEl.innerHTML = `<strong>${String(
    getTotalCostOfProductsInCart() + shipping
  )} kr</strong>`;
};

//Adds clicked candy to cart, if exists, increase qty instead.
allCardsContainerEl?.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;
  if (target.closest(".addToCartBtn")) {
    const candyCard = target.closest<HTMLDivElement>(".card");
    clickedCandyId = Number(candyCard?.dataset.productId);
    await addToCart(clickedCandyId);
    renderCartBadge();
    renderCart();
    openOffCanvas();
  }
});

//SOPHIAS KOD HÄR UNDER. INTRUDERS WILL BE SHOT ON SIGHT.
