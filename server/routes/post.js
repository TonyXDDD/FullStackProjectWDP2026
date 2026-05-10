const express = require("express")
const router = express.Router()
const post = require("../models/post")

router.get('/getAllPosts', async (req, res) => {
    try {
        const posts = await post.getAllPosts()
        res.send(posts)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

router.post('/createPost', async (req, res) => {
    try {
        await post.createPost(req.body)
        res.send({message: "Post created successfully"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

router.get('/getPostsByUser/:user_id', async (req, res) => {
    try {
        const posts = await post.getPostsByUser(req.params.user_id)
        res.send(posts)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router