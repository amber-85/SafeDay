-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- USERS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    phone_number TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,

    -- ROLE 
    role VARCHAR(20) NOT NULL CHECK (role IN ('elder', 'contact')),

    -- CHECK-IN STATE
    last_check_in TIMESTAMP,

    -- ✅ REMINDER FLAGS
    reminder1_sent BOOLEAN DEFAULT FALSE,
    reminder2_sent BOOLEAN DEFAULT FALSE,
    alert_sent BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- USER RELATIONSHIPS
-- =========================
CREATE TABLE IF NOT EXISTS user_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    elder_id UUID REFERENCES users(id) ON DELETE CASCADE,
    contact_id UUID REFERENCES users(id) ON DELETE CASCADE,

    relationship TEXT,

    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(elder_id, contact_id)
);

-- =========================
-- CHECK-INS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS check_ins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    check_in_time TIMESTAMP DEFAULT NOW(),

    method VARCHAR(20) DEFAULT 'button'
);

-- =========================
-- NOTIFICATIONS TABLE
-- =========================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- ✅ TYPE OF NOTIFICATION
    type VARCHAR(20) CHECK (type IN ('reminder1', 'reminder2', 'alert')),

    message TEXT NOT NULL,

    -- ✅ READ STATE
    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW()
);