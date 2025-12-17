// import { html } from "lit-html";
import { discountMultiplier } from "../main";
import type { CandyData } from "../services/candyApiTypes";

export const cardStructure = function (
  product: CandyData,
  option: string = ""
): string {
  let thumbnailURL = `https://www.bortakvall.se${product.images.thumbnail}`;

  return `
    <div
      class="trig-target card smallCards rounded-4 p-1 ${
        product.stock_status === "outofstock" ? "cardDisabled" : "cardTransform"
      }"
      data-product-id="${product.id}"
      style="width: 11rem;"
    >
      <img
        src="${thumbnailURL}"
        class="card-img-top click rounded-4"
        alt="Image of ${product.name}"
      />

      ${
        option === "sale"
          ? `
        <span class="star10">
          30%
          <span class="visually-hidden">Sale badge</span>
        </span>
      `
          : ""
      }

      <div class="card-body">
        <div class="infoContainer">
          <h3 class="card-title click smallCardsTitle">${product.name}</h3>

          ${
            product.stock_status === "instock"
              ? `
            <p class="card-text stockStatus">
              I lager:
              <span class="fw-bold">${product.stock_quantity}</span>
            </p>
          `
              : `
            <p class="card-text stockStatus"><em>Ej i lager</em></p>
          `
          }

          <p class="card-text priceTag">
            Pris/skopa:
            <span class="fw-bold ${
              product.on_sale ? "text-danger" : "text-dark"
            }">${
    product.on_sale
      ? Math.round(product.price * discountMultiplier)
      : product.price
  }:-</span>
          </p>

          <button class="modalInfoBtn btn btn-primary" aria-label="Product info popup">
            <i class="bi bi-info-circle"></i>
          </button>

          <button class="addToCartBtn btn" ${
            product.stock_status !== "instock" ? "disabled" : ""
          }>
            +<i class="bi bi-basket ps-2"></i>
          </button>
        </div>
      </div>
    </div>
  `;
};
