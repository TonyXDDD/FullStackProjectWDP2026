const con = require("./db_connect")

async function getAllAllergens() {
    let sql = `SELECT * FROM allergen`
    return await con.query(sql)
}

async function getPostAllergens(post_id) {
    let sql = `
        SELECT a.allergen_id, a.allergen_name 
        FROM allergen a
        JOIN post_allergen pa ON a.allergen_id = pa.allergen_id
        WHERE pa.post_id = ?
    `
    return await con.query(sql, [post_id])
}

async function addPostAllergens(post_id, allergen_ids) {
    for(let allergen_id of allergen_ids) {
        let sql = `INSERT INTO post_allergen (post_id, allergen_id) VALUES (?, ?)`
        await con.query(sql, [post_id, allergen_id])
    }
}

module.exports = { 
    getAllAllergens, 
    getPostAllergens, 
    addPostAllergens 
}