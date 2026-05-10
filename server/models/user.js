const con = require("./db_connect")
const bcrypt = require("bcrypt")

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

async function register(user) {

    let existingUser = await getUserByUsername(user.username)

    if(existingUser) {
        throw Error("Username already exists")
    }

    let hashedPassword = await bcrypt.hash(user.password, 10)

    let sql = `
    INSERT INTO user
    (username, email, password, first_name, last_name, bio)
    VALUES (?, ?, ?, ?, ?, ?)
    `

    await con.query(sql, [
        user.username,
        user.email,
        hashedPassword,
        user.first_name,
        user.last_name,
        user.bio
    ])

    return await login(user)
}

async function login(user) {

    let existingUser = await getUserByUsername(user.username)

    if(!existingUser) {
        throw Error("Username does not exist!")
    }

    let match = await bcrypt.compare(
        user.password,
        existingUser.password
    )

    if(!match) {
        throw Error("Password incorrect!")
    }

    return existingUser
}

async function getAllUsers() {
    let sql = `
      SELECT * FROM user;
    `
    return await con.query(sql)
}

async function getUserByUsername(username) {

    let sql = `
    SELECT * FROM user
    WHERE username=?
    `

    let cUser = await con.query(sql, [username])

    return cUser[0]
}

async function updateUser(user_id, user) {
    let sql = `
    UPDATE user
    SET username = ?, email = ?, first_name = ?, last_name = ?, bio = ?
     WHERE user_id = ?
    `
    await con.query(sql, [
        user.username,
        user.email,
        user.first_name,
        user.last_name,
        user.bio,
        user_id
    ])
}

async function deleteUser(user_id) {
    let sql = `DELETE FROM user WHERE user_id = ?`
    await con.query(sql, [user_id])
}

module.exports = {
    register,
    login,
    getAllUsers,
    updateUser,
    deleteUser
}