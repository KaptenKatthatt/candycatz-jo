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

      //Map all products to cards
      return `<div class="card rounded-4 p-1" data-product-id="${candyDataId}" style="width: 10rem;">
      <img src="${thumbnailURL}" class="card-img-top cursor-pointer rounded-4" alt="Image of ${candyTitle}">
      <div class="card-body">
      <div class="infoContainer">
        <h5 class="card-title fs-5">${candyTitle}</h5>
        <p class="card-text stockStatus">In stock: ${
          candyStockStatus === "instock"
            ? `<span class="fw-bold">${candyStockQty}</span>`
            : `<span class="fst-italic pb-1"><br>Out of stock</span>`
        }</p>
        <p class="card-text priceTag">Price: <span class="fw-bold">${candyPrice}</span></p>
        <button class="btn btn-primary my-2"><i class="bi bi-info-circle"></i></button>
        <button class="btn btn-success">+<i class="bi bi-basket ps-2"></i></button>
        </div>
      </div>
        </div>
      `;
    })
    .join("");
};
