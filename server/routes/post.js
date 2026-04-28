const express = require("express")
const router = express.Router()
const post = require("../models/post")

router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await user.getAllPosts()
        res.send(posts)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router