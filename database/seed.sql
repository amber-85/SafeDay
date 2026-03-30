-- =========================
-- Enable pgcrypto for UUID & password hashing
-- =========================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =========================
-- USERS TABLE SEED
-- =========================
INSERT INTO users (phone_number, password_hash, name, last_check_in)
VALUES
-- Elders
('+46700000001', crypt('test123', gen_salt('bf')), 'Alice', NOW() - INTERVAL '1 day'),
('+46700000002', crypt('test456', gen_salt('bf')), 'Bob', NOW() - INTERVAL '2 hours'),
('+46700000003', crypt('test789', gen_salt('bf')), 'Charlie', NULL),

-- Contacts
('+46711111111', crypt('test000', gen_salt('bf')), 'Anna', NULL),
('+46722222222', crypt('test111', gen_salt('bf')), 'Ben', NULL),
('+46733333333', crypt('test222', gen_salt('bf')), 'Clara', NULL)
ON CONFLICT (phone_number) DO NOTHING;

-- =========================
-- USER CONTACTS TABLE SEED
-- =========================
-- Alice → Anna (Daughter), Ben (Son)
INSERT INTO user_contacts (elder_id, contact_id, relationship)
SELECT u1.id, u2.id, 'Daughter'
FROM users u1, users u2
WHERE u1.name='Alice' AND u2.name='Anna'
ON CONFLICT DO NOTHING;

INSERT INTO user_contacts (elder_id, contact_id, relationship)
SELECT u1.id, u2.id, 'Son'
FROM users u1, users u2
WHERE u1.name='Alice' AND u2.name='Ben'
ON CONFLICT DO NOTHING;

-- Bob → Ben (Nephew)
INSERT INTO user_contacts (elder_id, contact_id, relationship)
SELECT u1.id, u2.id, 'Nephew'
FROM users u1, users u2
WHERE u1.name='Bob' AND u2.name='Ben'
ON CONFLICT DO NOTHING;

-- Charlie → Clara (Neighbor)
INSERT INTO user_contacts (elder_id, contact_id, relationship)
SELECT u1.id, u2.id, 'Neighbor'
FROM users u1, users u2
WHERE u1.name='Charlie' AND u2.name='Clara'
ON CONFLICT DO NOTHING;

-- =========================
-- CHECK-INS TABLE SEED
-- =========================
INSERT INTO check_ins (user_id, check_in_time, method)
SELECT id, NOW() - INTERVAL '1 day', 'button'
FROM users WHERE name='Alice';

INSERT INTO check_ins (user_id, check_in_time, method)
SELECT id, NOW() - INTERVAL '2 hours', 'button'
FROM users WHERE name='Bob';