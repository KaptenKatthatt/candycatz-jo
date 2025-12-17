import type { CandyData } from "../services/candyApiTypes";

export function cardStructureSideScroller(product: CandyData): string {
  let thumbnailURL = `https://www.bortakvall.se${product.images.thumbnail}`;

  return `<div class="card cardTransform rounded-4 p-1 ${
    product.stock_status !== "instock" ? "cardDisabled" : ""
  }" data-product-id="${product.id}" style="width: 17rem;">
      <img src="${thumbnailURL}" class="card-img-top click rounded-4" alt="Image of ${
    product.name
  }">
  <div class="card-body">
  <h5 class="card-title cardTitleSideScroller click mb-5">${product.name}</h5>
        <div class="infoContainer">
          ${
            product.stock_status === "instock"
              ? `<p class="card-text stockStatus">I lager:
              <span class="fw-bold">${product.stock_quantity}</span></p>`
              : `<p class="card-text stockStatus"><em>Ej i lager</em></p>`
          }
          <p class="card-text priceTag">Pris/skopa: <span class="fw-bold">${
            product.price
          }:-</span></p>
          <button class="modalInfoBtn btn btn-primary" aria-label="Product info popup"><i class="bi bi-info-circle"></i></button>
          <button class="addToCartBtn btn" 
          ${
            product.stock_status !== "instock" ? "disabled" : ""
          } aria-label="Add product to cart">+<i class="bi bi-basket ps-2"></i></button>
        </div>
      </div>
    </div>`;
}
