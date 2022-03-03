//IMPORTS
import { d, navBarLink, sections } from "./elements.js";

const $sectionContent = d.querySelector(".users-section"),
  $currenciesListContent = d.querySelector(".display-currencies-section"),
  $fragment = d.createDocumentFragment(),
  $form = d.querySelector(".currency-form");

const fetchingCurrencies = () => {
  fetch("https://api.frankfurter.app/currencies")
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((currencies) => {
      for (const currency in currencies) {
        let $div = d.createElement("div"),
          $divContent = `<div class="currency-link" value="${currency}" >Currency: <strong>${currencies[currency]}</strong> - Acronym: <strong>${currency}</strong></div><hr>`;
        $div.insertAdjacentHTML("afterbegin", $divContent);
        $fragment.appendChild($div);
      }
      $currenciesListContent.appendChild($fragment);
      const $clearListBtn = d.createElement("button");
      $clearListBtn.id = "clear-list-dashboard";
      $clearListBtn.textContent = "Clear";
      $currenciesListContent.appendChild($clearListBtn);
    })
    .catch((err) => {
      if (err.status === 404) {
        $currenciesListContent.innerHTML = `<h3>Error ${err.status}: Not Found - The values may not exist</h3>
        `;
        const $clearListBtn = d.createElement("button");
        $clearListBtn.id = "clear-list-dashboard";
        $clearListBtn.textContent = "Clear";
        $currenciesListContent.appendChild($clearListBtn);
      } else {
        $currenciesListContent.innerHTML = `<h3>Error ${err.status}: Oops! Something went wrong </h3>`;
      }
    });
};

const converting = () => {
  d.addEventListener("submit", (e) => {
    let target = e.target,
      $amount = target.amount.value,
      $from = target.from.value,
      $to = target.to.value;

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
          const $clearConvercyBtn = d.createElement("button");
          $clearConvercyBtn.id = "clear-converter-dashboard";
          $clearConvercyBtn.textContent = "Clear";
          $sectionContent.appendChild($clearConvercyBtn);
        })
        .catch((err) => {
          if (err.status === 404) {
            $sectionContent.innerHTML = null;
            $sectionContent.innerHTML = `<h3>Error ${err.status}: Not Found - The values may not exist</h3>
            `;
            const $clearConvercyBtn = d.createElement("button");
            $clearConvercyBtn.id = "clear-converter-dashboard";
            $clearConvercyBtn.textContent = "Clear";
            $sectionContent.appendChild($clearConvercyBtn);
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
    }
    if (target.matches("#invert-values")) {
      [$form.from.value, $form.to.value] = [$form.to.value, $form.from.value];
    }
    if (target.matches("#clear-list-dashboard")) {
      $currenciesListContent.innerHTML = null;

      $buttons.forEach((btn) => {
        btn.disabled = false;
      });
    }

    if (target.matches("#clear-converter-dashboard")) {
      $sectionContent.innerHTML = null;
    }

    if (target.matches("#clear-converter-inputs")) {
      d.getElementById("amount").value = "";
      d.getElementById("from-converter").value = "";
      d.getElementById("to-converter").value = "";
    }
  });
};
