// src/app.js
import { validateInputs } from "./validator.js";
import { normalizePostcode } from "./utils.js";
import { isDeliveryAllowed } from "./delivery.js";
import { getSubtotal, getTotal } from "./pricing.js";

const form = document.querySelector("#calcForm");
const outputEl = document.querySelector("#output");

function printResult(obj) {
  outputEl.textContent = JSON.stringify(obj, null, 2);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const quantityRaw = document.querySelector("#quantity").value;
  const postcodeRaw = document.querySelector("#postcode").value;
  const countryRaw = document.querySelector("#country").value;

  // 1) Validate inputs (basic sanity checks)
  const validation = validateInputs({
    quantityRaw,
    postcodeRaw,
    countryRaw,
  });

  if (!validation.ok) {
    printResult({
      ok: false,
      error: validation.error,
    });
    return;
  }

  const quantity = validation.data.quantity;
  const country = validation.data.country;
  const postcode = normalizePostcode(validation.data.postcode);

  // 2) Delivery check (postcode prefix whitelist)
  const deliveryAllowed = isDeliveryAllowed(postcode);

  if (!deliveryAllowed) {
    printResult({
      ok: false,
      error: "Sorry — this postcode is outside our delivery area.",
      details: { postcode },
    });
    return;
  }

  // 3) Pricing + tax
  const subtotal = getSubtotal(quantity);
  const total = getTotal(subtotal, country);

  // 4) Output
  printResult({
    ok: true,
    inputs: { quantity, postcode, country },
    pricing: { subtotal, total },
    notes: country === "US" ? "5% tax applied (US)" : "No tax applied",
  });
});
