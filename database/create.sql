-------- store ------- 

CREATE TABLE store (
store_id INT NOT NULL auto_increment,
store_name VARCHAR(250),
longitude FLOAT,
latitude FLOAT,
CONSTRAINT pk_store PRIMARY KEY (store_id)
);


-------- category --------

CREATE TABLE category (
category_id VARCHAR(250) NOT NULL,
category_name VARCHAR(250) NOT NULL,
CONSTRAINT pk_category PRIMARY KEY (category_id)
);


---------- subcategory -----------

CREATE TABLE subcategory (
subcategory_id VARCHAR(250) NOT NULL,
subcategory_name VARCHAR(250) NOT NULL,
parent_id VARCHAR(250),
PRIMARY KEY (subcategory_id),
FOREIGN KEY (parent_id) REFERENCES category(category_id)
ON DELETE CASCADE
);


-------- product --------

CREATE TABLE product (
product_id INT NOT NULL auto_increment,
product_name VARCHAR(250),
category VARCHAR(250),
subcategory VARCHAR(250),
img  TEXT,
PRIMARY KEY (product_id)
);

-- insert into product (category, subcategory)
-- select category_name, subcategory_name
-- from category, subcategory


-------- user --------

CREATE TABLE user (
user_id INT NOT NULL auto_increment,
username VARCHAR(250) NOT NULL,
email VARCHAR(25) NOT NULL,
password VARCHAR(250) NOT NULL,
isadmin BIT(1) DEFAULT 0,
score FLOAT,
tokens FLOAT,
PRIMARY KEY (user_id)
);


-------- score --------

CREATE TABLE score (
score_id INT NOT NULL auto_increment,
user_id INT,
current_score INT,
past_score INT,
dates date,
PRIMARY KEY (score_id),
FOREIGN KEY (user_id) REFERENCES user(user_id)
ON DELETE CASCADE
);


-------- tokens --------

CREATE TABLE tokens (
token_id INT NOT NULL auto_increment,
user_id INT,
current_tokens INT,
past_tokens INT,
dates date,
PRIMARY KEY (token_id),
FOREIGN KEY (user_id) REFERENCES user(user_id)
ON DELETE CASCADE
);

-------- insert into user --------
-- insert into user (score, tokens)
-- select current_score, current_tokens
-- from score, tokens


-------- offer --------

CREATE TABLE offer (
offer_id INT NOT NULL auto_increment,
user_id INT,
product INT,
price FLOAT,
store INT,
dates date,
PRIMARY KEY (offer_id),
FOREIGN KEY (user_id) REFERENCES user(user_id),
FOREIGN KEY (product) REFERENCES product(product_id)
ON DELETE CASCADE,
FOREIGN KEY (store) REFERENCES store(store_id)
ON DELETE CASCADE
);


-------- reaction --------

create table reaction (
user_id INT,
offer_id INT,
is_like BIT,
dates DATE,
FOREIGN KEY (user_id) REFERENCES user(user_id),
FOREIGN KEY (offer_id) REFERENCES offer(offer_id)
ON DELETE CASCADE
);
