//IMPORTS
import { d, navBarLink, sections } from "./elements.js";

const $sectionContent = d.querySelector(".users-section"),
  $fragment = d.createDocumentFragment(),
  $form = d.querySelector(".currency-form");

const fetchingCurrencies = () => {
  fetch("https://api.frankfurter.app/currencies")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((currencies) => {
      for (const currency in currencies) {
        let $div = d.createElement("div"),
          $divContent = `<a href="#">Currency: <strong>${currencies[currency]}</strong> - Acronym: <strong>${currency}</strong></a><hr>`;
        $div.insertAdjacentHTML("afterbegin", $divContent);
        $fragment.appendChild($div);
      }
      $sectionContent.appendChild($fragment);
    })
    .catch((err) => {
      if (err.status === 404) {
        $sectionContent.innerHTML = `Error ${err.status}: Not Found - The values may not exist`;
      } else {
        $sectionContent.innerHTML = `<h3>Error ${err.status}: Oops! Something went wrong </h3>`;
      }
    });
};

const converting = () => {
  d.addEventListener("submit", (e) => {
    let target = e.target,
      $amount = target.amount.value,
      $from = target.from.value.toUpperCase(),
      $to = target.to.value.toUpperCase();
    if (target === $form) {
      e.preventDefault();
      fetch(
        `https://api.frankfurter.app/latest?amount=${$amount}&from=${$from}&to=${$to}`
      )
        .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
        .then((data) => {
          $sectionContent.innerHTML = null;
          let $div = d.createElement("div"),
            $divContent = `<p>${$amount} ${$from} is equal to ${data.rates[$to]} ${$to}</p>`;
          $div.insertAdjacentHTML("afterbegin", $divContent);
          $sectionContent.appendChild($div);
        })
        .catch((err) => {
          if (err.status === 404) {
            $sectionContent.innerHTML = null;
            $sectionContent.innerHTML = `Error ${err.status}: Not Found - The values may not exist`;
          } else {
            $sectionContent.innerHTML = null;
            $sectionContent.innerHTML = `<h3>Error ${err.status}: Oops! Something went wrong </h3>`;
          }
        });
    }
  });
};

export const clickingCurrencies = () => {
  d.addEventListener("click", (e) => {
    let $buttons = d.querySelectorAll("button"),
      target = e.target;
    if (target === navBarLink[1]) {
      e.preventDefault();
      for (let i = 0; i < navBarLink.length; i++) {
        if (i === 1) {
          navBarLink[i].disabled = true;
        } else {
          navBarLink[i].disabled = false;
        }

        for (let i = 0; i < sections.length; i++) {
          if (i === 1) {
            sections[i].classList.remove("hidden");
          } else {
            sections[i].classList.add("hidden");
          }
        }
      }
    }
    if (target.matches("#get-currencies")) {
      fetchingCurrencies();
      $buttons.forEach((btn) => {
        if (btn === target) btn.disabled = true;
      });
    }
    if (target.matches("#calculate")) {
      converting();
      $buttons.forEach((btn) => {
        btn.disabled = false;
      });
    }

    if (target.matches("#clear")) {
      $sectionContent.innerHTML = null;

      $buttons.forEach((btn) => {
        btn.disabled = false;
      });
    }
    if (target.matches("#clear-converter-inputs")) {
      d.getElementById("amount").value = "";
      d.getElementById("from-converter").value = "";
      d.getElementById("to-converter").value = "";
    }
  });
};
