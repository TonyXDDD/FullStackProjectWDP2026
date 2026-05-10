const express = require("express")
const router = express.Router()
const allergen = require("../models/allergen")

router.get('/getAllAllergens', async (req, res) => {
    try {
        const allergens = await allergen.getAllAllergens()
        res.send(allergens)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

router.get('/getPostAllergens/:post_id', async (req, res) => {
    try {
        const allergens = await allergen.getPostAllergens(req.params.post_id)
        res.send(allergens)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router