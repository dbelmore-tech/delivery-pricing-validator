// src/delivery.js
import { getPostcodePrefix } from "./utils.js";

/**
 * Update this list to match the delivery area.
 * These are examples (Toronto-style FSAs). Replace with your own.
 */
const ALLOWED_PREFIXES = ["M5V", "M5W", "L8P"];

export function isDeliveryAllowed(postcode) {
  const prefix = getPostcodePrefix(postcode, 3);
  return ALLOWED_PREFIXES.includes(prefix);
}

// Optional export for displaying/diagnostics later
export function getAllowedPrefixes() {
  return [...ALLOWED_PREFIXES];
}
