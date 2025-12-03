export const navbarEl = document.querySelector("nav") as HTMLElement;

export const renderNavbar = function () {
  navbarEl.innerHTML = `<div class="container-fluid">
          <a class="navbar-brand" href="/index.html">
            <img
              src="/src/assets/img/candyCatzLogo.png"
              width="300px"
              class="d-inline-block align-top"
              alt="CandyCatz logo"
            />
          </a>
          <!--VARUKORG-->
          <div id="#cartIcon" class="ms-auto me-3">
          <a class="nav-link position-relative" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <i class="bi bi-cart4 fs-3"></i>
            <span
              class="navCartBadge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              0
            </span>
          </a>
          </div>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav text-end ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#topTreats">Top Treats</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#sweetSavings">Sweet Savings</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#footer">Candy Hotline</a>
              </li>
            </ul>
          </div>
        </div>`;
};
