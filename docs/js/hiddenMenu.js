import { d, hiddenMenu, w, hamburgerBtn } from "./elements.js";

export const clickOnHiddenLinks = () => {
  d.addEventListener("click", (e) => {
    let target = e.target;
    if (target === hamburgerBtn || target.matches(".hamburger i")) {
      e.preventDefault();
      hiddenMenu.classList.add("animate__animated", "animate__fadeInLeft");
    }
    if (target.matches(".hidden-link")) {
      hiddenMenu.classList.remove("animate__animated", "animate__fadeInLeft");
    }
  });
  w.addEventListener("resize", (e) => {
    if (w.innerWidth > 658) {
      hiddenMenu.classList.remove("animate__animated", "animate__fadeInLeft");
    }
  });
};
