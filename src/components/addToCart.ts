import { getCandyProductInfo } from "../services/candyAPI";
import { type CandyDataID } from "../services/candyApiTypes";

const allCardsContainerEl =
  document.querySelector<HTMLDivElement>(".allCardsContainer");

let clickedCandyId: number;
const cartArray: CandyDataID[] = [];

allCardsContainerEl?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const candyCard = target.closest<HTMLDivElement>(".card");
  clickedCandyId = Number(candyCard?.dataset.productId);
  console.log("Clicked candyId", clickedCandyId);
  addToCart(clickedCandyId);
});

export const addToCart = async function (productId: number) {
  //TODO
  // When user clicks on addToCartBtn:
  // Get clickedCandyId
  //Get candy object from API
  // Add candy object to cartArray

  let fetchedCandyObject = await getCandyProductInfo(clickedCandyId);
  console.log("Fetched candyObject", await fetchedCandyObject);
  cartArray.push(fetchedCandyObject);
  console.log(cartArray);
};
