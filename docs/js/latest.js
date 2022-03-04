//IMPORTS
import { d, navBarLink, sections } from "./elements.js";

const $sectionContent = d.querySelector(".latest-section"),
  $fragment = d.createDocumentFragment(),
  $formLatest = d.querySelector(".latest-form"),
  $getLatest = d.getElementById("get-latest-v");

const fetchingLatest = () => {
  d.addEventListener("submit", (e) => {
    let target = e.target;
    if (target === $formLatest) {
      e.preventDefault();
      let $from = target.from.value.toUpperCase();
      fetch(`https://api.frankfurter.app/latest?from=${$from}`)
        .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
        .then((latest) => {
          let rates = latest.rates;
          for (const currencies in rates) {
            let $div = d.createElement("div");
            $div.classList.add("currency-card");
            $div.innerHTML = `<img class="flag-icon" src="./assets/${$from}.png"> <p><strong>1 ${$from}</strong> is equal to <strong>${rates[currencies]} ${currencies}</strong></p> <img class="flag-icon" src="./assets/${currencies}.png">`;
            $fragment.appendChild($div);
          }
          $sectionContent.innerHTML = `<h3>Updated list of compared currencies rates to ${$from} rate</h3>`;
          $sectionContent.appendChild($fragment);
          const $clearLatestBtn = d.createElement("button");
          $clearLatestBtn.id = "clear-latest-dashboard";
          $clearLatestBtn.textContent = "Clear";
          $sectionContent.appendChild($clearLatestBtn);
        })
        .catch((err) => {
          if (err.status === 404) {
            $sectionContent.innerHTML = `<h3>Error ${err.status}: Not Found - The values may not exist</h3>`;
            const $clearLatestBtn = d.createElement("button");
            $clearLatestBtn.id = "clear-latest-dashboard";
            $clearLatestBtn.textContent = "Clear";
            $sectionContent.appendChild($clearLatestBtn);
          } else {
            $sectionContent.innerHTML = `<h3>Error ${err.status}: Oops! Something went wrong </h3>`;
            const $clearLatestBtn = d.createElement("button");
            $clearLatestBtn.id = "clear-latest-dashboard";
            $clearLatestBtn.textContent = "Clear";
            $sectionContent.appendChild($clearLatestBtn);
          }
        });
    }
  });
};

export const clickingLatest = () => {
  d.addEventListener("click", (e) => {
    let target = e.target;
    if (target === navBarLink[2] || target.matches("#latest")) {
      e.preventDefault();
      for (let i = 0; i < navBarLink.length; i++) {
        if (i === 2) {
          navBarLink[i].disabled = true;
        } else {
          navBarLink[i].disabled = false;
        }

        for (let i = 0; i < sections.length; i++) {
          if (i === 2) {
            sections[i].classList.remove("hidden");
          } else {
            sections[i].classList.add("hidden");
          }
        }
      }
    }
    if (target.matches("#get-latest-v")) {
      fetchingLatest();
    }
    if (target.matches("#clear-latest-dashboard")) {
      $sectionContent.innerHTML = null;
    }
    if (target.matches("#clear-latest-inputs")) {
      d.getElementById("from-latest").value = "";
    }
  });
};
