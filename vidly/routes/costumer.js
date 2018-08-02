const express = require('express')
const services = require('../services/costumerServices')
const router = express.Router()

router.get('/', async (req,res) => {
    const response = await services.getCostumers()
    res.status(response.status).send(response.data)
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    const response = await services.getCostumerById(id)
    res.status(response.status).send(response.data)
})

router.post('/', async (req,res) => {
    const costumer = req.body
    const response = await services.createCostumer(costumer)
    res.status(response.status).send(response.data)
})

router.put('/:id', async (req,res) => {
    const newCostumer = req.body
    const id = req.params.id
    const response = await services.putCostumer(id,newCostumer)
    res.status(response.status).send(response.data)
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    const response = await services.deleteCostumer(id)
    res.status(response.status).send(response.data)
})

module.exports = router