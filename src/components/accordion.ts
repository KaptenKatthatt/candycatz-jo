import type { AddressData, ResponseData } from "../services/candyApiTypes";
import { createOrderToSend } from "../services/candyPOST_API";
import { clearCart } from "./cart";
import { getCartArrayFromLocalStorage } from "./localStorage";
import {
  cartViewTemplate,
  checkoutFormTemplate,
  orderConfirmationItemTemplate,
} from "./templates";

const cartView = document.querySelector("#cartView") as HTMLDivElement;
const checkoutForm = document.querySelector("#checkoutForm") as HTMLFormElement;
const placedOrderView = document.querySelector(
  "#placedOrderView"
) as HTMLDivElement;

export const renderCartView = function () {
  cartView.innerHTML = cartViewTemplate();

  // Click -Continue to checkout
  const proceedBtn = document.querySelector<HTMLButtonElement>(
    ".proceed-to-checkout-btn"
  )!;
  proceedBtn.addEventListener("click", () => {
    const collapseOne = document.querySelector<HTMLDivElement>(
      "#panelsStayOpen-collapseOne"
    )!;
    const collapseTwo = document.querySelector<HTMLDivElement>(
      "#panelsStayOpen-collapseTwo"
    )!;

    collapseOne.classList.remove("show");
    collapseTwo.classList.add("show");

    const collapseOneBtn = document.querySelector(
      "#panelsStayOpen-headingOne .accordion-button"
    )! as HTMLButtonElement;
    const collapseTwoBtn = document.querySelector(
      "#panelsStayOpen-headingTwo .accordion-button"
    )! as HTMLButtonElement;
    collapseOneBtn.setAttribute("aria-expanded", "false");
    collapseTwoBtn.setAttribute("aria-expanded", "true");

    window.scrollTo({ top: 100, behavior: "smooth" });
  });
};

export const renderCheckoutForm = function () {
  checkoutForm.innerHTML = checkoutFormTemplate();

  const collapseTwo = document.querySelector<HTMLDivElement>(
    "#panelsStayOpen-collapseTwo"
  )!;

  const form = checkoutForm.querySelector<HTMLFormElement>("#form")!;
  const inputFirstName =
    document.querySelector<HTMLInputElement>("#inputFirstName")!;
  const inputLastName =
    document.querySelector<HTMLInputElement>("#inputLastName")!;
  const inputEmail = document.querySelector<HTMLInputElement>("#inputEmail")!;
  const inputNumber = document.querySelector<HTMLInputElement>("#inputNumber")!;
  const inputAddress =
    document.querySelector<HTMLInputElement>("#inputAddress")!;
  const inputCity = document.querySelector<HTMLInputElement>("#inputCity")!;
  const inputZip = document.querySelector<HTMLInputElement>("#inputZip")!;

  // Listen to submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const orderData: AddressData = {
      customer_first_name: inputFirstName.value,
      customer_last_name: inputLastName.value,
      customer_email: inputEmail.value,
      customer_phone: inputNumber.value,
      customer_address: inputAddress.value,
      customer_city: inputCity.value,
      customer_postcode: inputZip.value,
    };
    try {
      await createOrderToSend(orderData);
    } catch (err) {
      console.error("Error in createOrderToSend", err);
    }
    // Open step 3
    const collapseThree = document.querySelector<HTMLDivElement>(
      "#panelsStayOpen-collapseThree"
    );

    collapseTwo.classList.remove("show");
    if (collapseThree) {
      collapseThree.classList.add("show");
    }

    const collapseTwoBtn = document.querySelector(
      "#panelsStayOpen-headingTwo .accordion-button"
    )! as HTMLButtonElement;
    collapseTwoBtn.setAttribute("aria-expanded", "false");

    const collapseThreeBtn = document.querySelector(
      "#panelsStayOpen-headingThree .accordion-button"
    )! as HTMLButtonElement;
    if (collapseThree) {
      collapseThreeBtn.setAttribute("aria-expanded", "true");
    }

    window.scrollTo({ top: 100, behavior: "smooth" });
  });
};

export const postUserAddressForm = function (responseData: ResponseData) {
  const generateOrderItemsInConfirmation = function () {
    const orderItemsInConfirmation = getCartArrayFromLocalStorage() || [];

    return orderItemsInConfirmation.map(orderConfirmationItemTemplate).join("");
  };

  placedOrderView.innerHTML = `
                              <div class="accordion showAccordionCheckout" id="accordionThanks">
                                <div class="accordion-item">
                                  <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                      data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true"
                                      aria-controls="panelsStayOpen-collapseThree">
                                      😺Orderbekräftelse!
                                    </button>
                                  </h2>

                                  <div id="panelsStayOpen-collapseThree"
                                    class="accordion-collapse collapse accordionThree"
                                    aria-labelledby="panelsStayOpen-headingThree">
                                    <div class="accordion-body">
                                      <div class="placed-order-container">
                                        <div class="wavecard-accord mt-3">
                                          <h2 class="smiles-txt">Smiles, ${
                                            responseData.data
                                              .customer_first_name
                                          }!</h2>
                                          <p> Vi har mottagit din beställning och allt är redo i vårt godislaboratorium.
                                            När din order skickas får du ett nytt meddelande med spårningsinformation,
                                            så att du kan följa dina godsaker hela vägen hem. </p>
                                          <p> <strong>Order:</strong> ${
                                            responseData.data.id
                                          } <strong>| Datum för beställning:</strong> ${
    responseData.data.order_date
  } </p>
                                          <p><strong>Leveransadress:</strong> ${
                                            responseData.data.customer_address
                                          }, ${
    responseData.data.customer_city
  }, ${responseData.data.customer_postcode} </p>
                                          <h4 class="order-confirmation-txt">Här är din order:</h4>
                                          <div class="d-flex flex-column align-items-start gap-2">
                                            ${generateOrderItemsInConfirmation()}
                                          </div>
                                          <p>Njut av sötchocken!</p>
                                          <p class="mt-4">Med vänlig hälsning,</p>
                                          <h5 class="order-confirmation-logo">CandyCatz</h5>
                                        </div>
                                      </div>

                                      <!-- Shop again Button -->
                                    <button type="button" id="shop-again-btn" class="btn mt-5" onclick="location.reload()" aria-label="Go back to main page">
                                     <i class="bi bi-arrow-left me-2"></i>Handla mera!
                                     </button>
                                    </div>
                                  </div>
                                </div>
                                `;

  clearCart();
};

const navBarEl = document.querySelector<HTMLLinkElement>(".navbar")!;
const accordianEl = document.querySelector<HTMLDivElement>(
  "#cartCheckoutContainer"
)!;
const allCardsContainerEl = document.querySelector<HTMLDivElement>(
  ".all-cards-container"
)!;

const openMainPage = function () {
  navBarEl.addEventListener("click", (e) => {
    const target = e.target as HTMLDivElement;
    const clickedNavLink = target.closest(".nav-link");
    if (clickedNavLink) {
      const innerBtnText = clickedNavLink.textContent.trim();
      if (!clickedNavLink.hasAttribute("data-bs-toggle")) {
        // Do nothing
      }
      if (innerBtnText === "Candy Hotline") {
        return;
      }

      if (accordianEl) {
        accordianEl.classList.add("d-none");
        allCardsContainerEl.classList.remove("d-none");
        document.querySelector(".carousel")?.classList.remove("d-none");
        document.querySelector(".scroll-container")?.classList.remove("d-none");
      }
    }
  });
};

openMainPage();
