// src/validator.js

export function validateInputs({ quantityRaw, postcodeRaw, countryRaw }) {
  // Quantity: required, integer, >= 0
  const quantity = Number(quantityRaw);

  if (quantityRaw === "" || Number.isNaN(quantity)) {
    return { ok: false, error: "Please enter a valid quantity." };
  }
  if (!Number.isFinite(quantity)) {
    return { ok: false, error: "Quantity must be a finite number." };
  }
  if (!Number.isInteger(quantity)) {
    return { ok: false, error: "Quantity must be a whole number." };
  }
  if (quantity < 0) {
    return { ok: false, error: "Quantity cannot be negative." };
  }

  // Country: required selection
  const country = String(countryRaw ?? "").trim();
  if (!country) {
    return { ok: false, error: "Please select a country." };
  }

  // Postcode: required + country-specific format validation
  const postcode = String(postcodeRaw ?? "").trim();
  if (!postcode) {
    return { ok: false, error: "Please enter a postcode." };
  }

  // Basic format checks (not delivery-area checks)
  const caPostal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/; // e.g., M5V 3L9
  const usZip = /^\d{5}(-\d{4})?$/; // e.g., 90210 or 90210-1234

  if (country === "CA" && !caPostal.test(postcode)) {
    return { ok: false, error: "Please enter a valid Canadian postal code (e.g., M5V 3L9)." };
  }

  if (country === "US" && !usZip.test(postcode)) {
    return { ok: false, error: "Please enter a valid US ZIP code (e.g., 90210 or 90210-1234)." };
  }

  return {
    ok: true,
    data: {
      quantity,
      postcode,
      country,
    },
  };
}
