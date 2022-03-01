import { d, w } from "./elements.js";
import { clickingCurrencies } from "./get-currencies.js";
import { clickingLatest } from "./latest.js";
import { clickingHistorical } from "./historical.js";
import { clickingOnInfo } from "./info.js";

d.addEventListener("DOMContentLoaded", (e) => {
  clickingCurrencies();
  clickingLatest();
  clickingHistorical();
  clickingOnInfo();
});
