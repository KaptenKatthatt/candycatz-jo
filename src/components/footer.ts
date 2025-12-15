export const renderFooter = function () {
  document.querySelector("footer")!.innerHTML = `


    <footer class="footer">
      <div class="scallop"></div>
      <div class="after-scallop text-center">

        <div class="contact-info">
            <h6>Slå oss en pling eller kom förbi!</h6>
                <ul class="address-list">
                    <li> CandyCatz HQ</li>
                    <li>Godisgatan 13A</li>
                    <li> Gotteby, 12345</li>
                    <li> Mailadress:<a href="candycatz@sweets.com">info@candycatz.com </a></li>
                    <li> Telefonnummer: <a href="123-456-7890">123-456-7890</a></li>
                </ul>
        </div>
       
        

        <div class="footer-icons text-center">
        <a href="https://www.facebook.com"target="_blank" rel="noopener">
          <i class="bi bi-facebook"></i> 
          </a>
          <a href="https://www.instagram.com"target="_blank" rel="noopener">
          <i class="bi bi-instagram"></i>
          </a>
          <a href="https://www.yelp.com"target="_blank" rel="noopener">
          <i class="bi bi-yelp"></i>
          </a>
        </div>



        <hr>
        <div class="footer-text">
          <p>
            &copy; 2025 CandyCatz - "🍬 Pop and chew - all dreams come true! 🍭"
          </p>
          <p class="gangGang">Created by
           <a href="https://www.linkedin.com/in/jonas-olson-79858a63/" target="_blank" rel="noopener">Jonas</a>,
            <a href="https://www.linkedin.com/in/sophia-englund" target="_blank" rel="noopener">Sophia</a>
            &amp; 
          <a href="https://www.linkedin.com/in/klarathelllenntorp" target="_blank" rel="noopener">Klara</a>
          </p>
        </div>
      </div>
    </footer>

  </body>
</html>
</footer>
`;
};
