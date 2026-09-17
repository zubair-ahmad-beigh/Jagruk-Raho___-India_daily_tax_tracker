package com.jagrukraho.api.tax;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class TaxMathUtil {

    private static final int CURRENCY_SCALE = 2;
    private static final int RATE_SCALE = 4;
    private static final RoundingMode ROUNDING_MODE = RoundingMode.HALF_UP;

    public static BigDecimal roundCurrency(BigDecimal amount) {
        if (amount == null) return BigDecimal.ZERO.setScale(CURRENCY_SCALE, ROUNDING_MODE);
        return amount.setScale(CURRENCY_SCALE, ROUNDING_MODE);
    }

    /**
     * Calculates tax included in a tax-inclusive total price:
     * Tax = Total * Rate / (100 + Rate)
     */
    public static BigDecimal calculateTaxInclusive(BigDecimal totalAmount, BigDecimal ratePercentage) {
        if (totalAmount == null || ratePercentage == null || totalAmount.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO.setScale(CURRENCY_SCALE, ROUNDING_MODE);
        }

        BigDecimal hundred = new BigDecimal("100.0000");
        BigDecimal divisor = hundred.add(ratePercentage);
        
        // Intermediate high precision (10 decimals) to avoid premature precision loss
        BigDecimal taxAmount = totalAmount.multiply(ratePercentage)
                .divide(divisor, 10, ROUNDING_MODE);

        return roundCurrency(taxAmount);
    }

    /**
     * Splits total GST tax into CGST (50%) and SGST (50%) components.
     */
    public static BigDecimal splitHalf(BigDecimal amount) {
        if (amount == null) return BigDecimal.ZERO.setScale(CURRENCY_SCALE, ROUNDING_MODE);
        return amount.divide(new BigDecimal("2"), CURRENCY_SCALE, ROUNDING_MODE);
    }
}
