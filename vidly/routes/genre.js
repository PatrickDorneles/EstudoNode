const express = require('express')
const services = require('../services/genreServices')
const router = express.Router()
const { INTERNAL_SERVER_ERROR, OK, CREATED } = require('../utils/statusCodes')

router.get('/', async (req, res) => {
    try {
        const response = await services.getGenres()
        res.status(OK).send(response)            
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)
    }
})

router.post('/', async (req, res) => {
    const genre = req.body
    try {
        const response = await services.postGenre(genre)
        res.status(CREATED).send(response)            
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)        
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const response = await services.getGenreById(id)
        res.status(OK).send(response)            
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)                        
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const genre = req.body
    try {
        const response = await services.putGenre(id, genre)
        res.status(OK).send(response)            
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)                                
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const response = await services.deleteGenre(id)
        res.status(OK).send(response)            
    } catch (error) {
        const errorStatusCode = error.status || INTERNAL_SERVER_ERROR
        res.status(errorStatusCode).send(error.message)                                        
    }
})

module.exports = router