import type { AddressData, ResponseData } from "../services/candyApiTypes";
import { createOrdertoSend } from "../services/candyPOST_API";
import { clearCart } from "./cart";
import { getCartArrayFromLocalStorage } from "./localStorage";

const cartView = document.querySelector("#cartView") as HTMLDivElement;
const checkoutForm = document.querySelector("#checkoutForm") as HTMLFormElement;
const placedOrderView = document.querySelector(
  "#placedOrderView"
) as HTMLDivElement;

export const renderCartView = function () {
  cartView.innerHTML = `
<div class="accordion mt-5" id="accordionCandyCart">
  <div class="accordion-item">
    <!-- Header -->
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne" >
        🍭CandyCart
      </button>
    </h2>
    <!-- Collapse content -->
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show accordionOne"
      aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body d-flex flex-column align-items-center">

        <img class="checkout-logo mb-2" src="/img/candyCatzLogo_pinkBG.webp" alt="Logo for Candycatz">
        <div class="checkout-and-order-summary-container">
          <div class="checkoutCartContainer card"></div>
          <!-- Order summary -->
          <div class="card checkout-order-summary mt-4 my-4">
            <div class="card-body">
              <h5 class="order-summary-header text-dark mb-4">Ordersummering</h5>
              <div class="d-flex justify-content-between mb-3">
                <span>Summa</span>
                <span class="checkout-subtotal-container"></span>
              </div>
              <div class="have-discount-container d-flex justify-content-between mb-3">
              </div>
              <div class="d-flex justify-content-between mb-4">
                <span>Frakt</span>
                <span>19 kr</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between mb-4">
                <strong>Totalt</strong>
                <span class="checkout-total-cost-container"><strong></strong></span>
              </div>
            </div>
            <!--  Continue to checkout button -->
            <div class="proceed-btn-container text-center mt-2 mx-auto" aria-label="Go to checkout">
              <button type="button" class="proceed-btn btn btn-primary mt-5" aria-label="Continue to checkout">😸 <i class="bi bi-chevron-down"></i> Fortsätt till
                kassan! <i class="bi bi-chevron-down"></i> 😸</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  // Click -Continue to checkout
  const proceedBtn = document.querySelector<HTMLButtonElement>(".proceed-btn")!;
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
  checkoutForm.innerHTML = `
        <div class="accordion formAccordion" id="accordionCheckoutForm">
          <div class="accordion-item">
            <!-- Header -->
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true"
                aria-controls="panelsStayOpen-collapseTwo">
                🍬Checkout
              </button>
            </h2>
            <!-- Collapse content -->
            <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse  accordionTwo "
              aria-labelledby="panelsStayOpen-headingTwo">
              <div class="accordion-body m-auto">
                <div class="glow-form p-4 my-4 card">
                <h3 class="form-title"> Fyll i dina uppgifter! </h3>

                <form id="form">
                  <div class="form-group col-6-md">
                    <label for="inputFirstName">Namn:</label>
                    <input type="text" class="form-control" id="inputFirstName" required placeholder="Förnamn"
                      value="Kalle">
                  </div>
                  <div class="form-group col-6-md">
                    <label for="inputLastName">Efternamn:</label>
                    <input type="text" class="form-control" id="inputLastName" required placeholder="Efternamn"
                      value="Anka">
                  </div>
                  <div class="form-row">
                    <div class="form-group col-6-md">
                      <label for="inputEmail">Email:</label>
                      <input type="email" class="form-control" id="inputEmail" required placeholder="Mailadress"
                        value="kalle@ankeborgen.se">
                    </div>
                    <div class="form-group col-6-md">
                      <label for="inputNumber">Telefonnummer:<span class="text-muted">(optional)</span></label>
                      <input type="number" class="form-control" id="inputNumber" placeholder="Telefonnummer"
                        value="0701111111">
                    </div>
                    <div class="form-group col-6-md">
                      <label for="inputAddress">Adress:</label>
                      <input type="text" class="form-control" id="inputAddress" required placeholder="Gatuadress"
                        value="Kvackvägen 13">
                    </div>
                    <div class="form-row">
                      <div class="form-group col-6-md">
                        <label for="inputCity">Ort:</label>
                        <input type="text" class="form-control" required id="inputCity" value="Ankeborg">
                      </div>
                      <div class="form-group col-6-md">
                        <label for="inputZip">Postnummer:</label>
                        <input type="text" class="form-control" required id="inputZip" minlength="5" maxlength="6"
                          value="12345">
                      </div>
                    </div>
                  </div>
                  <button type="submit" class="submitBtn btn btn-primary mt-2" aria-label="Submit order">Slutför köp</button>
                </form>
                </div>
              </div>
            </div>
          </div>
          `;

  const collapseTwo = document.querySelector<HTMLDivElement>(
    "#panelsStayOpen-collapseTwo"
  )!;

  // get form and inputs after innerHTML

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
      await createOrdertoSend(orderData);
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

    return orderItemsInConfirmation
      .map((product) => {
        const thumbnailURL = `https://www.bortakvall.se${product.thumbnail}`;

        return `<div class="d-flex justify-content-start mb-2 rounded-4 p-1 border-0 mx-auto"
                                style="background: transparent; box-shadow: none; width: 20rem;">
                                <img src="${thumbnailURL}" class="rounded-4 me-3"
                                  style="width: 50px; height: 50px; object-fit: cover;" alt="Image of ${product.name}">
                                <div class="d-flex align-items-center m-0">
                                  <h5 class="card-title text-sum text-center">${product.qty} x ${product.name}</h5>
                                </div>
                              </div>`;
      })
      .join("");
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

                                      <!-- Continue Shopping Button -->
                                    <button type="button" class="goBackToHomeBtn btn btn-primary mt-5" onclick="location.reload()" aria-label="Go back to main page">
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
