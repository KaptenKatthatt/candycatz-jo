export const carouselContainerEl = document.querySelector(
  ".carouselContainer"
) as HTMLElement;

export const renderCarousel = function () {
  carouselContainerEl.innerHTML = `
<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/img/sockerKick.jpg" class="d-block w-100" alt="Picture of yummy candy" />
        </div>
        <div class="carousel-item">
          <img src="/img/suris.png" class="d-block w-100" alt="Picture with sour sweet treats" />
        </div>
        <div class="carousel-item">
          <img src="/img/godisdag.png" class="d-block w-100" alt="Picture of soft mashmallow" />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev">
        <span aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next">
        <span aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`;
};
