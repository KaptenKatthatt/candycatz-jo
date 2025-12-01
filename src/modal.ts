import { getCandyProductInfo } from "./services/candyAPI";

// UI.modalTitleEl.innerText = candyproduct.data.name;
// UI.modalParagraphEl.innerHTML =
// UI.modalThumbnailEL.src = `https://www.bortakvall.se${candyproduct.data.images.thumbnail}`;

/**
 * Renders a modal with the clicked candyId
 * @param productId
 */
export const renderModal = async function (productId: number) {
  let candyproduct = await getCandyProductInfo(productId);
  let modalTitle = candyproduct.data.name;
  let modalParagraph = candyproduct.data.description;
  let modalThumbnailURL = `https://www.bortakvall.se${candyproduct.data.images.thumbnail}`;

  document.querySelector<HTMLDivElement>(".modalContainer")!.innerHTML = `
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title modalTitle fs-5"">${modalTitle}</h5>
          <button type=" button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="${modalThumbnailURL}" class="modalThumbnail card-img-top" alt="${modalTitle}">
          <p class="modalParagraph card-text">${modalParagraph}</p>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  `;
};
