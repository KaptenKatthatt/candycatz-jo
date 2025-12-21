import { carouselTemplate } from "./templates";

export const carouselContainerEl = document.querySelector(
  ".carousel-container"
);

if (!carouselContainerEl) {
  throw new Error("Carousel container element not found");
}

export const renderCarousel = function () {
  carouselContainerEl.innerHTML = carouselTemplate();
};
