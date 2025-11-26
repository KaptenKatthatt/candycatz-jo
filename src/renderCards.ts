import { getAllCandyInfo } from "./services/candyAPI";
import type { CandyData } from "./services/candyApiTypes";
export const renderCards = async function () {
  //Get all products from API

  const allCandyCardsContainer = document.querySelector(
    ".allCandyCardsContainer"
  ) as HTMLDivElement;

  const allCandyCards: CandyData[] = await getAllCandyInfo();

  allCandyCardsContainer.innerHTML = allCandyCards
    .map((product) => {
      let thumbnailURL = `https://www.bortakvall.se${product.data.images.thumbnail}`;
      let candyTitle = product.data.name;
      let candyPrice = product.data.price;
      let candyStockQty = product.data.stock_quantity;
      let candyStockStatus = product.data.stock_status;
      // let candyOnSale = product.data.on_sale;

      return `<div class="card" style="width: 18rem;">
  <img src="${thumbnailURL}" class="card-img-top" alt="Image of ${candyTitle}">
  <div class="card-body">
    <h5 class="card-title">${candyTitle}</h5>
    <p class="card-text">In stock:${
      candyStockStatus === "instock" ? candyStockQty : "Out of stock"
    }</p>
    <p class="card-text">${candyPrice}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
  `;
    })
    .join("");

  //Map all products to cards
};
