//IMPORTS
import { d, sections } from "./elements.js";

export const clickingDisclaimer = () => {
  d.addEventListener("click", (e) => {
    let target = e.target;
    if (target.matches("#disclaimer")) {
      e.preventDefault();

      for (let i = 0; i < sections.length; i++) {
        if (i === 4) {
          sections[i].classList.remove("hidden");
        } else {
          sections[i].classList.add("hidden");
        }
      }
    }
  });
};
