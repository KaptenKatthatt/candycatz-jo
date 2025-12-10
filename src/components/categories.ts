//send over allCandyCards arr from render all cards so avoid too many API-calls

import { cardStructure } from "./cardStructure_smallCards";

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

//TOP TREATS Kategorien
const topTreatsSideScrollerContainerEl = document.querySelector(
  ".topTreatsSideScrollerContainer"
) as HTMLDivElement;

const topTreatsCategories = [...allCandyCards];
// ytlig kopia av allCandyCards
const filterTopTreats = topTreatsCategories.filter((candy) => {
  return candy.stock_quantity < 3 && candy.stock_status === "instock";
});
// returnera ny array med alla som är instock OCH färre än 3
const sliceOutTopTreats = filterTopTreats.slice(0, 12);
// slicea sedan ut de första 12
