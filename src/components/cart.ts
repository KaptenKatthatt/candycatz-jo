import { getCandyProductInfo } from "../services/candyAPI";
import type { CartProduct } from "../services/candyApiTypes";
import {
  getCartArrayFromLocalStorage,
  saveCartArrayToLocalStorage,
} from "./localStorage";
import { openOffCanvas } from "./offcan";

const allCardsContainerEl =
  document.querySelector<HTMLDivElement>(".allCardsContainer");
const cartAmountEl =
  document.querySelector<HTMLParagraphElement>(".cartAmount");
const cartTotalPriceEl =
  document.querySelector<HTMLParagraphElement>(".totalPrice");
export const mainContainerEl = document.querySelector<HTMLDivElement>("main");

export let clickedCandyId = 0;
export let cartArray: CartProduct[] = getCartArrayFromLocalStorage() || [];
export const shipping = 19;

export const addToCart = async function (clickedCandyId: number) {
  let fetchedCandyObject = await getCandyProductInfo(clickedCandyId);
  const maxStock = fetchedCandyObject.data.stock_quantity;

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
      console.log(`Kan icke lägga till mer av ${candyFound!.name}`);
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
  // document.querySelector(".carousel")?.classList.remove("d-none");
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
         <div
            class="offCanCartListItem cartListItem"
            data-product-id="${product.id}"
          >
            
            <img
              src="${thumbnailURL}"
              class="cartThumbnail"
              alt="Image of ${product.name}"
            />
            <h3 class="offCanCartTitle fs-5">${product.name}</h3>


            <div class="offCanCartPrice">
              <p class=" me-2"><strong>${product.price}:-</strong>/skopa</p>
            </div>
            <div class="offCanCartTotal">
              <p>
                Totalt: <strong>${product.qty * product.price}:-</strong>
              </p>
            </div>

              <div class="buttonContainer d-flex flex-row align-items-center">
              <span class="smallButtonContainer">
                <button class="cartMinusBtn btn" type="button">
                  -
                </button>
                <p
                  class="cartQty"
                >
                  ${product.qty}
                </p>
                <button
                  class="cartPlusBtn btn"
                  type="button"
                  ${product.qty >= product.stock_quantity ? "disabled" : ""}
                >+</button>
                </span>
                <button class="deleteBtn ms-1 btn btn-sm btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
              </div>

          </div>

        `;
      })
      .join("");

    cartContainerEl.onclick = (e) => {
      const target = e.target as HTMLElement;
      const candyCard = target.closest<HTMLDivElement>(".cartListItem");
      clickedCandyId = Number(candyCard?.dataset.productId);

      if (target.closest(".cartPlusBtn")) {
        increaseAmountOfProductInCart(clickedCandyId);
      } else if (target.closest(".cartMinusBtn")) {
        decreaseAmountOfProductInCart(clickedCandyId);
      } else if (target.closest(".deleteBtn")) {
        deleteProductFromCart(clickedCandyId);
      }
      renderCart();
      renderCartBadge();
    };
  } else {
    cartContainerEl!.innerHTML = `
                    <img src="/img/sadcat.gif" alt="">

    <p class="py-5">
      Kundvagnen är tom just nu. Iväg o handla med dig!</p>`;
  }
  const subtotalContainerEl = document.querySelector(
    ".subtotalContainer"
  ) as HTMLSpanElement;

  // subtotalContainerEl.innerText = `${getTotalCostOfProductsInCart()} kr`;

  const totalCostContainerEl = document.querySelector(
    ".totalCostContainer"
  ) as HTMLSpanElement;

  totalCostContainerEl.innerHTML = `<strong>${String(
    getTotalCostOfProductsInCart()
  )} kr</strong>`;
  renderClearCart();
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
  if (target.closest(".addToCartBtn")) {
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
  if (target.closest(".clearCartBtn")) clearCart();
});
