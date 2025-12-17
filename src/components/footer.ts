export const renderFooter = function () {
document.querySelector("footer")!.innerHTML = `
<footer class="footer">
  <div class="scallop"></div>
  <div class="after-scallop text-center">

    <div class="logoContainerFooter">
      <div class="contact-info">
        <h5>Slå oss en pling eller kom förbi!</h5>
          <p>CandyCatz HQ<br>
          Godisgatan 13A<br>
          Gotteby, 12345<br>
          Mailadress:<a href="candycatz@sweets.com">info@candycatz.com </a><br>
          Telefonnummer: <a href="123-456-7890">123-456-7890</a></p>
      </div>
      <img class="logoImgFooter img-fluid" src="/img/candyCatz3.png" alt="Candycatz logo">
    </div>



    <div class="footer-icons text-center">
      <a href="https://www.facebook.com" target="_blank"><i class="bi bi-facebook"></i></a>
      <a href="https://www.instagram.com" target="_blank"><i class="bi bi-instagram"></i></a>
      <a href="https://www.yelp.com" target="_blank"><i class="bi bi-yelp"></i></a>
    </div>

    <hr>
    <div class="footer-text">
      <p>
        &copy; 2025 CandyCatz - "🍬 Pop and chew - all dreams come true! 🍭"
      </p>
      <p class="gangGang">Created by <br>
        <a href="https://www.linkedin.com/in/jonas-olson-79858a63/" target="_blank">Jonas</a>,
        <a href="https://www.linkedin.com/in/sophia-englund" target="_blank">Sophia</a>
        &amp;
        <a href="https://www.linkedin.com/in/klarathelllenntorp" target="_blank">Klara</a>
      </p>
    </div>
  </div>
</footer>
</body>

</html>
</footer>
`;
};