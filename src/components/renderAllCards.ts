import { getAllCandyInfo } from "../services/candyAPI";
import type { CandyData } from "../services/candyApiTypes";
import { cardStructure } from "./cardStructure_smallCards";
import { cardStructureSideScroller } from "./sideScroller";

let showMoreCandy: CandyData[];
let addedCandyNr: number = 12;
let usedIds: number[];
let showRestCandy: CandyData[];

let response = await getAllCandyInfo();
let allCandyCards: CandyData[] = response.data;

export const renderAllCards = async function () {
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
    .map((product) => cardStructureSideScroller(product))
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

  // SWEETSAVINGS Kategorien
  const sweetSavingsCategories = [...allCandyCards];
  // ytlig kopia av allCandyCards
  const filterSweetSaving = sweetSavingsCategories.filter((candy) => {
    return candy.on_sale === true && candy.stock_status === "instock";
  });
  // returnera ny array med alla som är instock OCH färre än 3
  const sliceOutSavings = filterSweetSaving.slice(0, 12);
  // slicea sedan ut de första 12

  const sweetSavingsCardsContainterEl = document.querySelector(
    ".sweetSavingsCardsContainer"
  ) as HTMLDivElement;
  sweetSavingsCardsContainterEl.innerHTML = sliceOutSavings
    .map((product) => cardStructure(product, "sale"))
    .join("");

  // skapa variabel array som innehåller de som redan har visats
  usedIds = [
    // ...sliceOutTopTreats.map((candy) => candy.id),
    ...sliceOutSavings.map((candy) => candy.id),
    ...sliceOutTopTreats.map((candy) => candy.id),
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
  const instockCandys = [...allCandyCards];
  // ytlig kopia av allCandyCards
  const numberOfInStock = instockCandys.filter((candy) => {
    return candy.stock_status === "instock";
  });
  const candyAmountRendered = document.querySelector<HTMLDivElement>(
    ".candyAmountRendered"
  )!;
  const allTheCandy = usedIds.length + showRestCandy.length;
  const allTheResponseCandy = allCandyCards.length;
  candyAmountRendered.innerHTML = `${allTheCandy}/${allTheResponseCandy} (${numberOfInStock.length} i lager)`;
}

// okej allt stämmer här in med det
