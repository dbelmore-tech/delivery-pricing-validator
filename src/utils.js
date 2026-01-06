// src/utils.js

/**
 * Normalizes a postcode for consistent matching.
 * - trims
 * - uppercases
 * - collapses internal whitespace to a single space
 */
export function normalizePostcode(value) {
  return String(value ?? "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

/**
 * Returns the first N characters of a normalized postcode,
 * removing spaces first (useful for prefix matching).
 */
export function getPostcodePrefix(postcode, length = 3) {
  const compact = normalizePostcode(postcode).replace(/\s/g, "");
  return compact.slice(0, length);
}
