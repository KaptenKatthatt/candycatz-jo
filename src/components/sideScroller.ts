import { getAllCandyInfo } from "../services/candyAPI";
import type { CandyData } from "../services/candyApiTypes";

let response = await getAllCandyInfo();
let allCandyCards: CandyData[] = response.data;

// funktion för att återanvända kort strukturen flera gånger på olika kategorier
function cardStructure(product: CandyData): string {
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
}

export const sideScroller = function (arr: CandyData) {
  //TOP TREATS Kategorien
  const topTreatsCategories = [...allCandyCards];
  // ytlig kopia av allCandyCards
  const filterTopTreats = topTreatsCategories.filter((candy) => {
    return candy.stock_quantity < 3 && candy.stock_status === "instock";
  });
  // returnera ny array med alla som är instock OCH färre än 3
  const sliceOutTopTreats = filterTopTreats.slice(0, 12);
  // slicea sedan ut de första 12
  const topTreatsCardsContainerEl = document.querySelector(
    ".topTreatsCardsContainer"
  ) as HTMLDivElement;
  topTreatsCardsContainerEl.innerHTML += sliceOutTopTreats
    .map((product) => cardStructure(product))
    .join("");
};
