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
    date_joined DATE,
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
    restaurant_name VARCHAR(100),
    location VARCHAR(100),
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

CREATE TABLE IF NOT EXISTS post_allergen (
    post_id INT NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post(post_id),
    allergen_id INT NOT NULL,
    FOREIGN KEY (allergen_id) REFERENCES allergen(allergen_id),
    PRIMARY KEY (post_id, allergen_id)
);

INSERT INTO allergen 
(allergen_name, description, severity_level, common_food_sources)
VALUES

(
'Peanuts',
'Legume allergy that can cause severe allergic reactions.',
'High',
'Peanut butter, candy, baked goods, sauces'
),

(
'Tree Nuts',
'Allergy to nuts such as almonds, walnuts, cashews, and pecans.',
'High',
'Almonds, walnuts, pesto, desserts'
),

(
'Milk',
'Dairy allergy involving proteins found in cow milk products.',
'Medium',
'Milk, cheese, butter, ice cream'
),

(
'Eggs',
'Allergy to proteins found in eggs.',
'Medium',
'Baked goods, mayonnaise, pasta'
),

(
'Soy',
'Allergy to soybeans and soy-based ingredients.',
'Medium',
'Soy sauce, tofu, processed foods'
),

(
'Wheat',
'Allergy to proteins found in wheat.',
'Medium',
'Bread, pasta, baked goods'
),

(
'Gluten',
'Sensitivity or intolerance to gluten proteins.',
'High',
'Bread, pasta, cereals, baked goods'
),

(
'Celiac Disease',
'Autoimmune disease triggered by gluten consumption.',
'High',
'Bread, pasta, flour, beer'
),

(
'Fish',
'Allergy to finned fish products.',
'High',
'Salmon, tuna, cod, seafood dishes'
),

(
'Shellfish',
'Allergy to crustaceans and shellfish.',
'High',
'Shrimp, crab, lobster, shellfish dishes'
),

(
'Sesame',
'Allergy to sesame seeds and sesame oil.',
'Medium',
'Hummus, sesame oil, burger buns'
),

(
'Sulfites',
'Sensitivity to preservatives commonly used in foods and drinks.',
'Medium',
'Wine, dried fruit, processed foods'
),

(
'Mustard',
'Allergy to mustard seeds and mustard products.',
'Medium',
'Mustard sauce, dressings, seasonings'
),

(
'Corn',
'Allergy or intolerance to corn and corn-derived products.',
'Low',
'Corn syrup, chips, tortillas'
),

(
'Coconut',
'Allergy to coconut products.',
'Low',
'Coconut milk, desserts, curries'
),

(
'Garlic',
'Sensitivity or allergy to garlic.',
'Low',
'Sauces, seasoning blends, pasta dishes'
),

(
'Onion',
'Sensitivity or allergy to onions.',
'Low',
'Soups, sauces, cooked dishes'
),

(
'MSG',
'Sensitivity to monosodium glutamate food additive.',
'Low',
'Chinese food, soups, snack foods'
),

(
'Red Dye',
'Sensitivity to artificial food coloring additives.',
'Low',
'Candy, drinks, processed snacks'
),

(
'Nightshades',
'Sensitivity to vegetables in the nightshade family.',
'Low',
'Tomatoes, peppers, eggplant, potatoes'
);
