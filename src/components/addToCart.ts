import { getCandyProductInfo } from "../services/candyAPI";
import { type CandyData } from "../services/candyApiTypes";

const allCardsContainerEl =
  document.querySelector<HTMLDivElement>(".allCardsContainer");

let clickedCandyId = 0;
const kindOfCandyInCartArr: CandyData[] = [];
let cartArray: CartProduct[] = [];

class CartProduct {
  id: number;
  name: string;
  amount: number;
  price: number;
  totalCost: number;

  updateTotalCost() {
    this.totalCost = this.amount * this.price;
  }

  constructor(
    id: number,
    name: string,
    amount: number,
    price: number,
    totalCost?: number
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.price = price;
    this.totalCost = 0;
  }
}

const increaseAmountOfProductInCart = function (candyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === candyId
  );
  candyFound!.amount++;
  candyFound!.updateTotalCost();
  console.log("CartArray after amount++", cartArray);
};

const decreaseAmountOfProductInCart = function (candyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === candyId
  );
  if (candyFound && candyFound.amount === 1) {
    deleteProductFromCart(candyId);
  } else if (candyFound) {
    candyFound.amount--;
  }
  candyFound!.updateTotalCost();
  console.log("CartArray after amount++", cartArray);
};

const deleteProductFromCart = function (candyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === candyId
  );
  //Find index of candyFound
  // Slice out index of candyFound
  cartArray = cartArray.filter((product) => product.id !== candyFound!.id);
};

const getTotalAmountOfProductsInCart = function () {
  return cartArray.length;
};

export const getClickedCandyId = function () {
  return clickedCandyId;
};

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

export const addToCart = async function (clickedCandyId: number) {
  let fetchedCandyObject = await getCandyProductInfo(clickedCandyId);
  console.log("Fetched candyObject", fetchedCandyObject);
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
    console.log("CartArray", cartArray);
  } else if (foundSameCandyInCart) {
    const candyFound = cartArray.find(
      (product: CartProduct) => product.id === clickedCandyId
    );
    candyFound!.amount++;
    candyFound!.updateTotalCost();
    console.log("CartArray after amount++", cartArray);
  }

  console.log("kindOfCandyInCartArr", kindOfCandyInCartArr);
  console.log(
    "Total amount of prods in cart",
    getTotalAmountOfProductsInCart()
  );
};
