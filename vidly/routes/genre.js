const express = require('express')
const services = require('../services/genreServices')
const router = express.Router()

router.get('/', async (req, res) => {
    const response = await services.getGenres()
    res.status(response.status).send(response.data)
})

router.post('/', async (req, res) => {
    const genre = req.body
    const response = await services.postGenre(genre)
    res.status(response.status).send(response.data)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const response = await services.getGenreById(id)
    res.status(response.status).send(response.data)
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const genre = req.body
    const response = await services.putGenre(id, genre)
    res.status(response.status).send(response.data)
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const response = await services.deleteGenre(id)
    res.status(response.status).send(response.data)
})

module.exports = router