//Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.css";
//Bootstrap JS
import * as bootstrap from "bootstrap";

//Function imports
import { renderOffCan } from "./components/offcan";
import {
  postUserAddressForm,
  renderCartView,
  renderCheckoutForm,
} from "./components/accordian";
import { renderFooter } from "./components/footer";
import { renderNavbar } from "./components/navbar";
import { renderCarousel } from "./components/carousel";
import { renderAllCards } from "./components/renderAllCards";
import { getClickedCandyId } from "./components/getClickedCandyId";
import { initStore } from "./components/cart";

//SCSS imports
import "./assets/scss/app.scss";
import "./assets/scss/offcan.scss";
import "./assets/scss/typography.scss";
import "./assets/scss/modal.scss";
import "./assets/scss/renderAllCards.scss";

import { sendOrder } from "./components/ApiTest";

renderCartView();
renderCheckoutForm();
postUserAddressForm();

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

initStore();
