import { getAllCandyInfo } from "../services/candyAPI";
import type { CandyData } from "../services/candyApiTypes";
import { cardStructure } from "./cardStructure";

let showMoreCandy: CandyData[];
let addedCandyNr: number = 12;
let usedIds: number[];
let showRestCandy: CandyData[];

let response = await getAllCandyInfo();
let allCandyCards: CandyData[] = response.data;

export const renderAllCards = async function () {
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
  const loadMoreSweetsCards = moreToMunchCardsContainerEl.querySelectorAll(".card");
  loadMoreSweetsCards.forEach((card) => {
  card.classList.add("wavecard");
  });

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
