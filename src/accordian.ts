import { cartCheckout } from "./ui";

export const theCartView = cartCheckout.cartView.innerHTML = `<div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        CandyCart
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
`;

export const theCheckoutForm = cartCheckout.checkoutForm.innerHTML = `
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
    <label for="inputName">Name</label>
    <input type="text" class="form-control" id="inputName" required placeholder="Enter your name">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail4" required placeholder="Email">
  </div>
  <div class="form-group col-md-6">
    <label for="inputNumber">Phonenumber<span class="text-muted">(optional)</span></label>
    <input type="number" class="form-control" id="inputNumber" placeholder="Your phonenumber">
  </div>
  <div class="form-group col-md-6">
    <label for="inputAddress">Address</label>
    <input type="text" class="form-control" id="inputAddress" required placeholder="1234 Main St">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">City</label>
      <input type="text" class="form-control" required id="inputCity">
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Zip</label>
      <input type="text" class="form-control" required id="inputZip">
    </div>
  </div>
  <button type="submit" class="btn btn-primary mt-2">Submit order</button>
</form>      </div>
    </div>
  </div>
`;