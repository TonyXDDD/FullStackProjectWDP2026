const con = require("./db_connect")

async function createPostTable() {
    let sql = `
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
    );`

    await con.query(sql)
}

createPostTable()

async function createPost(post) {
    let sql = `
      INSERT INTO post (user_id, restaurant_name, location, review_text, safety_rating)
      VALUES (?, ?, ?, ?, ?)
    `
    const result = await con.query(sql, [
      post.user_id,
      post.restaurant_name,
      post.location,
      post.review_text,
      post.safety_rating
    ])

    if(post.allergens && post.allergens.length > 0) {
        for(let allergen_id of post.allergens) {
            let allergenSql = `INSERT INTO post_allergen (post_id, allergen_id) VALUES (?, ?)`
            await con.query(allergenSql, [result.insertId, allergen_id])
        }
    }

}

async function getPostsByUser(user_id) {
    let sql = `
      SELECT * FROM post WHERE user_id = ?
    `
    return await con.query(sql, [user_id])
}


async function getAllPosts() {
    let sql = `
      SELECT * FROM post;
    `
    return await con.query(sql)
}

module.exports = { 
    createPost, 
    getPostsByUser, 
    getAllPosts 
}