export const cartViewTemplate = function () {
  return `
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
          <div class="checkout-cart-container pink-shadow"></div>
          <!-- Order summary -->
          <div class="checkout-order-summary pink-shadow mt-4 my-4">
            <div class="card-body">
              <h5 class="order-summary-header mb-4">Ordersummering</h5>
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
            <div class="proceed-to-checkout-btn-container text-center mt-2 mx-auto" aria-label="Go to checkout">
              <button type="button" class="proceed-to-checkout-btn btn mt-5" aria-label="Continue to checkout">😸 <i class="bi bi-chevron-down"></i> Fortsätt till
                kassan! <i class="bi bi-chevron-down"></i> 😸</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
};

export const checkoutFormTemplate = function () {
  return `
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
                      <button type="submit" id="submit-order-btn" class="btn mt-2" aria-label="Submit order">Slutför köp</button>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
              `;
};

export const carouselTemplate = function () {
  return `<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="/img/sockerKick.png" class="d-block w-100" alt="Picture of yummy candy" fetchpriority="high" loading="eager"/>
        </div>
        <div class="carousel-item">
          <img src="/img/suris.webp" class=" w-100" alt="Picture with sour sweet treats"/>
        </div>
        <div class="carousel-item">
          <img src="/img/godisdag.webp" class=" w-100" alt="Picture of soft mashmallow"/>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev">
        <span aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next">
        <span aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>`;
};
