import { getCandyProductInfo } from "../services/candyAPI";
import { Modal } from "bootstrap";

export const renderModal = async function (productId: number) {
  let candyProduct = await getCandyProductInfo(productId);
  let candyTitle = candyProduct.data.name;
  let candyParagraph = candyProduct.data.description;
  let modalThumbnailURL = `https://www.bortakvall.se${candyProduct.data.images.thumbnail}`;
  let candyPrice = candyProduct.data.price;
  let candyStock = candyProduct.data.stock_status;
  let candyQty = candyProduct.data.stock_quantity;

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
          <img src="${modalThumbnailURL}" class="modalThumbnail card-img scallopboxThumb" alt="${candyTitle}">
          </div>
          <div class="col-sm-6 mb-2">
          <div class="scrollableModal">
          <p class="modalParagraph card-text pt-2">${candyParagraph}</p>
          <p class="modal-price">Pris:<strong> ${candyPrice}:- </strong></p>
          ${
            candyStock === "instock"
              ? `
            <p class="card-text stockStatus">
              I lager:
              <span class="fw-bold">${candyQty}</span>
            </p>
          `
              : `
            <p class="card-text stockStatus"><em>Ej i lager</em></p>
          `
          }
        </div>
        </div>
          <button type="button" class="btn btn-secondary modalBtn mt-2" data-bs-dismiss="modal" aria-label="Close product info popup">Stäng</button>
       
        </div>
      </div>
  </div>
  `;
  const candyModal = document.getElementById("candyModal");
  const modal = new Modal(candyModal!);
  modal.show();
};
