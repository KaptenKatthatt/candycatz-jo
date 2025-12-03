const cartView = document.querySelector("#cartView") as HTMLDivElement;
const checkoutForm = document.querySelector("#checkoutForm") as HTMLDivElement;
const placedOrderView = document.querySelector("#placedOrderView") as HTMLDivElement; 

export const renderCartView = function () {
  cartView.innerHTML = `<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        CandyCart
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
         It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
`;
};

export const renderCheckoutForm = function () {
  checkoutForm.innerHTML = `
<div class="accordion" id="accordionPanelsStayOpenExample">  
<div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Checkout
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body">

<form>
 <div class="form-group col-md-6">
    <label for="inputName">Namn</label>
    <input type="text" class="form-control" id="inputName" required placeholder= "För- och efternamn">
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
  <button type="submit" class="submitFormBtn btn btn-primary mt-2">Slutför köp</button>
</form>     
 </div>
    </div>
  </div>
 

`;
};




export const postUserAddressForm = function () {
  placedOrderView.innerHTML = `
<div class="accordion" id="accordionPanelsStayOpenExample">  
<div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
      Tack för din beställning!
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
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
