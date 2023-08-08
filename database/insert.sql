-- insert offers for testing
INSERT INTO offer (user_id, product, price, store) VALUES
(1, 1, 3, 1),
(1, 2, 4, 2),
(1, 4, 2, 3);

INSERT INTO offer(user_id, product, price, store, date_offer) VALUES
(1, 1, 7, 15, "2023-08-07 16:00:58"),
(1, 1, 5, 5, "2023-08-07 14:00:58"),
(1, 1, 10, 10, "2023-08-01 14:00:58");

--  insert reactions to the above offers
INSERT INTO reaction(user_id, offer_id, is_like) VALUES 
(1, 2, 0),
(1, 1, 1),
(1, 3, 0);



