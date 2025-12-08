const cartView = document.querySelector("#cartView") as HTMLDivElement;
const checkoutForm = document.querySelector("#checkoutForm") as HTMLFormElement;
const placedOrderView = document.querySelector(
  "#placedOrderView"
) as HTMLDivElement;

export const renderCartView = function () {
  cartView.innerHTML = `<div class="accordion" id="accordionCart">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        CandyCart
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
      <div class="checkoutCartContainer"></div>
      </div>
    </div>
  </div>
`;
};

export const renderCheckoutForm = function () {
  checkoutForm.innerHTML = `
<div class="accordion formAccordion" id="accordionCheckout">  
<div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Checkout
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse accordionTwo " aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body">

<form id="form">
 <div class="form-group col-md-6">
    <label for="inputFirstName">Namn</label>
    <input type="text" class="form-control" id="inputFirstName" required placeholder= "Förnamn">
  </div>
   <div class="form-group col-md-6">
    <label for="inputLastName">Efternamn</label>
    <input type="text" class="form-control" id="inputLastName" required placeholder= "Efternamn">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail" required placeholder="Mailadress">
  </div>
  <div class="form-group col-md-6">
    <label for="inputNumber">Telefonnummer<span class="text-muted">(optional)</span></label>
    <input type="number" class="form-control" id="inputNumber" placeholder="Telefonnummer">
  </div>
  <div class="form-group col-md-6">
    <label for="inputAddress">Adress</label>
    <input type="text" class="form-control" id="inputAddress" required placeholder="Gatuadress">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">Ort</label>
      <input type="text" class="form-control" required id="inputCity">
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Postnummer</label>
      <input type="text" class="form-control" required id="inputZip">
    </div>
  </div>
  <button type="submit" class="submitBtn btn btn-primary mt-2">Slutför köp</button>
</form>     
 </div>
    </div>
  </div>
 
`;
  // get form and inputs after innerHTML

  const form = checkoutForm.querySelector<HTMLFormElement>("#form")!;
  const inputName = document.querySelector<HTMLInputElement>("#inputName")!;
  const inputEmail = document.querySelector<HTMLInputElement>("#inputEmail")!;
  const inputNumber = document.querySelector<HTMLInputElement>("#inputNumber")!;
  const inputAddress =
    document.querySelector<HTMLInputElement>("#inputAddress")!;
  const inputCity = document.querySelector<HTMLInputElement>("#inputCity")!;
  const inputZip = document.querySelector<HTMLInputElement>("#inputZip")!;

  // Listen to submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const orderData = {
      name: inputName.value,
      email: inputEmail.value,
      number: inputNumber.value,
      address: inputAddress.value,
      city: inputCity.value,
      zip: inputZip.value,
    };

    console.log("Order submitted:", orderData);

    // show Thank you
    postUserAddressForm();

    const accordionTwo =
      document.querySelector<HTMLDivElement>(".accordionTwo")!;
    const accordionThree =
      document.querySelector<HTMLDivElement>(".accordionThree")!;
    accordionTwo.classList.remove("show");
    accordionThree.classList.add("show");
  });
};

export const postUserAddressForm = function () {
  placedOrderView.innerHTML = `
<div class="accordion showAccordionCheckout" id="accordionPanelsStayOpenExample">  
<div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
      Tack för din beställning!
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse collapse accordionThree" aria-labelledby="panelsStayOpen-headingThree">
      <div class="accordion-body">
      <div> 
      <p> Här kommer att stå något i stil med "🍬tack för din beställning. välkommen åter! " </p>
      <p> Vi packar dina godsaker med extra kärlek och skickar dem till dig så snart som möjligt" </p>
      </div>
      
       <!-- Continue Shopping Button -->
            <div class="text-start mt-4 mb-4">
                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="offcanvas"  aria-label="Close">
                    <i class="bi bi-arrow-left me-2"></i>Continue Shopping</a>
                    </button>
            </div>

      `;
};
