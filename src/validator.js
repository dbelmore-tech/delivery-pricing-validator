// src/validator.js

/**
 * Validates and parses raw inputs from the UI.
 * Returns a consistent shape so app.js can stay clean.
 */
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

  // Postcode: required, non-empty
  const postcode = String(postcodeRaw ?? "").trim();
  if (!postcode) {
    return { ok: false, error: "Please enter a postcode." };
  }

  // Country: required selection
  const country = String(countryRaw ?? "").trim();
  if (!country) {
    return { ok: false, error: "Please select a country." };
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
