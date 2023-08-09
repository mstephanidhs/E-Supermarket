-- Get stores that are incluced in an offer
SELECT s.store_id, s.store_name, s.latitude, s.longitude
FROM store s
INNER JOIN offer o ON o.store = s.store_id;

-- Get just the names of the unique stores inserted in the db
SELECT DISTINCT store_name 
FROM store;

-- Fetch a specific store (need to know if it has any offers or not)
SELECT s.store_id, s.store_name, s.latitude, s.longitude, o.offer_id 
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

-- Offers of a specific store
SELECT count(CASE WHEN r.is_like = 1 THEN 1 END) OVER(PARTITION BY o.offer_id) AS likes, 
count(CASE WHEN r.is_like = 0 THEN 1 END) OVER(PARTITION BY o.offer_id) AS dislikes, 
p.product_name, o.price, o.date_offer, o.stock, s.store_name, s.store_id, o.offer_id
FROM store s 
INNER JOIN offer o ON s.store_id = o.store 
INNER JOIN product p ON o.product = p.product_id 
LEFT JOIN reaction  r ON r.offer_id = o.offer_id 
WHERE store_id = ?;

-- Get offer details by id (2 selects in order to get the user's score)
SELECT count(CASE WHEN r.is_like = 1 THEN 1 END) OVER(PARTITION BY o.offer_id) AS likes,
count(CASE WHEN r.is_like = 0 THEN 1 END) OVER(PARTITION BY o.offer_id) AS dislikes,
p.product_name, o.price, o.date_offer, o.stock, p.img, u.username  
FROM offer o
INNER JOIN product p ON o.product = p.product_id
INNER JOIN reaction r ON r.offer_id = o.offer_id
INNER JOIN user u ON o.user_id = u.user_id
WHERE o.offer_id = ?;

SELECT s.current_score 
FROM score s 
INNER JOIN user u ON u.user_id = s.user_id 
WHERE u.user_id = ?;

-- Add Offer (& calculation of the score)
-- the day before
SELECT price AS AveragePrice 
FROM productsinstore 
WHERE id = ? AND 
DATE(date_product) = DATE(NOW() - INTERVAL 1 DAY);

-- the week before
SELECT price AS AveragePrice 
FROM productsinstore 
WHERE product_id = 2 AND 
date_product >= DATE(NOW() - INTERVAL 1 WEEK) 
AND date_product < DATE(NOW())
ORDER BY ABS(DATEDIFF(NOW(), date_product)) ASC LIMIT 1;


