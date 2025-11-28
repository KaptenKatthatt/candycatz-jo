//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
//Bootstrap JS
import * as bootstrap from "bootstrap";
import { renderOffCan } from "./components/offcan";
import "./assets/scss/app.scss";
import { getCandyProductInfo } from "./services/candyAPI";
import { renderModal } from "./components/modal";
import { renderCartView, renderCheckoutForm } from "./components/accordian";
import { renderFooter } from "./components/footer";
import { renderNavbar } from "./components/navbar";
import { renderCarousel } from "./components/carousel";
import { addToCart } from "./components/addToCart";
import { renderAllCards } from "./components/renderAllCards";
import { getClickedCandyId } from "./getClickedCandyId";

//EXAMPLE CARD//////
const exampleTitleEl = document.querySelector(
  ".exampleTitle"
) as HTMLHeadElement;
const exampleCardTextEl = document.querySelector(
  ".exampleCardText"
) as HTMLParagraphElement;
const exampleThumbnailEl = document.querySelector(
  ".exampleThumbnail"
) as HTMLImageElement;

let candyproduct = await getCandyProductInfo(6545);
console.log("Candyproduct", candyproduct);

console.log(candyproduct.data.images.thumbnail);
exampleTitleEl.innerText = candyproduct.data.name;
exampleCardTextEl.innerHTML = candyproduct.data.description;
exampleThumbnailEl.src = `https://www.bortakvall.se${candyproduct.data.images.thumbnail}`;

exampleThumbnailEl.addEventListener("click", async () => {
  await renderModal(candyproduct.data.id); //Change 6545 to clickedCandyId
  const exampleModal = document.getElementById("exampleModal");
  const modal = new bootstrap.Modal(exampleModal!);
  modal.show();
  2;
});

///////////

//Add to cart test
addToCart();

renderCartView();
renderCheckoutForm();

//RenderAllCards
renderAllCards();

//getCandyClickedId, startar efter alla kort laddas ut
getClickedCandyId();

//Carousel hero
renderCarousel();
//Navbar
renderNavbar();
//OffCanvas cart
renderOffCan();

//Footer
renderFooter();
