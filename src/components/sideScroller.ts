//Render 4 cards
//When

import { getAllCandyInfo } from "../services/candyAPI";
import type { CandyData } from "../services/candyApiTypes";

const topTreatsSideScrollerContainerEl = document.querySelector(
  ".topTreatsSideScrollerContainer"
) as HTMLDivElement;

let response = await getAllCandyInfo();
let allCandyCards: CandyData[] = response.data;

// funktion för att återanvända kort strukturen flera gånger på olika kategorier
function cardStructure(product: CandyData): string {
  let thumbnailURL = `https://www.bortakvall.se${product.images.thumbnail}`;

  return `<div class="card cardTransform rounded-4 p-1 ${
    product.stock_status !== "instock" ? "cardDisabled" : ""
  }" data-product-id="${product.id}" style="width: 17rem;">
      <img src="${thumbnailURL}" class="card-img-top click rounded-4" alt="Image of ${
    product.name
  }">
      <div class="card-body">
        <div class="infoContainer">
          <h5 class="card-title click fs-5">${product.name}</h5>
          ${
            product.stock_status === "instock"
              ? `<p class="card-text stockStatus">I lager:
              <span class="fw-bold">${product.stock_quantity}</span></p>`
              : `<p class="card-text stockStatus"><em>Ej i lager</em></p>`
          }
          <p class="card-text priceTag">Pris/skopa: <span class="fw-bold">${
            product.price
          }:-</span></p>
          <button class="modalInfoBtn btn btn-primary"><i class="bi bi-info-circle"></i></button>
          <button class="addToCartBtn btn btn-success" 
          ${
            product.stock_status !== "instock" ? "disabled" : ""
          }>+<i class="bi bi-basket ps-2"></i></button>
        </div>
      </div>
    </div>`;
}

export const sideScroller = function () {
  // TOP TREATS Kategorien
  const topTreatsCategories = [...allCandyCards];
  // ytlig kopia av allCandyCards
  const filterTopTreats = topTreatsCategories.filter((candy) => {
    return candy.stock_quantity < 3 && candy.stock_status === "instock";
  });
  // returnera ny array med alla som är instock OCH färre än 3
  const sliceOutTopTreats = filterTopTreats.slice(0, 12);
  // slicea sedan ut de första 12
  const topTreatsCardsContainerEl = document.querySelector(
    ".topTreatsSideScrollerContainer"
  ) as HTMLDivElement;

  topTreatsCardsContainerEl.innerHTML = sliceOutTopTreats
    .map((product) => cardStructure(product))
    .join("");

  // Side scroller arrow functionality
  document
    .querySelector(".topTreatsSideScrollerWrapper")
    ?.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const scrollContainer = document.querySelector(
        ".topTreatsSideScrollerContainer"
      ) as HTMLDivElement;

      if (target.closest(".scrollArrowLeft")) {
        scrollContainer.scrollBy(-800, 0);
      }
      if (target.closest(".scrollArrowRight")) {
        scrollContainer.scrollBy(800, 0);
      }
    });
};
