//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.css";
//Bootstrap JS
import * as bootstrap from "bootstrap";
import { renderOffCan } from "./offcan";
import "./assets/scss/app.scss";
import { getCandyProductInfo } from "./services/candyAPI";
import { UI } from "./ui";
import { renderModal } from "./modal";
import { renderCartView, renderCheckoutForm } from "./accordian";
import { renderFooter } from "./footer";
import { renderNavbar } from "./navbar";
import { renderCarousel } from "./carousel";
import { addToCart } from "./addToCart";

//EXAMPLE CARD//////
let candyproduct = await getCandyProductInfo(6545);
console.log("Candyproduct", candyproduct);

console.log(candyproduct.data.images.thumbnail);
UI.exampleTitleEl.innerText = candyproduct.data.name;
UI.exampleCardTextEl.innerHTML = candyproduct.data.description;
UI.exampleThumbnailEl.src = `https://www.bortakvall.se${candyproduct.data.images.thumbnail}`;

UI.exampleThumbnailEl.addEventListener("click", async () => {
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

//Carousel hero
renderCarousel();
//Navbar
renderNavbar();
//OffCanvas cart
renderOffCan();

//Footer
renderFooter();
