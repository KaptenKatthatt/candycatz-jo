import { getAllCandyInfo } from "../services/candyAPI";
import type { CandyData } from "../services/candyApiTypes";

export const renderAllCards = async function () {
  //Get all products from API

  const topTreatsCardsContainerEl = document.querySelector(
    ".topTreatsCardsContainer"
  ) as HTMLDivElement;
  const sweetSavingsCardsContainterEl = document.querySelector(
    ".sweetSavingsCardsContainer"
  ) as HTMLDivElement;

  // const allCandyCards: CandyData[] = await getAllCandyInfo();

  const response = await getAllCandyInfo();
  const allCandyCards: CandyData[] = response.data;
  let sliceOutCandy = [];
  let sliceOutSaving = [];

  //TODO Add if check if response.status === "success"

    // let candyOnSale = product.data.on_sale;
      const topTreatsCategories = [...allCandyCards];
      // ytlig kopia av allCandyCards
      const filterTopTreats = topTreatsCategories.filter((candy => {
        return candy.stock_quantity < 3 && candy.stock_status === "instock";
      }))
      // returnera ny array med alla som är instock OCH färre än 3
      sliceOutCandy = filterTopTreats.slice(0, 12);
      console.log("is it sliced?", sliceOutCandy);
      // slicea sedan ut de första 12 
      topTreatsCardsContainerEl.innerHTML += sliceOutCandy
        .map((product) => {
          let thumbnailURL = `https://www.bortakvall.se${product.images.thumbnail}`;
          let candyTitle = product.name;
          let candyPrice = product.price;
          let candyStockQty = product.stock_quantity;
          let candyStockStatus = product.stock_status;
          let candyDataId = product.id;

          //Map all products to cards
          return `<div class="card cardtrans rounded-4 p-1 col-12 col-md-4 col-lg-2" data-product-id="${candyDataId}" style="width: 10rem;">
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
    

      const sweetSavingsCategories = [...allCandyCards];
      // ytlig kopia av allCandyCards
      const filterSweetSaving = sweetSavingsCategories.filter((candy => {
        return candy.stock_quantity > 8 && candy.stock_status === "instock";
      }))

      console.log("hur ser det ut", filterSweetSaving)
      // returnera ny array med alla som är instock OCH färre än 3
      sliceOutSaving = filterSweetSaving.slice(0, 12);
      console.log("is it sweet savingsliced?", sliceOutSaving);
      // slicea sedan ut de första 12 

      function cardStructure(product: CandyData): string{
          let thumbnailURL = `https://www.bortakvall.se${product.images.thumbnail}`;

          return `<div class="card rounded-4 p-1" data-product-id="${product.id}" style="width: 10rem;">
      <img src="${thumbnailURL}" class="card-img-top cursor-pointer rounded-4" alt="Image of ${product.name}">
      <div class="card-body">
      <div class="infoContainer">
        <h5 class="card-title fs-5">${product.name}</h5>
        <p class="card-text stockStatus">In stock: ${
          product.stock_status === "instock"
            ? `<span class="fw-bold">${product.price}</span>`
            : `<span class="fst-italic pb-1"><br>Out of stock</span>`
        }</p>
        <p class="card-text priceTag">Price: <span class="fw-bold">${product.price}</span></p>
        <button class="btn btn-primary my-2"><i class="bi bi-info-circle"></i></button>
        <button class="btn btn-success">+<i class="bi bi-basket ps-2"></i></button>
        </div>
      </div>
        </div>
      `;
        })
        .join("");
    }
  