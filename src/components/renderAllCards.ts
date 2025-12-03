import { getAllCandyInfo } from "../services/candyAPI";
import type { CandyData } from "../services/candyApiTypes";

let showMoreCandy: CandyData[];
let candyShowNr: number = 12;
let usedIds: number[];
let showRestCandy: CandyData[];

// funktion för att återanvända kort strukturen flera gånger på olika kategorier
function cardStructure(product: CandyData): string {
  let thumbnailURL = `https://www.bortakvall.se${product.images.thumbnail}`;

  return `<div class="card cardtrans rounded-4 p-1" data-product-id="${
    product.id
  }" style="width: 11rem;">
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
        <button class="infoModalBtn btn btn-primary my-2"><i class="bi bi-info-circle"></i></button>
        <button class="addToCartBtn btn btn-success" 
        ${
          product.stock_status !== "instock" ? "disabled" : ""
        }>+<i class="bi bi-basket ps-2"></i></button>
        </div>
      </div>
        </div>
      `;
}

export const renderAllCards = async function () {
  //Get all products from API
  // const allCandyCards: CandyData[] = await getAllCandyInfo();

  const response = await getAllCandyInfo();
  const allCandyCards: CandyData[] = response.data;

  //TODO Add if check if response.status === "success"

  //TOP TREATS Kategorien
  const topTreatsCategories = [...allCandyCards];
  // ytlig kopia av allCandyCards
  const filterTopTreats = topTreatsCategories.filter((candy) => {
    return candy.stock_quantity < 3 && candy.stock_status === "instock";
  });
  // returnera ny array med alla som är instock OCH färre än 3
  const sliceOutTopTreats = filterTopTreats.slice(0, 12);
  console.log("is it sliced?", sliceOutTopTreats);
  // slicea sedan ut de första 12
  const topTreatsCardsContainerEl = document.querySelector(
    ".topTreatsCardsContainer"
  ) as HTMLDivElement;
  topTreatsCardsContainerEl.innerHTML += sliceOutTopTreats
    .map((product) => cardStructure(product))
    .join("");

  // SWEETSAVINGS Kategorien
  const sweetSavingsCategories = [...allCandyCards];
  // ytlig kopia av allCandyCards
  const filterSweetSaving = sweetSavingsCategories.filter((candy) => {
    return candy.stock_quantity > 8 && candy.stock_status === "instock";
  });
  // returnera ny array med alla som är instock OCH färre än 3
  const sliceOutSavings = filterSweetSaving.slice(0, 12);
  // slicea sedan ut de första 12
  console.log("is it sweet savingsliced?", sliceOutSavings);
  const sweetSavingsCardsContainterEl = document.querySelector(
    ".sweetSavingsCardsContainer"
  ) as HTMLDivElement;
  sweetSavingsCardsContainterEl.innerHTML += sliceOutSavings
    .map((product) => cardStructure(product))
    .join("");

  // skapa variabel array som innehåller de som redan har visats
  const usedIds = [
    ...sliceOutTopTreats.map((candy) => candy.id),
    ...sliceOutSavings.map((candy) => candy.id),
  ];
  console.log("använda id:", usedIds, "längden borde vara 24:", usedIds.length);
  moreToMunchCandys = allCandyCards
    .filter((candy) => !usedIds.includes(candy.id))
    .slice(0, candyShowNr);
  console.log("övriga 12 stycken godisar att rendera ut:", moreToMunchCandys);

  // Ut med resten av godagodiiiis
  const moreToMunchCardsContainerEl = document.querySelector(
    ".moreToMunchCardsContainer"
  ) as HTMLDivElement;
  showRestCandy = showMoreCandy.slice(0, candyShowNr);
  moreToMunchCardsContainerEl.innerHTML += showRestCandy
    .map((product) => cardStructure(product))
    .join("");

  //lägg till en knapp "show more"
  moreSweetsButton();
  // fortsätt lägga ut godis
  loadMoreSweets();
};

function loadMoreSweets() {}

function moreSweetsButton() {
  const moreSweetsBtnEl = document.querySelector(
    ".moreToMunchBtn") as HTMLDivElement;
72
    moreSweetsBtnEl.addEventListener("click", () => {
      if (candyShowNr >= 84) {
        candyShowNr += 5;
        console.log("lagt till 5 sista?", candyShowNr)
      } else {
      candyShowNr += 12;
      loadMoreSweets();
      console.log("lagt till 12", candyShowNr)
      }
      

      if (candyShowNr >= showMoreCandy.length) {
        moreSweetsBtnEl.classList.add("d-none");
        console.log("alla godis renderade", candyShowNr)
      } else {
        moreSweetsBtnEl.classList.remove("d-none");
      }
    })
}
