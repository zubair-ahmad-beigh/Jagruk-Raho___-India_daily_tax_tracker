-- Classpath seed_data.sql

MERGE INTO users (id, name, email, state, city) KEY(id)
VALUES ('3fa85f64-5717-4562-b3fc-2c963f66afa6', 'Demo User', 'demo@jagrukraho.in', 'Karnataka', 'Bengaluru');

MERGE INTO categories (id, name, description, hsn_code, sac_code, requires_state, icon_name, active) KEY(id) VALUES
('mobile_phone', 'Mobile Phone & Accessories', 'Smartphones, feature phones, and mobile devices', '8517', NULL, false, 'Smartphone', true),
('laptop', 'Laptops & Computers', 'Laptops, desktop computers, and computer peripherals', '8471', NULL, false, 'Laptop', true),
('electronics', 'Televisions & Electronics', 'Televisions, home audio, and consumer electronic appliances', '8528', NULL, false, 'Tv', true),
('clothing', 'Clothing & Apparel', 'Shirts, trousers, ethnic wear, and garments', '6104', NULL, false, 'Shirt', true),
('restaurant', 'Restaurant & Dining', 'Meals at standalone restaurants, cafes, and food outlets', NULL, '9963', false, 'Utensils', true),
('grocery', 'Grocery & Staples', 'Pre-packaged food grains, pulses, and kitchen staples', '1001', NULL, false, 'ShoppingBag', true),
('packaged_food', 'Packaged Food & Snacks', 'Biscuits, namkeen, chocolates, and processed food', '1905', NULL, false, 'Cookie', true),
('petrol', 'Petrol (Motor Spirit)', 'Fuel for petrol vehicles', NULL, NULL, true, 'Fuel', true),
('diesel', 'Diesel (HSD)', 'Fuel for diesel vehicles', NULL, NULL, true, 'Truck', true),
('cng', 'CNG Fuel', 'Compressed Natural Gas for vehicles', NULL, NULL, true, 'Zap', true),
('lpg', 'Domestic LPG Cylinder', 'Domestic cooking gas cylinders', '2711', NULL, false, 'Flame', true),
('online_subscription', 'Online & Software Subscriptions', 'Streaming services, cloud storage, and SaaS software', NULL, '998439', false, 'Globe', true),
('hotel', 'Hotel Accommodation', 'Hotel room stays and lodging services', NULL, '996311', false, 'Hotel', true),
('cab_service', 'Cab & Ride Hailing', 'App-based taxi services (Uber, Ola, etc.)', NULL, '9964', false, 'Car', true);

