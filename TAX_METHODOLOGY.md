# 🧮 Jagruk Raho — Tax Methodology

## 1. Tax-Inclusive Price Calculation Formula

Most retail consumer purchases in India include tax in the MRP (Maximum Retail Price).

For a total purchase amount $A$ and a verified tax rate $R\%$:

$$\text{Tax Included} = A \times \frac{R}{100 + R}$$

### Example (Mobile Phone):
- Purchase Amount: ₹50,000
- Applicable Rate: 18% GST (CBIC Notification 03/2020)
- Calculation: $50000 \times \frac{18}{118} = ₹7,627.12$
- Component Split: CGST (9%) = ₹3,813.56, SGST (9%) = ₹3,813.56

---

## 2. Petroleum Multi-Component Fuel Tax Formula

Petroleum products (Petrol & Diesel) are outside GST under Article 279A(5) of the Constitution of India and attract Central Excise Duty + State VAT.

- **Central Excise Duty:** Flat specific duty per Litre ($\approx ₹19.90 / L$ for Petrol).
- **State Sales Tax / VAT:** Ad-valorem percentage on base price + fixed state cess (varies by state, e.g. Karnataka ~25.92%, Maharashtra ~25%+₹5.12/L).

$$\text{Litres} = \frac{\text{Amount}}{\text{Average Price per Litre}}$$

$$\text{Central Excise} = \text{Litres} \times \text{Excise Rate}$$

$$\text{State VAT} = \text{Amount} \times \frac{\text{VAT}\%}{100 + \text{VAT}\%}$$

$$\text{Total Fuel Tax} = \text{Central Excise} + \text{State VAT}$$

---

## 3. Tiered Threshold Amount Formula (Clothing)

Under CBIC Notification No. 14/2021-Central Tax (Rate):
- Sale value $\le ₹1,000$ per piece $\rightarrow$ **5% GST**
- Sale value $> ₹1,000$ per piece $\rightarrow$ **12% GST**
