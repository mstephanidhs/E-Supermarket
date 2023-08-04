-- Get stores that are incluced in an offer
SELECT *
FROM store s
INNER JOIN offer o ON o.store = s.store_id;

-- Get just the names of the unique stores inserted in the db
SELECT DISTINCT store_name 
FROM store;

-- Fetch a specific store (need to know if it has any offers or not)
SELECT * 
FROM store s 
LEFT JOIN offer o ON s.store_id =  o.store 
WHERE s.store_name = ?;

--  Fetch stores that in their offers have products on the specific category that the user has chosen 
SELECT s.store_id, s.store_name, s.longitude, s.latitude 
FROM offer o
INNER JOIN product p ON p.product_id = o.product
INNER JOIN store s ON s.store_id = o.store
WHERE p.category = ?;

-- Get the offers that the specific user has submitted 
SELECT o.offer_id as id, p.product_name, o.price, s.store_name, o.date_offer 
FROM offer o
INNER JOIN product p ON o.product = p.product_id
INNER JOIN store s ON s.store_id = o.store
WHERE o.user_id = ?;