import { getCandyProductInfo } from "../services/candyAPI";
// import { type CandyData, type CandyResponse } from "../services/candyApiTypes";

const allCardsContainerEl =
  document.querySelector<HTMLDivElement>(".allCardsContainer");
// const increaseBtnEl = document.querySelector<HTMLButtonElement>(".increaseBtn");
// const decreaseBtnEl = document.querySelector<HTMLButtonElement>(".decreaseBtn");
// const deleteBtnEl = document.querySelector<HTMLButtonElement>(".deleteBtn");
const cartAmountEl =
  document.querySelector<HTMLParagraphElement>(".cartAmount");
const cartContentsEl =
  document.querySelector<HTMLParagraphElement>(".cartContents");
const cartTotalPriceEl =
  document.querySelector<HTMLParagraphElement>(".totalPrice");

let clickedCandyId = 0;
// const kindOfCandyInCartArr: CandyResponse[] = [];
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
  if (cartAmountEl) {
    cartAmountEl.innerText = `Nbr of products in cart ${String(
      getTotalAmountOfProductsInCart()
    )}`;

    cartTotalPriceEl!.innerText = `Total cost: ${String(
      getTotalCostOfProductsInCart()
    )}`;
  }
  // cartContentsEl!.innerText = `Nbr of ${candyFound!.name} ${String(
  //   candyFound!.amount
  // )}`;
  // renderCart();
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
  // renderCart();
};

export const deleteProductFromCart = function (clickedCandyId: number) {
  console.log("Running deleteproduct");
  const candyFound = cartArray.find(
    (product: CartProduct) => product.id === clickedCandyId
  );
  if (candyFound) {
    candyFound.amount = 0;
    cartArray = cartArray.filter((product) => product.id !== candyFound.id);
  }
  // renderCart();
};
//Gets nbr of kinds of candy at the moment, not total amount of candy.
export const getTotalAmountOfProductsInCart = function () {
  return cartArray.reduce((acc, curr) => acc + curr.amount, 0);
};
export const getTotalCostOfProductsInCart = function () {
  return cartArray.reduce((acc, curr) => acc + curr.totalCost, 0);
};

// const renderCart = function () {
//   //Populate cart with cards of items. Used for add/delete increase/decrease.
// };

// candyId: CandyData
const renderCart = function () {
  // Render a card with added item
  if (cartContentsEl) {
    cartContentsEl.innerHTML = cartArray
      .map((product) => {
        let thumbnailURL = `https://www.bortakvall.se${product.thumbnail}`;

        return `<div class="card container-fluid d-flex flex-row rounded-4 p-1" data-product-id="${product.id}" >
  
            <img src="${thumbnailURL}" width="50" class="img-fluid rounded-4 me-2" alt="Image of ${product.name}">
            <h5 class="card-title click fs-5 me-2">${product.name}</h5>
            <p class="me-2">Scoop price: ${product.price}</p>
            <p class="me-2">Total product price: ${product.totalCost}</p>
            <button class="increaseBtn btn btn-success me-2">+</button>
            <p class="me-2">${product.amount}</p>
            <button class="decreaseBtn btn btn-primary me-2">-</button>
            <button class="deleteBtn btn btn-danger me-2"><i class="bi bi-trash"></i></button>
          </div>
        `;
      })
      .join("");
  } else {
    console.error("cartContentsEl is not here yet.");
  }
};

//Adds clicked candy to cart, if exists, increase amount instead.
allCardsContainerEl?.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;
  if (target.closest(".bi-basket")) {
    const candyCard = target.closest<HTMLDivElement>(".card");
    clickedCandyId = Number(candyCard?.dataset.productId);
    console.log("Clicked candyId", clickedCandyId);
    await addToCart(clickedCandyId);
    renderCart();
  }
});

cartContentsEl?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const candyCard = target.closest<HTMLDivElement>(".card");
  clickedCandyId = Number(candyCard?.dataset.productId);

  if (target.closest(".increaseBtn")) {
    increaseAmountOfProductInCart(clickedCandyId);
    renderCart();
  } else if (target.closest(".decreaseBtn")) {
    decreaseAmountOfProductInCart(clickedCandyId);
    renderCart();
  } else if (target.closest(".deleteBtn")) {
    deleteProductFromCart(clickedCandyId);
    renderCart();
  }
});

export const addToCart = async function (clickedCandyId: number) {
  let fetchedCandyObject = await getCandyProductInfo(clickedCandyId);
  // console.log("Fetched candyObject", fetchedCandyObject);
  let foundSameCandyInCart = cartArray.some(
    (product) => product.id === clickedCandyId
  );
  if (!foundSameCandyInCart) {
    // kindOfCandyInCartArr.push(fetchedCandyObject);
    const candyProduct = new CartProduct(
      fetchedCandyObject.data.id,
      fetchedCandyObject.data.name,
      1,
      fetchedCandyObject.data.price,
      fetchedCandyObject.data.images.thumbnail
    );

    cartArray.push(candyProduct);
    console.log("CartArray Contents", cartArray);
    // renderCart();
  } else if (foundSameCandyInCart) {
    const candyFound = cartArray.find(
      (product: CartProduct) => product.id === clickedCandyId
    );
    candyFound!.amount++;

    console.log("CartArray after amount++", cartArray);
  }
  renderCart();

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
