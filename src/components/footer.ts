export const renderFooter = function () {
document.querySelector("footer")!.innerHTML = `
<footer class="footer">
  <div class="scallop"></div>
  <div class="after-scallop text-center">

    <div class="logoContainerFooter">
      <img class="logoImgFooter" src="/img/candyCatz3.png" alt="Candycatz logo">
      <div class="contact-info">
        <h5>Slå oss en pling eller kom förbi!</h5>
        <ul class="address-list">
          <li> CandyCatz HQ</li>
          <li>Godisgatan 13A</li>
          <li> Gotteby, 12345</li>
          <li> Mailadress:<a href="candycatz@sweets.com">info@candycatz.com </a></li>
          <li> Telefonnummer: <a href="123-456-7890">123-456-7890</a></li>
        </ul>
      </div>
    </div>



    <div class="footer-icons text-center">
      <a href="https://www.facebook.com" target="_blank" rel="noopener">
        <i class="bi bi-facebook"></i>
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener">
        <i class="bi bi-instagram"></i>
      </a>
      <a href="https://www.yelp.com" target="_blank" rel="noopener">
        <i class="bi bi-yelp"></i>
      </a>
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