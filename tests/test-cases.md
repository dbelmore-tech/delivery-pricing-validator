# Test Cases — Delivery Pricing & Eligibility Validator

This document lists manual test cases used to validate pricing logic, delivery eligibility, and edge cases.

---

## Valid Delivery + Pricing

### Case 1: Lowest pricing tier
- Quantity: 1
- Postcode: M5V 3L9
- Country: CA
- Expected:
  - Delivery allowed
  - Subtotal: 9.99
  - Total: 9.99
  - No tax applied

### Case 2: Tier boundary (9 → 10)
- Quantity: 9
- Postcode: M5V 3L9
- Country: US
- Expected:
  - Subtotal: 9.99
  - Total: 10.49
  - 5% tax applied

### Case 3: Tier boundary (10 → 19)
- Quantity: 10
- Postcode: M5V 3L9
- Country: US
- Expected:
  - Subtotal: 19.99
  - Total: 20.99
  - 5% tax applied

### Case 4: Upper supported tier
- Quantity: 29
- Postcode: M5V 3L9
- Country: CA
- Expected:
  - Subtotal: 29.99
  - Total: 29.99
  - No tax applied

---

## Invalid Quantity Handling

### Case 5: Quantity >= 30
- Quantity: 30
- Postcode: M5V 3L9
- Country: CA
- Expected:
  - Error returned
  - Message indicates quantity is not supported

### Case 6: Negative quantity
- Quantity: -1
- Postcode: M5V 3L9
- Country: CA
- Expected:
  - Validation error
  - Quantity cannot be negative

---

## Delivery Area Validation

### Case 7: Out-of-area postcode
- Quantity: 5
- Postcode: Z9Z 9Z9
- Country: CA
- Expected:
  - Delivery rejected
  - Clear out-of-area message shown

### Case 8: Postcode normalization
- Quantity: 5
- Postcode: "  m5v   3l9 "
- Country: CA
- Expected:
  - Postcode normalized
  - Delivery allowed
  - Correct pricing applied

---

## Missing / Invalid Inputs

### Case 9: Empty postcode
- Quantity: 5
- Postcode: ""
- Country: CA
- Expected:
  - Validation error
  - Prompt to enter a postcode

### Case 10: Missing country
- Quantity: 5
- Postcode: M5V 3L9
- Country: ""
- Expected:
  - Validation error
  - Prompt to select a country
