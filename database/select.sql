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
select s.store_id, s.store_name, s.longitude, s.latitude 
from offer o
inner join product p
on p.product_id = o.product
inner join store s on s.store_id = o.store
where p.category = ?;