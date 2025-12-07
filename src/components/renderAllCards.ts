import { getAllCandyInfo } from "../services/candyAPI";
import type { CandyData } from "../services/candyApiTypes";

let showMoreCandy: CandyData[];
let addedCandyNr: number = 12;
let usedIds: number[];
let showRestCandy: CandyData[];

let response = await getAllCandyInfo();
let allCandyCards: CandyData[] = response.data;

// funktion för att återanvända kort strukturen flera gånger på olika kategorier
export const cardStructure = function (product: CandyData): string {
  let thumbnailURL = `https://www.bortakvall.se${product.images.thumbnail}`;

  return `<div class="card cardTrans rounded-4 p-1 ${
    product.stock_status !== "instock" ? "cardDis" : ""
  }" " data-product-id="${product.id}" style="width: 11rem;">
      <img src="${thumbnailURL}" class="card-img-top click rounded-4" alt="Image of ${
    product.name
  }">
      <div class="card-body">
      <div class="infoContainer">
        <h5 class="card-title click fs-5">${product.name}</h5>
        ${
          product.stock_status === "instock"
            ? `<p class="card-text stockStatus">I lager:
            <span class="fw-bold">${product.stock_quantity}</span>`
            : `<p class="card-text stockStatus"><em>Ej i lager</em>`
        }</p>
        <p class="card-text priceTag">Pris/skopa: <span class="fw-bold">${
          product.price
        }:-</span></p>
        <button class="modalInfoBtn btn btn-primary my-2"><i class="bi bi-info-circle"></i></button>
        <button class="addToCartBtn btn btn-success" 
        ${
          product.stock_status !== "instock" ? "disabled" : ""
        }>+<i class="bi bi-basket ps-2"></i></button>
        </div>
      </div>
        </div>
      `;
};

export const renderAllCards = async function () {
  //Get all products from API
  // const allCandyCards: CandyData[] = await getAllCandyInfo();

  //TODO Add if check if response.status === "success"

  // //TOP TREATS Kategorien
  // const topTreatsCategories = [...allCandyCards];
  // // ytlig kopia av allCandyCards
  // const filterTopTreats = topTreatsCategories.filter((candy) => {
  //   return candy.stock_quantity < 3 && candy.stock_status === "instock";
  // });
  // // returnera ny array med alla som är instock OCH färre än 3
  // const sliceOutTopTreats = filterTopTreats.slice(0, 12);
  // // slicea sedan ut de första 12
  // const topTreatsCardsContainerEl = document.querySelector(
  //   ".topTreatsCardsContainer"
  // ) as HTMLDivElement;
  // topTreatsCardsContainerEl.innerHTML += sliceOutTopTreats
  //   .map((product) => cardStructure(product))
  //   .join("");

  // SWEETSAVINGS Kategorien
  const sweetSavingsCategories = [...allCandyCards];
  // ytlig kopia av allCandyCards
  const filterSweetSaving = sweetSavingsCategories.filter((candy) => {
    return candy.stock_quantity > 8 && candy.stock_status === "instock";
  });
  // returnera ny array med alla som är instock OCH färre än 3
  const sliceOutSavings = filterSweetSaving.slice(0, 12);
  // slicea sedan ut de första 12

  const sweetSavingsCardsContainterEl = document.querySelector(
    ".sweetSavingsCardsContainer"
  ) as HTMLDivElement;
  sweetSavingsCardsContainterEl.innerHTML = sliceOutSavings
    .map((product) => cardStructure(product))
    .join("");

  // skapa variabel array som innehåller de som redan har visats
  usedIds = [
    // ...sliceOutTopTreats.map((candy) => candy.id),
    ...sliceOutSavings.map((candy) => candy.id),
  ];

  showMoreCandy = allCandyCards.filter((candy) => !usedIds.includes(candy.id));
  const moreToMunchCardsContainerEl = document.querySelector(
    ".moreToMunchCardsContainer"
  ) as HTMLDivElement;
  showRestCandy = showMoreCandy.slice(0, addedCandyNr);
  moreToMunchCardsContainerEl.innerHTML += showRestCandy
    .map((product) => cardStructure(product))
    .join("");
  //lägg till en knapp "show more"
  moreSweetsButton();
  // fortsätt lägga ut godis
  // plussa på 12 att lägga ut "ovanpå" de previous 12, 24 + osv
  showNumberOfCandys();
};

function loadMoreSweets() {
  const moreToMunchCardsContainerEl = document.querySelector(
    ".moreToMunchCardsContainer"
  ) as HTMLDivElement;
  showRestCandy = showMoreCandy.slice(0, addedCandyNr);
  moreToMunchCardsContainerEl.innerHTML = showRestCandy
    .map((product) => cardStructure(product))
    .join("");

  showNumberOfCandys();
  // lägg till ifall resterande är mindre än 12 så ska X läggas till
  // för att antalet ska bli rätt i slutändan!
}

function moreSweetsButton() {
  const moreSweetsBtnEl = document.querySelector(
    ".moreToMunchBtn"
  ) as HTMLDivElement;

  moreSweetsBtnEl.addEventListener("click", () => {
    addedCandyNr += 12;
    loadMoreSweets();

    if (addedCandyNr >= showMoreCandy.length) {
      moreSweetsBtnEl.classList.add("d-none");
      console.log("alla godis renderade", addedCandyNr);
    } else {
      moreSweetsBtnEl.classList.remove("d-none");
    }
  });
}

function showNumberOfCandys() {
  const candyAmountRendered = document.querySelector<HTMLDivElement>(
    ".candyAmountRendered"
  )!;
  const allTheCandy = usedIds.length + showRestCandy.length;
  const allTheResponseCandy = allCandyCards.length;
  candyAmountRendered.innerHTML = `${allTheCandy}/${allTheResponseCandy}`;
}

// okej allt stämmer här in med det
