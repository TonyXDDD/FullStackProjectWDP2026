const express = require("express")
const router = express.Router()
const user = require("../models/user")

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await user.getAllUsers()
        res.send(users)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router