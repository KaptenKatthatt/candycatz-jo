import type { ResponseData } from "../services/candyApiTypes";
import { createOrdertoSend } from "../services/candyPOST_API";



const cartView = document.querySelector("#cartView") as HTMLDivElement;
const checkoutForm = document.querySelector("#checkoutForm") as HTMLFormElement;
const placedOrderView = document.querySelector("#placedOrderView") as HTMLDivElement;

export interface AddressData {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
}

export const renderCartView = function () {
  cartView.innerHTML = `<div class="accordion" id="accordionCandyCart">
  <div class="accordion-item">
   <!-- Header -->
    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button" type="button" 
      data-bs-toggle="collapse"
       data-bs-target="#panelsStayOpen-collapseOne" 
       aria-expanded="true" 
       aria-controls="panelsStayOpen-collapseOne">
        CandyCart
      </button>
    </h2>
     <!-- Collapse content -->
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show accordionOne" 
    aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
      <h3>Din CandyCart – godis som gör hjärtat happy 💝</h3>
      <div class="checkoutCartContainer"></div>
      </div>
    
     <!--  Button -->
     <div class="text-center mt-2 mb-4 d-block mx-auto">
     <button type="button" class="proceedBtn btn btn-primary">Fortsätt till kassan</button>
  </div>
   </div>
    </div>
    </div>
`;


// Click -Fortsätt till kassan
const proceedBtn =document.querySelector<HTMLDivElement>(".proceedBtn")!;
proceedBtn.addEventListener("click",() =>{

const collapseOne = document.querySelector<HTMLDivElement>("#panelsStayOpen-collapseOne")!;
const collapseTwo = document.querySelector<HTMLDivElement>("#panelsStayOpen-collapseTwo")!;

if (collapseOne && collapseTwo){ 
  collapseOne.classList.remove("show");
  collapseTwo.classList.add("show"); 
  window.scrollTo({top: 500, behavior:"smooth"});
}
});

};

export const renderCheckoutForm = function () {
  checkoutForm.innerHTML = `
<div class="accordion formAccordion" id="accordionCheckoutForm">  
<div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Checkout
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse accordionTwo " aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body">
      <h3> Fyll i dina uppgifter </h3>

<form id="form">
 <div class="form-group col-md-6">
    <label for="inputFirstName">Namn</label>
    <input type="text" class="form-control" id="inputFirstName" required placeholder="Förnamn" value="Kalle">
  </div>
   <div class="form-group col-md-6">
    <label for="inputLastName">Efternamn</label>
    <input type="text" class="form-control" id="inputLastName" required placeholder="Efternamn" value="Anka">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" class="form-control" id="inputEmail" required placeholder="Mailadress" value="kalle@ankeborgen.se">
  </div>
  <div class="form-group col-md-6">
    <label for="inputNumber">Telefonnummer<span class="text-muted">(optional)</span></label>
    <input type="number" class="form-control" id="inputNumber" placeholder="Telefonnummer" value="0701111111">
  </div>
  <div class="form-group col-md-6">
    <label for="inputAddress">Adress</label>
    <input type="text" class="form-control" id="inputAddress" required placeholder="Gatuadress" value="Kvackvägen 13">
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputCity">Ort</label>
      <input type="text" class="form-control" required id="inputCity" value="Ankeborg">
    </div>
    <div class="form-group col-md-2">
      <label for="inputZip">Postnummer</label>
      <input type="text" class="form-control" required id="inputZip" minlength="5" maxlength="6" value="12345">
    </div>
  </div>
  <button type="submit" class="submitBtn btn btn-primary mt-2">Slutför köp</button>
</form>     
 </div>
    </div>
  </div>
 
`;

 const collapseTwo =document.querySelector<HTMLDivElement>("#panelsStayOpen-collapseTwo")!;


  // get form and inputs after innerHTML

  const form = checkoutForm.querySelector<HTMLFormElement>("#form")!;
  const inputFirstName =document.querySelector<HTMLInputElement>("#inputFirstName")!;
  const inputLastName =document.querySelector<HTMLInputElement>("#inputLastName")!;
  const inputEmail = document.querySelector<HTMLInputElement>("#inputEmail")!;
  const inputNumber = document.querySelector<HTMLInputElement>("#inputNumber")!;
  const inputAddress =document.querySelector<HTMLInputElement>("#inputAddress")!;
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


    await createOrdertoSend(orderData); 

    // Open step 3
     const collapseThree =document.querySelector<HTMLDivElement>("#panelsStayOpen-collapseThree")!;
   collapseTwo.classList.remove("show");
    collapseThree.classList.add("show");
    window.scrollTo({ top: 500, behavior:"smooth"});

  });
};

export const postUserAddressForm = function (responseData: ResponseData) {
  placedOrderView.innerHTML = `
<div class="accordion showAccordionCheckout" id="accordionThanks">  
<div class="accordion-item">
    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button class="accordion-button collapsed" type="button"
      data-bs-toggle="collapse" 
      data-bs-target="#panelsStayOpen-collapseThree" 
      aria-expanded="false"
      aria-controls="panelsStayOpen-collapseThree"
      disabled>
      Orderbekräftelse!
      </button>
    </h2>

    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse accordionThree" 
    aria-labelledby="panelsStayOpen-headingThree">
      <div class="accordion-body">
      
      
      <div class="wavecardAccord"> 
     <h2>Smiles, ${responseData.data.customer_first_name}!</h2>
      <p> Vi har mottagit din beställning och allt är redo i vårt godislaboratorium.
       När din order skickas får du ett nytt meddelande med spårningsinformation, 
       så att du kan följa dina godsaker hela vägen hem. </p>
     <p> Order: ${responseData.data.id} | Datum för beställning: ${responseData.data.order_date} </p>
       <h4>Här är din order:</h4>
      <ul></ul> 
       <p> Njut av sötchocken!</p>
        <p> Med vänlig hälsning, CandyCatz 💖</p>
      </div>
      

       <!-- Continue Shopping Button -->
            <div class="text-start mt-4 mb-4">
                <button type="button" class="btn btn-outline-primary" onclick="location.reload()">
                    <i class="bi bi-arrow-left me-2"></i>Fortsätt att handla!</button>
            </div>
        </div>
        </div>
        </div>
      `;
};
