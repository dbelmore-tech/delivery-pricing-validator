# Delivery Pricing & Eligibility Validator

This is a small JavaScript project that demonstrates logic-driven validation, conditional workflows, and edge-case handling — the same types of problems commonly encountered in SaaS form builders and customer support scenarios.

The goal of the project is to take a few simple inputs (quantity, postcode, country) and determine:
- whether delivery is allowed,
- what pricing tier applies,
- whether tax should be added,
- and what message or total should be returned to the user.

The focus is on clear, readable logic and predictable outcomes rather than UI complexity.

---

## What the Project Does

Given user input, the application:
1. Validates the input values (e.g. no negative quantities).
2. Normalizes user input (trimming whitespace, uppercasing postcodes).
3. Checks whether the postcode is within a defined delivery area.
4. Applies tiered pricing based on quantity.
5. Applies tax conditionally based on country.
6. Returns either a calculated total or a clear explanatory message.

This mirrors common real-world use cases such as delivery forms, pricing calculators, and conditional submission logic.

---

## Example Logic

- Quantity tiers:
  - Less than 10 → base price tier 1
  - 10–19 → base price tier 2
  - 20–29 → base price tier 3
  - Invalid or unsupported quantities return an error

- Delivery eligibility:
  - Postcodes are normalized and checked against an allowed prefix list
  - Out-of-area postcodes return a clear message instead of a price

- Tax:
  - Applied only when the country is set to a taxable value (e.g. "US")

---

## Project Structure

delivery-pricing-validator/
├─ README.md
├─ index.html
├─ src/
│  ├─ app.js
│  ├─ validator.js
│  ├─ pricing.js
│  ├─ delivery.js
│  └─ utils.js
├─ tests/
│  └─ test-cases.md

Each file has a single responsibility to keep the logic easy to follow and debug.

---

## Why This Project Exists

This project was built to:
- Practice JavaScript in a practical, real-world context
- Demonstrate structured problem solving and edge-case awareness
- Show how complex rules can be broken into simple, testable steps
- Reflect the kind of troubleshooting and reasoning used in SaaS customer support roles

---

## How to Run

1. Clone the repository.
2. Open index.html in a browser.
3. Enter values for quantity, postcode, and country.
4. Submit to see the calculated result or validation message.

No build tools or frameworks are required.

---

## Testing Approach

Instead of a formal test framework, the project includes a tests/test-cases.md file that documents:
- boundary values (e.g. 9, 10, 19, 20, 29, 30)
- invalid inputs (negative quantities, empty fields)
- delivery-area edge cases

This reflects a manual testing approach often used during troubleshooting and support validation.

---

## Notes

This project intentionally avoids frameworks and heavy UI work. The emphasis is on logic clarity, maintainability, and correctness — not presentation.
