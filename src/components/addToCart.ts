import { getCandyProductInfo } from "../services/candyAPI";
import { type CandyDataID } from "../services/candyApiTypes";

const allCardsContainerEl =
  document.querySelector<HTMLDivElement>(".allCardsContainer");

let clickedCandyId = 0;
const cartArray: CandyDataID[] = [];

allCardsContainerEl?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  const candyCard = target.closest<HTMLDivElement>(".card");
  clickedCandyId = Number(candyCard?.dataset.productId);
  console.log("Clicked candyId", clickedCandyId);
  addToCart(clickedCandyId);
});

export const addToCart = async function (productId: number) {
  let fetchedCandyObject = await getCandyProductInfo(clickedCandyId);
  console.log("Fetched candyObject", await fetchedCandyObject);
  cartArray.push(fetchedCandyObject);
  console.log(cartArray);

  //TODO
  // If object exist in carArray, increase amount of item, don't add another object.
};
