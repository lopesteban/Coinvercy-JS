//IMPORTS
import { d, navBarLink, sections, hiddenMenuLinks } from "./elements.js";

const clickingOnInfo = () => {
  d.addEventListener("click", (e) => {
    let target = e.target;
    if (target === navBarLink[0] || target === hiddenMenuLinks[0]) {
      e.preventDefault();
      for (let i = 0; i < navBarLink.length; i++) {
        if (i === 0) {
          navBarLink[i].disabled = true;
        } else {
          navBarLink[i].disabled = false;
        }

        for (let i = 0; i < sections.length; i++) {
          if (i === 0) {
            sections[i].classList.remove("hidden");
          } else {
            sections[i].classList.add("hidden");
          }
        }
      }
    }
  });
};

export { clickingOnInfo };
