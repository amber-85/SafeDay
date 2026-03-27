CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- user table

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name Text,
    last_check_in TIMESTAMP,
    reminder1_sent BOOLEAN DEFAULT FALSE,
    reminder2_sent BOOLEAN DEFAULT FALSE,
    alert_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- emergency contacts
CREATE TABLE IF NOT EXISTS emergency_contacts(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone_number TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    relationship TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- check-ins

CREATE TABLE IF NOT EXISTS check_ins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    check_in_time TIMESTAMP DEFAULT NOW(),
    method VARCHAR(20) DEFAULT 'button'
);



