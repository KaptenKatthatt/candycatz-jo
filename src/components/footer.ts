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
          <i class="bi bi-facebook"></i>
          <i class="bi bi-instagram"></i>
          <i class="bi bi-yelp"></i>
        </div>



        <hr>
        <div class="footer-text">
          <p>
            &copy; 2025 CandyCatz - "🍬 Pop and chew - all dreams come true! 🍭"
          </p>
          <p>Created by Jonas, Sophia & Klara</p>
        </div>
      </div>
    </footer>

  </body>
</html>
</footer>
`;
};
