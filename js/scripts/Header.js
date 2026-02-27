export class Header {
  constructor() {
    this.btnOpen = document.querySelector(".header__hamburger");
    this.btnClose = document.querySelector(".header__menu-close");
    this.menu = document.querySelector(".header__menu");

    this.init();
  }

  init() {
    this.btnOpen.addEventListener("click", () => {
      this.menu.classList.add("header__menu--open");
    });
    this.btnClose.addEventListener("click", () => {
      this.menu.classList.remove("header__menu--open");
    });

    // симуляция авторизации
    document.querySelector(".header").classList.add("header--authorized");
  }
}
