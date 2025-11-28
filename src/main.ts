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
