const express = require('express')
const services = require('../services/costumerServices')
const router = express.Router()
const { INTERNAL_SERVER_ERROR, OK, CREATED } = require('../utils/statusCodes')

router.get('/', async (req,res) => {
    try {
        const response = await services.getCostumers()
        res.status(OK).send(response)            
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)
    }
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const response = await services.getCostumerById(id)
        res.status(OK).send(response)        
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)
    }
})

router.post('/', async (req,res) => {
    const costumer = req.body
    try {
        const response = await services.createCostumer(costumer)
        res.status(CREATED).send(response)            
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)        
    }
})

router.put('/:id', async (req,res) => {
    const newCostumer = req.body
    const id = req.params.id
    try {   
        const response = await services.putCostumer(id, newCostumer)
        res.status(OK).send(response)   
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)        
    }
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const response = await services.deleteCostumer(id)
        res.status(OK).send(response)   
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)
    }
})

module.exports = router