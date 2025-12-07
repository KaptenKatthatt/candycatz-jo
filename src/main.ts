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
import { postToCyberDyneHQ } from "./services/postAPI";
import { sideScroller } from "./components/sideScroller";

//SCSS imports
import "./assets/scss/app.scss";
import "./assets/scss/offcan.scss";
import "./assets/scss/typography.scss";
import "./assets/scss/modal.scss";
import "./assets/scss/renderAllCards.scss";
import "./assets/scss/sideScroller.scss";

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

import type { SubmittedOrderData } from "./services/postAPI";
const orderData: SubmittedOrderData = {
  customer_first_name: "Jonas",
  customer_last_name: "Andersson",
  customer_address: "Storgatan 123",
  customer_postcode: "12345",
  customer_city: "Stockholm",
  customer_email: "jonas@example.com",
  order_total: "12",
  order_items: [
    {
      product_id: 5216,
      qty: 1,
      item_price: 12,
      item_total: 12,
    },
  ],
};

// postToCyberDyneHQ(orderData);
