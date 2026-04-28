const con = require("./db_connect")

async function createUserTable() {
    let sql = `
    CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_joined DATE DEFAULT (CURRENT_DATE),
    bio VARCHAR(200)
    ); `

    await con.query(sql)
}

createUserTable()

async function getAllUsers() {
    let sql = `
      SELECT * FROM user;
    `
    return await con.query(sql)
}

module.exports = { getAllUsers }