import { getCandyProductInfo } from "../services/candyAPI";
import { Modal } from "bootstrap";

// UI.modalTitleEl.innerText = candyproduct.data.name;
// UI.modalParagraphEl.innerHTML =
// UI.modalThumbnailEL.src = `https://www.bortakvall.se${candyproduct.data.images.thumbnail}`;

/**
 * Renders a modal with the clicked candyId
 * @param productId
 */
export const renderModal = async function (productId: number) {
  let candyProduct = await getCandyProductInfo(productId);
  let candyTitle = candyProduct.data.name;
  let candyParagraph = candyProduct.data.description;
  let modalThumbnailURL = `https://www.bortakvall.se${candyProduct.data.images.thumbnail}`;

  //Modal product info
  const modalContainerEl = document.querySelector(
    ".modalContainer"
  ) as HTMLDivElement;

  // const modalTitleEl = document.querySelector(
  //   ".modalTitle"
  // ) as HTMLHeadingElement;

  // const modalThumbnailEL = document.querySelector(
  //   ".modalThumbnail"
  // ) as HTMLImageElement;
  // const modalParagraphEl = document.querySelector(
  //   ".modalParagraph"
  // ) as HTMLParagraphElement;

  modalContainerEl.innerHTML = `
<div class="modal fade" id="candyModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title modalTitle fs-5">${candyTitle}</h5>
          <button type=" button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="${modalThumbnailURL}" class="modalThumbnail card-img-top" alt="${candyTitle}">
          <p class="modalParagraph card-text">${candyParagraph}</p>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
  `;
  const candyModal = document.getElementById("candyModal");
  const modal = new Modal(candyModal!);
  modal.show();
};
