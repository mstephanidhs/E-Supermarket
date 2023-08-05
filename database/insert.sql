-- insert offers for testing
INSERT INTO offer (user_id, product, price, store) VALUES
(1, 1, 3, 1),
(1, 2, 4, 2),
(1, 4, 2, 3);

--  insert reactions to the above offers
INSERT INTO reaction(user_id, offer_id, is_like) VALUES 
(1, 2, 0),
(1, 1, 1);

