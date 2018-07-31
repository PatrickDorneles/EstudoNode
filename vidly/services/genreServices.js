const mongoose = require('../config/server').Mongoose
const statusCode = require('../utils/statusCodes')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Genre = mongoose.model('Genre', genreSchema)

async function getGenres() {

    const genres = await Genre.find()

    return { status: statusCode.OK, data: genres }

}

module.exports.getGenres = getGenres

async function postGenre(genre) {

    if (!genre) {
        return { status: statusCode.BAD_REQUEST, data: 'Genre invalid' }
    }

    if (!genre.name || !genre.name.length) {
        return { status: statusCode.BAD_REQUEST, data: 'Genre name invalid' }
    }

    const existentGenre = await Genre.findOne({ name: genre.name })

    if (existentGenre) {
        return { status: statusCode.BAD_REQUEST, data: 'Genre name already in use' }
    }

    const newGenre = new Genre({
        name: genre.name
    })

    const response = await newGenre.save()

    return { status: statusCode.CREATED, data: { newGenre } }

}

module.exports.postGenre = postGenre

async function getGenreById(id) {

    const genre = await Genre.findById(id)

    if (!genre) {
        return { status: statusCode.NOT_FOUND, data: 'Genre not found' }
    }

    return { status: statusCode.OK, data: { genre } }

}

module.exports.getGenreById = getGenreById

async function putGenre(id, newGenre) {

    const genre = await Genre.findById(id)

    if (!genre) {
        return { status: 404, data: 'Genre not found' }
    }

    if (!newGenre) {
        return { status: 400, data: 'Genre invalid' }
    }

    if (!newGenre.name || !newGenre.name.length) {
        return { status: 400, data: 'Genre name invalid' }
    }

    genre.set({
        name: newGenre.name
    })

    genre.save()

    return { status: 200, data: { genre } }

}

module.exports.putGenre = putGenre

async function deleteGenre(id) {

    const genre = await Genre.findById(id)

    if (!genre) {
        return { status: 404, data: 'Genre not found' }
    }

    await Genre.deleteOne({ _id: id })

    return { status: 200, data: `Genre ${genre.name} was deleted ` }

}

module.exports.deleteGenre = deleteGenre