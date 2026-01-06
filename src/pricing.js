// src/pricing.js

/**
 * Tiered pricing based on quantity.
 * Mirrors the earlier logic example:
 *  - < 10  => 9.99
 *  - < 20  => 19.99
 *  - < 30  => 29.99
 *  - >= 30 => not supported in this simple demo (explicit error)
 */
export function getSubtotal(quantity) {
  if (quantity < 10) return 9.99;
  if (quantity < 20) return 19.99;
  if (quantity < 30) return 29.99;

  // In the Paperform example, this would return null/blank.
  // Here we make it explicit so the UI can show a clear message.
  throw new Error("Quantity of 30+ is not supported by this pricing tier.");
}

/**
 * Applies tax conditionally.
 * For demo purposes:
 *  - US => 5% tax
 *  - other => no tax
 */
export function getTotal(subtotal, country) {
  const isTaxable = country === "US";
  const total = isTaxable ? subtotal * 1.05 : subtotal;

  // Keep rounding consistent for display
  return roundMoney(total);
}

/**
 * Round to 2 decimal places for currency output.
 */
function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
