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
import "./assets/scss/cards.scss";
import "./assets/scss/carousel.scss";
import "./assets/scss/cart.scss";
import "./assets/scss/categories.scss";
import "./assets/scss/checkoutCart.scss";
import "./assets/scss/colors.scss";
import "./assets/scss/footer.scss";
import "./assets/scss/mediaQueries.scss";
import "./assets/scss/modal.scss";
import "./assets/scss/navbar.scss";
import "./assets/scss/offcan.scss";
import "./assets/scss/renderAllCards.scss";
import "./assets/scss/sideScroller.scss";
import "./assets/scss/typography.scss";

renderCartView();
renderCheckoutForm();
postUserAddressForm();

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
