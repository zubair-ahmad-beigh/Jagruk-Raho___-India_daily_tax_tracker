-- ==========================================
-- 🇮🇳 Jagruk Raho — Database Schema DDL
-- ==========================================

-- Clean up existing tables (for development reset)
DROP TABLE IF EXISTS daily_tax_summary CASCADE;
DROP TABLE IF EXISTS tax_calculations CASCADE;
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS tax_rule_components CASCADE;
DROP TABLE IF EXISTS tax_rules CASCADE;
DROP TABLE IF EXISTS tax_sources CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    state VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories Table
CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY, -- e.g., 'mobile_phone', 'petrol', 'restaurant'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    hsn_code VARCHAR(20),
    sac_code VARCHAR(20),
    requires_state BOOLEAN DEFAULT FALSE,
    icon_name VARCHAR(50) DEFAULT 'ShoppingBag',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tax Sources Table (Official Government References)
CREATE TABLE tax_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    url VARCHAR(500) NOT NULL,
    reference_number VARCHAR(100),
    retrieved_at DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tax Rules Table (Versioned Tax System)
CREATE TABLE tax_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id VARCHAR(50) NOT NULL REFERENCES categories(id),
    hsn_code VARCHAR(20),
    sac_code VARCHAR(20),
    tax_type VARCHAR(50) NOT NULL, -- 'GST', 'EXCISE_VAT', 'CUSTOMS'
    rate NUMERIC(7, 4) NOT NULL, -- e.g. 18.0000 for 18%
    state VARCHAR(50), -- NULL for central taxes, 'Karnataka' for state specific
    calculation_method VARCHAR(50) NOT NULL, -- 'TAX_INCLUSIVE', 'TIERED_AMOUNT', 'MULTI_COMPONENT'
    min_amount NUMERIC(12, 2) DEFAULT 0.00,
    max_amount NUMERIC(12, 2),
    effective_from DATE NOT NULL,
    effective_to DATE, -- NULL means active indefinitely
    source_id UUID NOT NULL REFERENCES tax_sources(id),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tax Rule Components Table (For split CGST/SGST or Excise + VAT)
CREATE TABLE tax_rule_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tax_rule_id UUID NOT NULL REFERENCES tax_rules(id) ON DELETE CASCADE,
    component_name VARCHAR(50) NOT NULL, -- 'CGST', 'SGST', 'CENTRAL_EXCISE', 'STATE_VAT'
    rate_type VARCHAR(20) NOT NULL, -- 'PERCENTAGE', 'FLAT_PER_UNIT'
    rate_value NUMERIC(10, 4) NOT NULL,
    display_order INT DEFAULT 1
);

-- 6. Expenses Table
CREATE TABLE expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    category_id VARCHAR(50) NOT NULL REFERENCES categories(id),
    description VARCHAR(255) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    quantity NUMERIC(10, 2) DEFAULT 1.00,
    unit VARCHAR(20) DEFAULT 'unit',
    expense_date DATE NOT NULL,
    state VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Tax Calculations Table (Audit & Result log)
CREATE TABLE tax_calculations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_id UUID NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
    tax_rule_id UUID NOT NULL REFERENCES tax_rules(id),
    tax_type VARCHAR(50) NOT NULL,
    effective_rate NUMERIC(7, 4) NOT NULL,
    tax_amount NUMERIC(12, 2) NOT NULL,
    calculation_method VARCHAR(50) NOT NULL,
    breakdown_json JSONB NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ESTIMATED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Daily Tax Summary Table (Fast Aggregation)
CREATE TABLE daily_tax_summary (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    summary_date DATE NOT NULL,
    total_spending NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    estimated_tax NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    expense_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_user_date UNIQUE (user_id, summary_date)
);

-- Performance Indexes
CREATE INDEX idx_tax_rules_lookup ON tax_rules(category_id, state, effective_from, effective_to) WHERE active = true;
CREATE INDEX idx_expenses_user_date ON expenses(user_id, expense_date);
CREATE INDEX idx_daily_summary_user_date ON daily_tax_summary(user_id, summary_date);
