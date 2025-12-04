import { getCandyProductInfo } from "../services/candyAPI";
import { openOffCanvas } from "./offcan";

const allCardsContainerEl =
  document.querySelector<HTMLDivElement>(".allCardsContainer");
const cartAmountEl =
  document.querySelector<HTMLParagraphElement>(".cartAmount");
const cartTotalPriceEl =
  document.querySelector<HTMLParagraphElement>(".totalPrice");

let clickedCandyId = 0;
let cartArray: CartProduct[] = [];

class CartProduct {
  id: number;
  name: string;
  amount: number;
  price: number;
  thumbnail: string;

  get totalCost() {
    return this.amount * this.price;
  }

  constructor(
    id: number,
    name: string,
    amount: number,
    price: number,
    thumbnail: string
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}

//Spreada CandyResponse till en ny array och lägg på egenskapen amount på den.
export const increaseAmountOfProductInCart = function (clickedCandyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  candyFound!.amount++;
  console.log("CartArray after amount++", cartArray);
};

export const decreaseAmountOfProductInCart = function (clickedCandyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  if (candyFound && candyFound.amount === 1) {
    deleteProductFromCart(clickedCandyId);
  } else if (candyFound) {
    candyFound.amount--;
  }
  console.log("CartArray after amount--", cartArray);
  if (cartAmountEl) {
    cartAmountEl.innerText = `Nbr of  products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;
    cartTotalPriceEl!.innerText = `Total cost: ${String(
      getTotalCostOfProductsInCart()
    )}`;
  }
};

export const deleteProductFromCart = function (clickedCandyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  if (candyFound) {
    candyFound.amount = 0;
    cartArray = cartArray.filter((product) => product.id !== candyFound.id);
  }
};
//Gets nbr of kinds of candy at the moment, not total amount of candy.
export const getTotalAmountOfProductsInCart = function () {
  return cartArray.reduce((acc, curr) => acc + curr.amount, 0);
};
export const getTotalCostOfProductsInCart = function () {
  return cartArray.reduce((acc, curr) => acc + curr.totalCost, 0);
};

export const renderCart = function () {
  const cartContainerEl =
    document.querySelector<HTMLDivElement>(".cartContainer");
  // Render a card with added item
  if (cartContainerEl) {
    cartContainerEl!.innerHTML = cartArray
      .map((product) => {
        let thumbnailURL = `https://www.bortakvall.se${product.thumbnail}`;
        return `
        <div class="productItem container-fluid d-flex flex-row rounded-4 p-1" data-product-id="${product.id}" >
            <img src="${thumbnailURL}" width="50" class="img-fluid rounded-4 me-2" alt="Image of ${product.name}">
            <div class="container div-flex flex-column"
              <h5 class="card-title click fs-5 me-2">${product.name}</h5>
              <p class="me-2">${product.price}/skopa</p>
              <p class="me-2">Produktpris: ${product.totalCost}</p>
            </div>
            <div class="buttonContainer d-flex flex-row align-items-center">
            <button class="increaseBtn plusBtn" type="button">+</button>
            <p class="me-2">${product.amount}</p>
            <button class="decreaseBtn minusBtn me-2"  type="button">-</button>
            <button class="deleteBtn btn btn-sm btn-danger"><i class="bi bi-trash"></i></button>
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
  }
  const subtotalContainerEl = document.querySelector(
    ".subtotalContainer"
  ) as HTMLSpanElement;

  subtotalContainerEl.innerText = String(getTotalCostOfProductsInCart());
  const totalCostContainerEl = document.querySelector(
    ".totalCostContainer"
  ) as HTMLSpanElement;
  const shipping = 19;
  totalCostContainerEl.innerText = String(
    getTotalCostOfProductsInCart() + shipping
  );
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

//Adds clicked candy to cart, if exists, increase amount instead.
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

export const addToCart = async function (clickedCandyId: number) {
  let fetchedCandyObject = await getCandyProductInfo(clickedCandyId);
  let foundSameCandyInCart = cartArray.some(
    (product) => product.id === clickedCandyId
  );
  if (!foundSameCandyInCart) {
    const candyProduct = new CartProduct(
      fetchedCandyObject.data.id,
      fetchedCandyObject.data.name,
      1,
      fetchedCandyObject.data.price,
      fetchedCandyObject.data.images.thumbnail
    );

    cartArray.push(candyProduct);
    console.log("CartArray Contents", cartArray);
  } else if (foundSameCandyInCart) {
    const candyFound = cartArray.find(
      (product: CartProduct) => product.id === clickedCandyId
    );
    candyFound!.amount++;

    console.log("CartArray after amount++", cartArray);
  }
  renderCart();
};
