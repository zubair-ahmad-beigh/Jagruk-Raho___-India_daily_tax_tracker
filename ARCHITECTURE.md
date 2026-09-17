# 🏛️ Jagruk Raho — Technical Architecture

## Core Architectural Principle

> **Gemini understands what the user bought.**  
> **Official government sources define the tax rules.**  
> **PostgreSQL stores the verified rules.**  
> **Spring Boot calculates the tax.**  
> **Next.js explains the result beautifully to the user.**

---

## System Flow Diagram

```text
User Text Input ("Samsung mobile 50000 ka")
                  │
                  ▼
         [ Gemini AI Service ] ──> Extracts { product, categoryId, amount, state }
                  │
                  ▼
      [ Spring Boot Controller ]
                  │
                  ▼
         [ TaxRuleResolver ] ──> Queries PostgreSQL for active versioned rule
                  │
                  ▼
         [ TaxCalculator ] ──> Executes BigDecimal math (Tax-Inclusive / Fuel Multi-Component)
                  │
                  ▼
        [ Next.js Frontend ] ──> Visualizes Explainability Card & Government Source Link
```

---

## Key Backend Components

1. `TaxRuleResolver`: Selects active tax rules matching `categoryId`, `expenseDate`, and `state`. Fallback to central default if state rule not defined.
2. `TaxInclusiveCalculator`: Standard tax-inclusive GST formula: $T = A \times \frac{R}{100 + R}$.
3. `MultiComponentCalculator`: Dual fuel taxation: Specific Central Excise Duty ($\text{Litres} \times ₹19.90$) + Ad-valorem State VAT ($A \times \frac{\text{VAT}}{100 + \text{VAT}}$).
4. `TaxMathUtil`: Enforces `BigDecimal` with scale-2 rounding and `RoundingMode.HALF_UP`.

---

## Security Boundaries

- **Gemini API Key:** Stored strictly inside backend environment variables (`GEMINI_API_KEY`). Never exposed to browser or client bundle.
- **Data Validation:** Bean Validation on incoming REST payloads (`@Positive`, `@NotNull`).
- **SQL Injection Prevention:** Parameterized Spring Data JPA queries.
