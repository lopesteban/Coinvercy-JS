import { d, w } from "./elements.js";
import { clickingCurrencies } from "./get-currencies.js";
import { clickingLatest } from "./latest.js";
import { clickingHistorical } from "./historical.js";
import { clickingOnInfo } from "./info.js";
import { clickingDisclaimer } from "./disclaimer.js";
import { clickOnHiddenLinks } from "./hiddenMenu.js";

// const clickOnHiddenLinks = () => {
//   d.addEventListener("click", (e) => {
//     let target = e.target;
//     if (target === hamburgerBtn || target.matches(".hamburger i")) {
//       e.preventDefault();
//       hiddenMenu.classList.add("animate__animated", "animate__fadeInLeft");
//     }
//   });
// };

// w.addEventListener("resize", (e) => {
//   if (w.innerWidth > 658) {
//     hiddenMenu.classList.remove("animate__animated", "animate__fadeInLeft");
//   }
// });

d.addEventListener("DOMContentLoaded", (e) => {
  clickingCurrencies();
  clickingLatest();
  clickingHistorical();
  clickingOnInfo();
  clickingDisclaimer();
  clickOnHiddenLinks();
});
