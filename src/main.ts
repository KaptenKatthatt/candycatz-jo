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
import { sideScroller } from "./components/sideScroller";

//SCSS imports
import "./assets/scss/app.scss";

window.scrollTo(0, 0);

renderCartView();
renderCheckoutForm();

//RenderAllCards
renderAllCards();
sideScroller();
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
