-- Spring Boot SQL Init schema (H2 compatible PostgreSQL mode)

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    state VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    hsn_code VARCHAR(20),
    sac_code VARCHAR(20),
    requires_state BOOLEAN DEFAULT FALSE,
    icon_name VARCHAR(50) DEFAULT 'ShoppingBag',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tax_sources (
    id UUID PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    url VARCHAR(500) NOT NULL,
    reference_number VARCHAR(100),
    retrieved_at DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tax_rules (
    id UUID PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL REFERENCES categories(id),
    hsn_code VARCHAR(20),
    sac_code VARCHAR(20),
    tax_type VARCHAR(50) NOT NULL,
    rate NUMERIC(7, 4) NOT NULL,
    state VARCHAR(50),
    calculation_method VARCHAR(50) NOT NULL,
    min_amount NUMERIC(12, 2) DEFAULT 0.00,
    max_amount NUMERIC(12, 2),
    effective_from DATE NOT NULL,
    effective_to DATE,
    source_id UUID NOT NULL REFERENCES tax_sources(id),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tax_rule_components (
    id UUID PRIMARY KEY,
    tax_rule_id UUID NOT NULL REFERENCES tax_rules(id) ON DELETE CASCADE,
    component_name VARCHAR(50) NOT NULL,
    rate_type VARCHAR(20) NOT NULL,
    rate_value NUMERIC(10, 4) NOT NULL,
    display_order INT DEFAULT 1
);

CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY,
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

CREATE TABLE IF NOT EXISTS tax_calculations (
    id UUID PRIMARY KEY,
    expense_id UUID NOT NULL REFERENCES expenses(id) ON DELETE CASCADE,
    tax_rule_id UUID NOT NULL REFERENCES tax_rules(id),
    tax_type VARCHAR(50) NOT NULL,
    effective_rate NUMERIC(7, 4) NOT NULL,
    tax_amount NUMERIC(12, 2) NOT NULL,
    calculation_method VARCHAR(50) NOT NULL,
    breakdown_json CLOB NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ESTIMATED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_tax_summary (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    summary_date DATE NOT NULL,
    total_spending NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    estimated_tax NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    expense_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_user_date UNIQUE (user_id, summary_date)
);