MERGE INTO tax_sources (id, name, url, reference_number, retrieved_at, notes) KEY(id) VALUES
('10000000-0000-0000-0000-000000000001', 'CBIC Notification No. 03/2020-Central Tax (Rate)', 'https://cbic-gst.gov.in/pdf/central-tax-rate/notfn-03-2020-cgst-rate.pdf', 'CBIC-190354/145/2020-TO(TRU-II)', '2026-01-15', 'GST rate on mobile phones fixed at 18% effective 1 April 2020.'),
('10000000-0000-0000-0000-000000000002', 'CBIC Rate Schedule for Goods (Chapter 84 & 85)', 'https://cbic-gst.gov.in/gst-goods-service-rates.html', 'CBIC-GOODS-2017', '2026-01-15', '18% GST for computers, laptops, and consumer electronics.'),
('10000000-0000-0000-0000-000000000003', 'CBIC Notification No. 14/2021-Central Tax (Rate)', 'https://cbic-gst.gov.in/pdf/central-tax-rate/notfn-14-2021-cgst-rate.pdf', 'CBIC-190354/220/2021', '2026-01-15', '5% GST for apparel <= ₹1,000 per piece; 12% for apparel > ₹1,000.'),
('10000000-0000-0000-0000-000000000004', 'CBIC Notification No. 46/2017-Central Tax (Rate)', 'https://cbic-gst.gov.in/pdf/central-tax-rate/notfn-46-2017-cgst-rate.pdf', 'CBIC-354/173/2017-TRU', '2026-01-15', '5% GST without ITC for standalone non-hotel restaurants.'),
('10000000-0000-0000-0000-000000000005', 'CBIC Notification No. 06/2022-Central Tax (Rate)', 'https://cbic-gst.gov.in/pdf/central-tax-rate/notfn-06-2022-cgst-rate.pdf', 'CBIC-190354/84/2022-TRU', '2026-01-15', '5% GST on pre-packaged and labelled food grains and staples.'),
('10000000-0000-0000-0000-000000000006', 'PPAC & Karnataka Commercial Tax Department Bulletin', 'https://www.ppac.gov.in/content/212_1_TaxStructure.aspx', 'PPAC-KA-2026-01', '2026-01-15', 'Central Excise duty ₹19.90/L + Karnataka Sales Tax/VAT ~25.92% on Petrol.'),
('10000000-0000-0000-0000-000000000007', 'PPAC & Maharashtra Commercial Tax Department Bulletin', 'https://www.ppac.gov.in/content/212_1_TaxStructure.aspx', 'PPAC-MH-2026-01', '2026-01-15', 'Central Excise duty ₹19.90/L + Maharashtra Sales Tax/VAT ~25% + cess on Petrol.'),
('10000000-0000-0000-0000-000000000008', 'PPAC & Delhi VAT Department Bulletin', 'https://dvatt.gov.in', 'DVAT-MS-2026', '2026-01-15', 'Central Excise duty ₹19.90/L + Delhi VAT 19.40% on Petrol.'),
('10000000-0000-0000-0000-000000000009', 'CBIC Notification No. 11/2017-Central Tax (Rate)', 'https://cbic-gst.gov.in/pdf/central-tax-rate/notfn-11-2017-cgst-rate.pdf', 'CBIC-354/119/2017-TRU', '2026-01-15', '18% GST for Online Information Database Access and Retrieval (OIDAR) services.');

MERGE INTO tax_rules (id, category_id, hsn_code, sac_code, tax_type, rate, state, calculation_method, min_amount, max_amount, effective_from, effective_to, source_id, active) KEY(id) VALUES
('20000000-0000-0000-0000-000000000001', 'mobile_phone', '8517', NULL, 'GST', 18.0000, NULL, 'TAX_INCLUSIVE', 0.00, NULL, '2020-04-01', NULL, '10000000-0000-0000-0000-000000000001', true),
('20000000-0000-0000-0000-000000000002', 'laptop', '8471', NULL, 'GST', 18.0000, NULL, 'TAX_INCLUSIVE', 0.00, NULL, '2017-07-01', NULL, '10000000-0000-0000-0000-000000000002', true),
('20000000-0000-0000-0000-000000000003', 'electronics', '8528', NULL, 'GST', 18.0000, NULL, 'TAX_INCLUSIVE', 0.00, NULL, '2018-07-27', NULL, '10000000-0000-0000-0000-000000000002', true),
('20000000-0000-0000-0000-000000000004', 'clothing', '6104', NULL, 'GST', 5.0000, NULL, 'TIERED_AMOUNT', 0.00, 1000.00, '2022-01-01', NULL, '10000000-0000-0000-0000-000000000003', true),
('20000000-0000-0000-0000-000000000005', 'clothing', '6104', NULL, 'GST', 12.0000, NULL, 'TIERED_AMOUNT', 1000.01, NULL, '2022-01-01', NULL, '10000000-0000-0000-0000-000000000003', true),
('20000000-0000-0000-0000-000000000006', 'restaurant', NULL, '9963', 'GST', 5.0000, NULL, 'TAX_INCLUSIVE', 0.00, NULL, '2017-11-15', NULL, '10000000-0000-0000-0000-000000000004', true),
('20000000-0000-0000-0000-000000000007', 'grocery', '1001', NULL, 'GST', 5.0000, NULL, 'TAX_INCLUSIVE', 0.00, NULL, '2022-07-18', NULL, '10000000-0000-0000-0000-000000000005', true),
('20000000-0000-0000-0000-000000000008', 'packaged_food', '1905', NULL, 'GST', 12.0000, NULL, 'TAX_INCLUSIVE', 0.00, NULL, '2017-07-01', NULL, '10000000-0000-0000-0000-000000000002', true),
('20000000-0000-0000-0000-000000000009', 'petrol', NULL, NULL, 'EXCISE_VAT', 41.5000, 'Karnataka', 'MULTI_COMPONENT', 0.00, NULL, '2024-06-15', NULL, '10000000-0000-0000-0000-000000000006', true),
('20000000-0000-0000-0000-000000000010', 'petrol', NULL, NULL, 'EXCISE_VAT', 43.0000, 'Maharashtra', 'MULTI_COMPONENT', 0.00, NULL, '2024-07-01', NULL, '10000000-0000-0000-0000-000000000007', true),
('20000000-0000-0000-0000-000000000011', 'petrol', NULL, NULL, 'EXCISE_VAT', 40.0000, NULL, 'MULTI_COMPONENT', 0.00, NULL, '2024-01-01', NULL, '10000000-0000-0000-0000-000000000008', true),
('20000000-0000-0000-0000-000000000012', 'diesel', NULL, NULL, 'EXCISE_VAT', 30.0000, NULL, 'MULTI_COMPONENT', 0.00, NULL, '2024-01-01', NULL, '10000000-0000-0000-0000-000000000008', true),
('20000000-0000-0000-0000-000000000013', 'lpg', '2711', NULL, 'GST', 5.0000, NULL, 'TAX_INCLUSIVE', 0.00, NULL, '2017-07-01', NULL, '10000000-0000-0000-0000-000000000002', true),
('20000000-0000-0000-0000-000000000014', 'online_subscription', NULL, '998439', 'GST', 18.0000, NULL, 'TAX_INCLUSIVE', 0.00, NULL, '2017-07-01', NULL, '10000000-0000-0000-0000-000000000009', true),
('20000000-0000-0000-0000-000000000015', 'cab_service', NULL, '9964', 'GST', 5.0000, NULL, 'TAX_INCLUSIVE', 0.00, NULL, '2022-01-01', NULL, '10000000-0000-0000-0000-000000000004', true);

