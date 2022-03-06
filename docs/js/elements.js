/*ELEMENTS*/
const d = document,
  w = window,
  navBarLink = Array.from(d.querySelectorAll(".navlink")),
  sections = Array.from(d.querySelectorAll(".main")),
  hamburgerBtn = d.querySelector(".hamburger"),
  hiddenMenu = d.querySelector(".hidden-menu"),
  hiddenMenuLinks = Array.from(d.querySelectorAll(".hidden-link"));

//EXPORTS
export {
  d,
  w,
  navBarLink,
  sections,
  hiddenMenu,
  hiddenMenuLinks,
  hamburgerBtn,
};
