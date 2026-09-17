# 🇮🇳 Jagruk Raho — Har Kharch Ka Tax Jaano

> **Jagruk Raho** is an Indian consumer tax-awareness application that helps users understand the **estimated indirect tax included in their everyday spending**.

---

## 🌟 Key Features

- 📱 **Consumer Tax Awareness:** Instant visibility into estimated indirect taxes (GST, Central Excise, State VAT) hidden in everyday purchases.
- 🤖 **Gemini AI Natural Language Entry:** Enter expenses naturally in Hindi, English, or Hinglish (*"Bhai 50000 ka Samsung mobile phone liya Karnataka me"*). Gemini parses parameters; the backend tax engine calculates verified rates.
- 📜 **Official Government Sources:** Every rule links directly to authoritative CBIC GST Notifications or PPAC petroleum bulletins.
- 🗺️ **State-Aware Taxation:** Fuel taxation automatically accounts for State VAT variations (Karnataka, Maharashtra, Delhi, etc.).
- 📊 **Explainable Tax Math:** Step-by-step breakdown explaining why your tax is ₹X ($Amount \times Rate / (100 + Rate)$).
- 🎨 **Modern Fintech Aesthetics:** Premium UI/UX built with Next.js 14, Tailwind CSS, Lucide Icons, and Framer Motion micro-interactions.

---

## 🏗️ Monorepo Architecture

```text
jagruk-raho/
├── backend/            # Spring Boot 3 + Java 17 REST API & Tax Engine
├── frontend/           # Next.js 14 App Router + TypeScript + Tailwind CSS
├── database/           # PostgreSQL Schema DDL & Seed scripts with official tax rules
├── docker/             # Docker Compose orchestration
└── docs/               # Technical documentation (ARCHITECTURE.md, TAX_METHODOLOGY.md)
```

---

## 🚀 Quick Start (Local Development)

### 1. Backend Setup (Spring Boot)
```bash
cd backend
mvn spring-boot:run
```
Backend runs on `http://localhost:8080`. (Includes embedded H2 database pre-seeded with official CBIC tax rules).

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`.

### 3. Docker Compose Setup (PostgreSQL + Backend + Frontend)
```bash
docker-compose up --build
```

---

## ⚖️ Legal Disclaimer

*Jagruk Raho is an independent informational tax-awareness application. It is **NOT** an official Government of India application, an official tax portal, or an income tax filing platform. Calculations represent estimated indirect taxes included in retail consumer purchases.*
