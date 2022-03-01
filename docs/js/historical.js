import { d, navBarLink, sections } from "./elements.js";

const $sectionContent = d.querySelector(".historical-section"),
  $fragment = d.createDocumentFragment(),
  $formHistory = d.querySelector(".history-form"),
  $formBetween = d.querySelector(".history-between"),
  $getHistorical = d.getElementById("get-historical"),
  $getHistoricalBetween = d.getElementById("get-historical-between"),
  historicalInputs = Array.from(d.querySelectorAll("[data-historical]"));

const getHistorical = () => {
  d.addEventListener("submit", (e) => {
    let target = e.target;
    if (target === $formHistory) {
      e.preventDefault();

      let $from = target.from.value;
      let $day = target.day.value,
        $month = target.month.value,
        $year = target.year.value;

      fetch(
        `https://api.frankfurter.app/${$year}-${$month}-${$day}?from=${$from}`
      )
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((dates) => {
          let currencyDates = dates.rates;
          for (const currencies in currencyDates) {
            let $div = d.createElement("div"),
              $divsContent = `<p>1 ${$from} = ${currencyDates[currencies]} ${currencies}</p>`;
            $div.insertAdjacentHTML("afterbegin", $divsContent);
            $fragment.appendChild($div);
          }
          $sectionContent.innerHTML = `<h3>Historical comparisons between ${$from} and other currencies</h3>`;
          $sectionContent.appendChild($fragment);
        })
        .catch((err) => {
          if (err.status === 404) {
            $sectionContent.innerHTML = `Error ${err.status}: Not Found - The values may not exist`;
          } else {
            $sectionContent.innerHTML = `<h3>Error ${err.status}: Oops! Something went wrong </h3>`;
          }
        });
    }
  });
};

const getHistoricalBetween = () => {
  d.addEventListener("submit", (e) => {
    let target = e.target;
    if (target === $formBetween) {
      e.preventDefault();

      let $from = target.fromB.value.toUpperCase(),
        $to = target.toB.value.toUpperCase(),
        $day = target.dayB.value,
        $month = target.monthB.value,
        $year = target.yearB.value;

      fetch(
        `https://api.frankfurter.app/${$year}-${$month}-${$day}?from=${$from}&to=${$to}`
      )
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((currencies) => {
          let rate = currencies.rates[$to],
            $div = d.createElement("div"),
            $divsContent = `<p>${$day}-${$month}-${$year}: A ${$from} was equal to ${rate} ${$to}</p>`;
          $div.insertAdjacentHTML("afterbegin", $divsContent);
          $sectionContent.appendChild($div);
          $getHistoricalBetween.disabled = true;
        })
        .catch((err) => {
          if (err.status === 404) {
            $sectionContent.innerHTML = `Error ${err.status}: Not Found - The values may not exist`;
          } else {
            $sectionContent.innerHTML = `<h3>Error ${err.status}: Oops! Something went wrong </h3>`;
          }
        });
    }
  });
};

export const clickingHistorical = () => {
  d.addEventListener("click", (e) => {
    let target = e.target;
    if (target === navBarLink[3]) {
      e.preventDefault();
      for (let i = 0; i < navBarLink.length; i++) {
        if (i === 3) {
          navBarLink[i].disabled = true;
        } else {
          navBarLink[i].disabled = false;
        }

        for (let i = 0; i < sections.length; i++) {
          if (i === 3) {
            sections[i].classList.remove("hidden");
          } else {
            sections[i].classList.add("hidden");
          }
        }
      }
    }
    if (target.matches("#get-historical")) getHistorical();
    if (target.matches("#get-historical-between")) getHistoricalBetween();
    if (target.matches("#clear")) {
      $sectionContent.innerHTML = null;
    }
    if (target.matches("#clear-historical-input")) {
      historicalInputs.forEach((input) => (input.value = ""));
      d.getElementById(
        "from-historical",
        "from-historical-B",
        "to-historical-B"
      ).value = "";
      d.getElementById("from-historical-B").value = "";
      d.getElementById("to-historical-B").value = "";
    }
  });
};
