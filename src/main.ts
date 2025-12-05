//Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.css";
//Bootstrap JS
import * as bootstrap from "bootstrap";
import { renderOffCan } from "./components/offcan";
import "./assets/scss/app.scss";
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
