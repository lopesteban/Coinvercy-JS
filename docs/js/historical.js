import { d, navBarLink, sections } from "./elements.js";

const $historicalBetweenSection = d.querySelector(
    ".display-historical-rate-between"
  ),
  $historicalRateSection = d.querySelector(".display-historical-rate"),
  $fragment = d.createDocumentFragment(),
  $formHistory = d.querySelector(".history-form"),
  $formBetween = d.querySelector(".history-between"),
  $getHistorical = d.getElementById("get-historical"),
  $getHistoricalBetween = d.getElementById("get-historical-between"),
  historicalInputs = Array.from(d.querySelectorAll("[data-historical]")),
  historicalBetweenInputs = Array.from(
    d.querySelectorAll("[data-historical-between]")
  );

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
          $historicalRateSection.innerHTML = `<h3>Historical comparisons between ${$from} and other currencies</h3>`;
          $historicalRateSection.appendChild($fragment);
          const $clearHsitoricalBtn = d.createElement("button");
          $clearHsitoricalBtn.id = "clear-historical-dashboard";
          $clearHsitoricalBtn.textContent = "Clear";
          $historicalRateSection.appendChild($clearHsitoricalBtn);
        })
        .catch((err) => {
          if (err.status === 404) {
            $historicalRateSection.innerHTML = `
            <p>Error ${err.status}: Not Found - The values may not exist or may not be available.</p><br><p>Some requested information regarding historical rates may not be
            available.</p><br><p>For more information about this,
            <a href="https://www.xe.com/es/currencytables/" target="_blank">go here.</a></p>`;
            const $clearHsitoricalBtn = d.createElement("button");
            $clearHsitoricalBtn.id = "clear-historical-dashboard";
            $clearHsitoricalBtn.textContent = "Clear";
            $historicalRateSection.appendChild($clearHsitoricalBtn);
          } else {
            $historicalRateSection.innerHTML = `<h3>Error ${err.status}: Oops! Something went wrong </h3>`;
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

      let $from = target.fromB.value,
        $to = target.toB.value,
        $day = target.dayB.value,
        $month = target.monthB.value,
        $year = target.yearB.value;
      fetch(
        `https://api.frankfurter.app/${$year}-${$month}-${$day}?from=${$from}&to=${$to}`
      )
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((currencies) => {
          $historicalBetweenSection.innerHTML = null;
          let rate = currencies.rates[$to],
            $div = d.createElement("div"),
            $divsContent = `<p>${$day}-${$month}-${$year}: 1 ${$from} was equal to ${rate} ${$to}</p>`;
          $div.insertAdjacentHTML("afterbegin", $divsContent);
          $historicalBetweenSection.appendChild($div);
          const $clearHsitoricalBetweenBtn = d.createElement("button");
          $clearHsitoricalBetweenBtn.id = "clear-historical-between-dashboard";
          $clearHsitoricalBetweenBtn.textContent = "Clear";
          $historicalBetweenSection.appendChild($clearHsitoricalBetweenBtn);
        })
        .catch((err) => {
          if (err.status === 404) {
            $historicalBetweenSection.innerHTML = `
            <p>Error ${err.status}: Not Found - The values may not exist or may not be available.</p>
            <br><p>Some requested information regarding historical rates may not be
            available.</p><br>
            <p>For more information about this,
            <a href="https://www.xe.com/es/currencytables/" target="_blank">go here.</a></p>`;
            const $clearHsitoricalBetweenBtn = d.createElement("button");
            $clearHsitoricalBetweenBtn.id =
              "clear-historical-between-dashboard";
            $clearHsitoricalBetweenBtn.textContent = "Clear";
            $historicalBetweenSection.appendChild($clearHsitoricalBetweenBtn);
          } else {
            $historicalBetweenSection.innerHTML = `<h3>Error ${err.status}: Oops! Something went wrong </h3>`;
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
    if (target.matches("#invert-between-values")) {
      [$formBetween.fromB.value, $formBetween.toB.value] = [
        $formBetween.toB.value,
        $formBetween.fromB.value,
      ];
    }
    if (target.matches("#clear-historical-dashboard")) {
      $historicalRateSection.innerHTML = null;
    }
    if (target.matches("#clear-historical-between-dashboard")) {
      $historicalBetweenSection.innerHTML = null;
    }
    if (target.matches("#clear-historical-input")) {
      historicalInputs.forEach((input) => (input.value = ""));
      d.getElementById("from-historical").value = "";
    }
    if (target.matches("#clear-historical-between-input")) {
      historicalBetweenInputs.forEach((input) => (input.value = ""));
      // d.getElementById("from-historical").value = "";
      d.getElementById("from-historical-B").value = "";
      d.getElementById("to-historical-B").value = "";
    }
  });
};
