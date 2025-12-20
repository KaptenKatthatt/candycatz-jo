import { getCandyProductInfo } from "../services/candyAPI";
import { Modal } from "bootstrap";

export const renderModal = async function (productId: number) {
  const candyProduct = await getCandyProductInfo(productId);
  const candyTitle = candyProduct.data.name;
  const candyParagraph = candyProduct.data.description;
  const modalThumbnailURL = `https://www.bortakvall.se${candyProduct.data.images.thumbnail}`;
  const candyPrice = candyProduct.data.price;
  const candyStock = candyProduct.data.stock_status;
  const candyQty = candyProduct.data.stock_quantity;

  //Modal product info
  const modalContainerEl = document.querySelector(
    ".modalContainer"
  ) as HTMLDivElement;

  modalContainerEl.innerHTML = `
<div class="modal fade" id="candyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm-sm">
      <div class="modal-content">
      <div class="modal-header">
      <h3 class="modal-title">${candyTitle}</h3>
        <button type="button" class="btn btn-secondary ms-auto" data-bs-dismiss="modal" aria-label="Close">X
        </button>
        </div>
        <div class="modal-body mt-0">
        <div class="row">    
        <div class="col-sm-6 d-flex align-items-center">
          <img src="${modalThumbnailURL}" class="modalThumbnail card-img scallopbox-thumb" alt="${candyTitle}">
          </div>
          <div class="col-sm-6 mb-2">
          <div class="scrollable-modal">
          <p class="modalParagraph card-text pt-2">${candyParagraph}</p>
          <p class="modal-price">Pris:<strong> ${candyPrice}:- </strong></p>
          ${
            candyStock === "instock"
              ? `
            <p class="card-text stock-status">
              I lager:
              <span class="fw-bold">${candyQty}</span>
            </p>
          `
              : `
            <p class="card-text stock-status"><em>Ej i lager</em></p>
          `
          }
        </div>
        </div>
          <button type="button" class="btn btn-secondary modal-btn mt-2" data-bs-dismiss="modal" aria-label="Close product info popup">Stäng</button>
       
        </div>
      </div>
  </div>
  `;
  const candyModal = document.getElementById("candyModal");
  const modal = new Modal(candyModal!);
  modal.show();
};
