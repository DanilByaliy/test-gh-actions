import "./scss/styles.scss";
import { useDynamicAdapt } from "./tools/dynamic-adapt.js";

useDynamicAdapt();

let burger = document.querySelector(".header__burger");
let menu = document.querySelector(".header__menu");

function toggleBurger() {
  burger.addEventListener("click", function () {
    burger.classList.toggle("header__burger--active");
    menu.classList.toggle("header__menu--active");
    document.body.classList.toggle("body--lock");
  });
}

toggleBurger();
