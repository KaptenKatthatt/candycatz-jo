export const UI = {
  //Example card
  exampleTitleEl: document.querySelector(".exampleTitle") as HTMLHeadElement,
  exampleCardTextEl: document.querySelector(
    ".exampleCardText"
  ) as HTMLParagraphElement,
  exampleThumbnailEl: document.querySelector(
    ".exampleThumbnail"
  ) as HTMLImageElement,

  //Modal product info
  modalContainerEl: document.querySelector(".modalContainer") as HTMLDivElement,
  modalTitleEl: document.querySelector(".modalTitle") as HTMLHeadingElement,
  modalThumbnailEL: document.querySelector(
    ".modalThumbnail"
  ) as HTMLImageElement,
  modalParagraphEl: document.querySelector(
    ".modalParagraph"
  ) as HTMLParagraphElement,
};

export const cartCheckout = {
  cartView: document.querySelector("#cartView") as HTMLDivElement,
  checkoutForm: document.querySelector("#checkoutForm") as HTMLDivElement,
};
