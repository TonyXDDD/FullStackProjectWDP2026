const con = require("./db_connect")

async function createPostTable() {
    let sql = `
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
    ); `

    await con.query(sql)
}

createUserTable()

async function getAllPosts() {
    let sql = `
      SELECT * FROM post;
    `
    return await con.query(sql)
}

module.exports = { getAllPosts }