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

router.post('/register', async (req, res) => {
    try {
        const newUser = await user.register(req.body);
        console.log(newUser)
        res.send({...newUser, password: undefined})
    }   catch(error) {
        res.status(401).send({message: error.message});
    }
})

router.post('/login', async (req, res) => {
    try {
        const existingUser = await user.login(req.body)
        console.log(existingUser)
        res.send({...existingUser, password: undefined})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

router.put('/updateUser/:user_id', async (req, res) => {
    try {
        await user.updateUser(req.params.user_id, req.body)
        res.send({message: "User updated successfully"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

router.delete('/deleteUser/:user_id', async (req, res) => {
    try {
        await user.deleteUser(req.params.user_id)
        res.send({message: "User deleted successfully"})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router