MERGE INTO tax_rule_components (id, tax_rule_id, component_name, rate_type, rate_value, display_order) KEY(id) VALUES
('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'CGST', 'PERCENTAGE', 9.0000, 1),
('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'SGST', 'PERCENTAGE', 9.0000, 2),
('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'CGST', 'PERCENTAGE', 9.0000, 1),
('30000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000002', 'SGST', 'PERCENTAGE', 9.0000, 2),
('30000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000003', 'CGST', 'PERCENTAGE', 9.0000, 1),
('30000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000003', 'SGST', 'PERCENTAGE', 9.0000, 2),
('30000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000004', 'CGST', 'PERCENTAGE', 2.5000, 1),
('30000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000004', 'SGST', 'PERCENTAGE', 2.5000, 2),
('30000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000005', 'CGST', 'PERCENTAGE', 6.0000, 1),
('30000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000005', 'SGST', 'PERCENTAGE', 6.0000, 2),
('30000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000006', 'CGST', 'PERCENTAGE', 2.5000, 1),
('30000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000006', 'SGST', 'PERCENTAGE', 2.5000, 2),
('30000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000007', 'CGST', 'PERCENTAGE', 2.5000, 1),
('30000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000007', 'SGST', 'PERCENTAGE', 2.5000, 2),
('30000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000009', 'CENTRAL_EXCISE', 'FLAT_PER_UNIT', 19.9000, 1),
('30000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000009', 'KARNATAKA_VAT', 'PERCENTAGE', 25.9200, 2),
('30000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000010', 'CENTRAL_EXCISE', 'FLAT_PER_UNIT', 19.9000, 1),
('30000000-0000-0000-0000-000000000018', '20000000-0000-0000-0000-000000000010', 'MAHARASHTRA_VAT', 'PERCENTAGE', 25.0000, 2),
('30000000-0000-0000-0000-000000000019', '20000000-0000-0000-0000-000000000011', 'CENTRAL_EXCISE', 'FLAT_PER_UNIT', 19.9000, 1),
('30000000-0000-0000-0000-000000000020', '20000000-0000-0000-0000-000000000011', 'STATE_VAT', 'PERCENTAGE', 20.0000, 2);
