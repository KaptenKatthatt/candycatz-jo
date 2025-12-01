import { getCandyProductInfo } from "../services/candyAPI";
import { type CandyData } from "../services/candyApiTypes";

const allCardsContainerEl =
  document.querySelector<HTMLDivElement>(".allCardsContainer");
const increaseBtnEl = document.querySelector<HTMLButtonElement>(".increaseBtn");
const decreaseBtnEl = document.querySelector<HTMLButtonElement>(".decreaseBtn");
const deleteBtnEl = document.querySelector<HTMLButtonElement>(".deleteBtn");
const cartAmountEl =
  document.querySelector<HTMLParagraphElement>(".cartAmount");
const cartContentsEl =
  document.querySelector<HTMLParagraphElement>(".cartContents");
<<<<<<< HEAD
const cartTotalPriceEl =
  document.querySelector<HTMLParagraphElement>(".totalPrice");
=======
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)

let clickedCandyId = 0;
const kindOfCandyInCartArr: CandyData[] = [];
let cartArray: CartProduct[] = [];

class CartProduct {
  id: number;
  name: string;
  amount: number;
  price: number;
<<<<<<< HEAD

  get totalCost() {
    return this.amount * this.price;
  }

  constructor(id: number, name: string, amount: number, price: number) {
=======
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
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.price = price;
<<<<<<< HEAD
=======
    this.totalCost = 0;
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)
  }
}

export const increaseAmountOfProductInCart = function (candyId: number) {
  const candyFound = cartArray.find(
<<<<<<< HEAD
    (product: CartProduct) => product.id === clickedCandyId
  );
  candyFound!.amount++;
=======
    (product: CartProduct) => product.id === candyId
  );
  candyFound!.amount++;
  candyFound!.updateTotalCost();
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)
  console.log("CartArray after amount++", cartArray);
  if (cartAmountEl) {
    cartAmountEl.innerText = `Nbr of products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;
<<<<<<< HEAD

    cartTotalPriceEl!.innerText = `Total cost: ${String(
      getTotalCostOfProductsInCart()
    )}`;
  }
  cartContentsEl!.innerText = `Nbr of ${candyFound!.name} ${String(
    candyFound!.amount
  )}`;
=======
  }
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)
};

export const decreaseAmountOfProductInCart = function (candyId: number) {
  const candyFound = cartArray.find(
<<<<<<< HEAD
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
=======
    (product: CartProduct) => product.id === candyId
  );
  if (candyFound && candyFound.amount === 1) {
    deleteProductFromCart(candyId);
  } else if (candyFound) {
    candyFound.amount--;
  }
  candyFound!.updateTotalCost();
  console.log("CartArray after amount--", cartArray);
  if (cartAmountEl) {
    cartAmountEl.innerText = `Nbr of products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;
  }
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)
};

export const deleteProductFromCart = function (candyId: number) {
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === candyId
  );
<<<<<<< HEAD
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
=======
  //Find index of candyFound
  // Slice out index of candyFound
  cartArray = cartArray.filter((product) => product.id !== candyFound!.id);
};

export const getTotalAmountOfProductsInCart = function () {
  return cartArray.length;
};

export const getClickedCandyId = function () {
  return clickedCandyId;
};
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)

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
<<<<<<< HEAD
  // console.log("Fetched candyObject", fetchedCandyObject);
=======
  console.log("Fetched candyObject", fetchedCandyObject);
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)
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
<<<<<<< HEAD
    console.log("CartArray Contents", cartArray);
=======
    console.log("CartArray", cartArray);
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)
  } else if (foundSameCandyInCart) {
    const candyFound = cartArray.find(
      (product: CartProduct) => product.id === clickedCandyId
    );
    candyFound!.amount++;
<<<<<<< HEAD
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
=======
    candyFound!.updateTotalCost();
    console.log("CartArray after amount++", cartArray);
  }

  console.log("kindOfCandyInCartArr", kindOfCandyInCartArr);
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)
  console.log(
    "Total amount of prods in cart",
    getTotalAmountOfProductsInCart()
  );
  if (cartAmountEl) {
<<<<<<< HEAD
    cartAmountEl.innerText = `Nbr of  products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;
  }
  cartTotalPriceEl!.innerText = `Total cost: ${String(
    getTotalCostOfProductsInCart()
  )}`;
=======
    cartAmountEl.innerText = `Nbr of products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;
  }
>>>>>>> 23ac9b6 (Added testbuttons for +, -  and delete to index.html.)
};
