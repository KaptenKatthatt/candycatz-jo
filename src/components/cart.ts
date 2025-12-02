import { getCandyProductInfo } from "../services/candyAPI";
import { type CandyData, type CandyResponse } from "../services/candyApiTypes";

const allCardsContainerEl =
  document.querySelector<HTMLDivElement>(".allCardsContainer");
const increaseBtnEl = document.querySelector<HTMLButtonElement>(".increaseBtn");
const decreaseBtnEl = document.querySelector<HTMLButtonElement>(".decreaseBtn");
const deleteBtnEl = document.querySelector<HTMLButtonElement>(".deleteBtn");
const cartAmountEl =
  document.querySelector<HTMLParagraphElement>(".cartAmount");
const cartContentsEl =
  document.querySelector<HTMLParagraphElement>(".cartContents");
const cartTotalPriceEl =
  document.querySelector<HTMLParagraphElement>(".totalPrice");

let clickedCandyId = 0;
const kindOfCandyInCartArr: CandyResponse[] = [];
let cartArray: CartProduct[] = [];

class CartProduct {
  id: number;
  name: string;
  amount: number;
  price: number;

  get totalCost() {
    return this.amount * this.price;
  }

  constructor(id: number, name: string, amount: number, price: number) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.price = price;
  }
}

export const increaseAmountOfProductInCart = function (candyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  candyFound!.amount++;
  console.log("CartArray after amount++", cartArray);
  if (cartAmountEl) {
    cartAmountEl.innerText = `Nbr of products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;

    cartTotalPriceEl!.innerText = `Total cost: ${String(
      getTotalCostOfProductsInCart()
    )}`;
  }
  cartContentsEl!.innerText = `Nbr of ${candyFound!.name} ${String(
    candyFound!.amount
  )}`;
};

export const decreaseAmountOfProductInCart = function (candyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  if (candyFound && candyFound.amount === 1) {
    deleteProductFromCart(clickedCandyId);
  } else if (candyFound) {
    candyFound.amount--;
  }
  // candyFound!.updateTotalCost();
  console.log("CartArray after amount--", cartArray);
  if (cartAmountEl) {
    cartAmountEl.innerText = `Nbr of  products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;
    cartTotalPriceEl!.innerText = `Total cost: ${String(
      getTotalCostOfProductsInCart()
    )}`;
  }
  cartContentsEl!.innerText = `Nbr of ${candyFound!.name} ${String(
    candyFound!.amount
  )}`;
};

export const deleteProductFromCart = function (candyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === candyId
  );
  cartArray = cartArray.filter((product) => product.id !== candyFound!.id);
};
//Gets nbr of kinds of candy at the moment, not total amount of candy.
export const getTotalAmountOfProductsInCart = function () {
  return cartArray.reduce((acc, curr) => acc + curr.amount, 0);
};
export const getTotalCostOfProductsInCart = function () {
  return cartArray.reduce((acc, curr) => acc + curr.totalCost, 0);
};

const renderCart = function () {
  //Populate cart with cards of items. Used for add/delete increase/decrease.
  //
};
const renderItemCardInCart = function (candyId) {
  // Render a card with added item
};

// export const getClickedCandyId = function () {
//   return clickedCandyId;
// };

//Adds clicked candy to cart, if exists, increase amount instead.
allCardsContainerEl?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("bi-basket")) {
    const candyCard = target.closest<HTMLDivElement>(".card");
    clickedCandyId = Number(candyCard?.dataset.productId);
    // console.log("Clicked candyId", clickedCandyId);
    addToCart(clickedCandyId);
  }
});

increaseBtnEl?.addEventListener("click", () => {
  increaseAmountOfProductInCart(6600);
});
decreaseBtnEl?.addEventListener("click", () => {
  decreaseAmountOfProductInCart(6600);
});
deleteBtnEl?.addEventListener("click", () => {
  deleteProductFromCart(6600);
});

export const addToCart = async function (clickedCandyId: number) {
  let fetchedCandyObject = await getCandyProductInfo(clickedCandyId);
  // console.log("Fetched candyObject", fetchedCandyObject);
  let foundSameCandyInCart = kindOfCandyInCartArr.some(
    (product) => product.data.id === clickedCandyId
  );
  if (!foundSameCandyInCart) {
    kindOfCandyInCartArr.push(fetchedCandyObject);
    const candyProduct = new CartProduct(
      fetchedCandyObject.data.id,
      fetchedCandyObject.data.name,
      1,
      fetchedCandyObject.data.price
    );

    cartArray.push(candyProduct);
    console.log("CartArray Contents", cartArray);
  } else if (foundSameCandyInCart) {
    const candyFound = cartArray.find(
      (product: CartProduct) => product.id === clickedCandyId
    );
    candyFound!.amount++;
    cartContentsEl!.innerText = `Nbr of ${candyFound!.name} ${String(
      candyFound!.amount
    )}`;
    cartContentsEl!.innerText = `Nbr of ${candyFound!.name} ${String(
      candyFound!.amount
    )}`;

    // candyFound!.updateTotalCost();
    console.log("CartArray after amount++", cartArray);
  }

  // console.log("kindOfCandyInCartArr", kindOfCandyInCartArr);
  console.log(
    "Total amount of prods in cart",
    getTotalAmountOfProductsInCart()
  );
  if (cartAmountEl) {
    cartAmountEl.innerText = `Nbr of  products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;
  }
  cartTotalPriceEl!.innerText = `Total cost: ${String(
    getTotalCostOfProductsInCart()
  )}`;
};
