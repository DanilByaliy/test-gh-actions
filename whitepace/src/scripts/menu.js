import { isMobile } from "./utils";

// Menu burger
const menuIcon = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");

menuIcon.addEventListener("click", () => {
  document.body.classList.toggle("_lock");
  menuIcon.classList.toggle("_active");
  menuBody.classList.toggle("_active");
});

// Sub menu
const subMenuTriggers = document.querySelectorAll(".menu__arrow");

const openSubMenuHandler = (e) => {
  const targetElement = e.target;
  if (window.innerWidth > 768 && isMobile.any()) {
    targetElement.closest(".menu__item").classList.toggle("_hover");
  }
};

subMenuTriggers.forEach((trigger) => {
  trigger.addEventListener("click", openSubMenuHandler);
});

// Close element handler
document.addEventListener("click", (e) => {
  const target = e.target;

  const openedSubMenus = document.querySelectorAll(".menu__item._hover");
  if (window.innerWidth > 768 && isMobile.any()) {
    if (!target.closest(".menu__item") && openedSubMenus.length > 0) {
      openedSubMenus.forEach((menu) => menu.classList.remove("_hover"));
    }
  }
});
