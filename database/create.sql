-------- store ------- 

CREATE TABLE store (
    store_id INT NOT NULL auto_increment,
    store_name VARCHAR(250),
    longitude FLOAT,
    latitude FLOAT,
    CONSTRAINT pk_store PRIMARY KEY (store_id),
    CONSTRAINT unique_comb UNIQUE (store_name, longitude, latitude)
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
    parent_id VARCHAR(250) NOT NULL,
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
    img TEXT,
    PRIMARY KEY (product_id),
    FOREIGN KEY (category) REFERENCES category(category_id),
    FOREIGN KEY (subcategory) REFERENCES subcategory(subcategory_id)
);


-------- user --------

CREATE TABLE user (
    user_id INT NOT NULL auto_increment,
    username VARCHAR(250) NOT NULL,
    email VARCHAR(25) NOT NULL,
    password VARCHAR(250) NOT NULL,
    isadmin BIT(1) DEFAULT 0,
    PRIMARY KEY (user_id)
);


-------- score --------

CREATE TABLE score (
    score_id INT NOT NULL auto_increment,
    user_id INT,
    current_score FLOAT,
    past_score FLOAT,
    PRIMARY KEY (score_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    ON DELETE CASCADE
);


-------- tokens --------

CREATE TABLE tokens (
    token_id INT NOT NULL auto_increment,
    user_id INT,
    current_tokens FLOAT,
    previous_month_tokens FLOAT,
    total_tokens FLOAT,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    ON DELETE CASCADE
);


-------- offer --------

CREATE TABLE offer (
    offer_id INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    product INT NOT NULL,
    price FLOAT NOT NULL,
    store INT NOT NULL,
    date_offer DATETIME DEFAULT CURRENT_TIMESTAMP,
    stock BIT(1) DEFAULT 1,
    PRIMARY KEY (offer_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
    ON DELETE CASCADE,
    FOREIGN KEY (product) REFERENCES product(product_id)
    ON DELETE CASCADE,
    FOREIGN KEY (store) REFERENCES store(store_id)
    ON DELETE CASCADE
);


-------- reaction --------

create table reaction (
    reaction_id INT NOT NULL auto_increment,
    user_id INT NOT NULL,
    offer_id INT NOT NULL,
    is_like BIT NOT NULL,
    date_reaction DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (reaction_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (offer_id) REFERENCES offer(offer_id)
    ON DELETE CASCADE
);

-------- products in store --------

CREATE TABLE productsinstore (
	id INT NOT NULL auto_increment,
    product_name VARCHAR(250) NOT NULL,
    category VARCHAR(250) NOT NULL,
    subcategory VARCHAR(250) NOT NULL,
    product_id INT NOT NULL,
    price FLOAT NOT NULL,
    date_product DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    CONSTRAINT pk_productsInStore UNIQUE (product_id, price, date_product)
);

CREATE TABLE totaltokens (
    total_tokens INT NOT NULL
);
