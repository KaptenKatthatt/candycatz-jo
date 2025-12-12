import { getCandyProductInfo } from "../services/candyAPI";
import { Modal } from "bootstrap";

/**
 * Renders a modal with the clicked candyId
 * @param productId
 */
export const renderModal = async function (productId: number) {
  let candyProduct = await getCandyProductInfo(productId);
  let candyTitle = candyProduct.data.name;
  let candyParagraph = candyProduct.data.description;
  let modalThumbnailURL = `https://www.bortakvall.se${candyProduct.data.images.thumbnail}`;
  let candyPrice = candyProduct.data.price;

  //Modal product info
  const modalContainerEl = document.querySelector(
    ".modalContainer"
  ) as HTMLDivElement;

  modalContainerEl.innerHTML = `
<div class="modal fade" id="candyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm-sm">
      <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
        </button>
        </div>
        <div class="modal-body">
        <div class="row">    
        <div class="col-sm-6 d-flex align-items-center">
          <img src="${modalThumbnailURL}" class="modalThumbnail card-img" alt="${candyTitle}">
          </div>
          <div class="col-sm-6">
          <div class="scrollableModal">
          <p class="modalParagraph card-text pt-2">${candyParagraph}</p>
          <p class="modal-price">Pris:<strong> ${candyPrice}:- </strong></p>
          <p>I lager: ${candyProduct.data.stock_quantity}</p>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Stäng</button>
        </div>
        </div>
      </div>
  </div>
  `;
  const candyModal = document.getElementById("candyModal");
  const modal = new Modal(candyModal!);
  modal.show();
};
