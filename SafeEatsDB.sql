CREATE DATABASE IF NOT EXISTS SafeEats;
USE SafeEats;

CREATE TABLE IF NOT EXISTS allergen (
    allergen_id INT AUTO_INCREMENT PRIMARY KEY,
    allergen_name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    severity_level VARCHAR(50),
    common_food_sources VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_joined DATE DEFAULT CURRENT_DATE,
    bio VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS user_allergen (
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    allergen_id INT NOT NULL,
    FOREIGN KEY (allergen_id) REFERENCES allergen(allergen_id),
    PRIMARY KEY (user_id, allergen_id)
);

CREATE TABLE IF NOT EXISTS restaurant (
    restaurant_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    phone_number VARCHAR(20),
    website VARCHAR(255),
    rating INT
);

CREATE TABLE IF NOT EXISTS post (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    restaurant_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    title VARCHAR(100),
    review_text TEXT,
    safety_rating INT,
    date_posted DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS restaurant_allergen (
    restaurant_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    allergen_id INT NOT NULL,
    FOREIGN KEY (allergen_id) REFERENCES allergen(allergen_id),
    PRIMARY KEY (restaurant_id, allergen_id),
    safety_status VARCHAR(50),
    notes VARCHAR(200)
);