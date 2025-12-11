export const navbarEl = document.querySelector("nav") as HTMLElement;

export const renderNavbar = function () {
  navbarEl.innerHTML = `<div class="container-fluid navbarcontent">
          <a class="navbar-brand d-inline-block align-top" href="/index.html">
            <h1>CandyCatz</h1>
          </a>
          <!--VARUKORG-->
          <div id="#cartIcon" class="ms-auto ms-lg-auto order-lg-last m-2 me-3">
          <a class="nav-link position-relative" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <i class="navbarCart bi bi-cart4 fs-3"></i>
            <span
              class="navCartBadge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              0
            </span>
          </a>
          </div>

          <button
            class="navbar-toggler me-3"
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
                <a class="nav-link" href="#moreToMunch">More To Munch</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#footer">Candy Hotline</a>
              </li>
            </ul>
          </div>
        </div>`;
};

const closeMenu = function () {
  const btnNavbar = document.querySelector<HTMLButtonElement>(".navbar-toggle");
  const navBarCollapse =
    document.querySelector<HTMLDivElement>(".navbar-collapse");
  btnNavbar?.setAttribute("aria-expanded", "false");
  navBarCollapse?.classList.remove("show");
};

const navBar = document.querySelector<HTMLDivElement>(".navbar")!;
navBar.addEventListener("click", (e) => {
  const target = e.target as HTMLDivElement;
  const clickedNavLink = target.classList.contains("nav-link");

  if (!clickedNavLink) {
    return;
  } else {
    closeMenu();
  }
});
