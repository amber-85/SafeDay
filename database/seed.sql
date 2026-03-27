-- insert test users

INSERT INTO users(phone_number,password_hash, name,last_check_in)
VALUES
('+46700000001','test123', 'Alice', NOW() - INTERVAL '1 day'),
('+46700000002', 'test456','Bob', NOW() - INTERVAL '2 hours'),
('+46700000003', 'test789','Charlie', NULL)
ON CONFLICT (phone_number) DO NOTHING;

INSERT INTO emergency_contacts(user_id, phone_number,password_hash,name, relationship)
SELECT id,'+46711111111', 'test000', 'Anna', 'Daughter'
FROM users WHERE name='Alice';

INSERT INTO emergency_contacts (user_id, phone number, name, relationship)
SELECT id, '+46722222222', 'test111','Ben', 'Son'
FROM users WHERE name = 'Bob';

INSERT INTO emergency_contacts (user_id, phone number, name, relationship)
SELECT id, '+46733333333','test222', 'Clara', 'Neighbor'
FROM users WHERE name = 'Charlie';

-- insert check-ins
INSERT INTO check_ins (user_id, check_in_time, method)
SELECT id, NOW() - INTERVAL '1 day', 'button'
FROM users WHERE name = 'Alice';

INSERT INTO check_ins (user_id, check_in_time, method)
SELECT id, NOW() - INTERVAL '2 hours', 'button'
FROM users WHERE name = 'Bob';