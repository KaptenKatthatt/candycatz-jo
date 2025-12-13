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
      <h3 class="modal-title">${candyTitle}</h3>
        <button type="button" class="btn-close btn" data-bs-dismiss="modal" aria-label="Close">
        </button>
        </div>
        <div class="modal-body mt-0">
        <div class="row">    
        <div class="col-sm-6 d-flex align-items-center">
          <img src="${modalThumbnailURL}" class="modalThumbnail card-img scallopbox" alt="${candyTitle}">
          </div>
          <div class="col-sm-6 mb-2">
          <div class="scrollableModal">
          <p class="modalParagraph card-text pt-2">${candyParagraph}</p>
          <p class="modal-price">Pris:<strong> ${candyPrice}:- </strong></p>
          <p>I lager: ${candyProduct.data.stock_quantity}</p>
        </div>
        </div>
          <button type="button" class="btn btn-secondary modalBtn mt-2" data-bs-dismiss="modal">Stäng</button>
       
        </div>
      </div>
  </div>
  `;
  const candyModal = document.getElementById("candyModal");
  const modal = new Modal(candyModal!);
  modal.show();
};
