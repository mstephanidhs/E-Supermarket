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
WHERE s.store_name = ?