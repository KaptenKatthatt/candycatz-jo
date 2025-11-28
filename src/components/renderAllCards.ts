import { getAllCandyInfo } from "../services/candyAPI";
import type { CandyData } from "../services/candyApiTypes";

export const renderAllCards = async function () {
  //Get all products from API

  const allCardsContainerEl = document.querySelector(
    ".allCardsContainer"
  ) as HTMLDivElement;

  // const allCandyCards: CandyData[] = await getAllCandyInfo();

  const response = await getAllCandyInfo();
  const allCandyCards: CandyData[] = response.data;

  //TODO Add if check if response.status === "success"

  allCardsContainerEl.innerHTML = allCandyCards
    .map((product) => {
      let thumbnailURL = `https://www.bortakvall.se${product.images.thumbnail}`;
      let candyTitle = product.name;
      let candyPrice = product.price;
      let candyStockQty = product.stock_quantity;
      let candyStockStatus = product.stock_status;
      let candyDataId = product.id;
      // let candyOnSale = product.data.on_sale;

      return `<div class="card" data-product-id="${candyDataId}" style="width: 18rem;">
  <img src="${thumbnailURL}" class="card-img-top" alt="Image of ${candyTitle}">
  <div class="card-body">
    <h5 class="card-title">${candyTitle}</h5>
    <p class="card-text">In stock:${
      candyStockStatus === "instock" ? candyStockQty : "Out of stock"
    }</p>
    <p class="card-text">${candyPrice}</p>
    <a href="#" class="btn btn-primary">Read more</a>
    <a href="#" class="btn btn-secondary">+ Add</a>
  </div>
</div>
  `;
    })
    .join("");

  //Map all products to cards
};
