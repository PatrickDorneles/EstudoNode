const mongoose = require('../config/server').Mongoose
const GenreNotFoundError = require('../errors/GenreNotFoundError')
const InvalidGenreNameError = require('../errors/InvalidGenreNameError')

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Genre = mongoose.model('Genre', genreSchema)

async function getGenres() {

    const genres = await Genre.find()

    return { genres }

}

module.exports.getGenres = getGenres

async function postGenre(genre) {

    if (!genre.name || !genre.name.length) {
        throw new InvalidGenreNameError("Name can't be empty")
    }

    const existentGenre = await Genre.findOne({ name: genre.name })

    if (existentGenre) {
        throw new InvalidGenreNameError("Name already in use")
    }

    const newGenre = new Genre({
        name: genre.name
    })

    const response = await newGenre.save()

    return { newGenre }

}

module.exports.postGenre = postGenre

async function getGenreById(id) {

    const genre = await Genre.findById(id)

    if (!genre) {
        throw new GenreNotFoundError()
    }

    return { genre }

}

module.exports.getGenreById = getGenreById

async function putGenre(id, newGenre) {

    const genre = await Genre.findById(id)

    if (!genre) {
        throw new GenreNotFoundError()
    }

    if (!newGenre.name || !newGenre.name.length) {
        throw new InvalidGenreNameError("Name can't be empty")
    }

    genre.set({
        name: newGenre.name
    })

    genre.save()

    return { genre }

}

module.exports.putGenre = putGenre

async function deleteGenre(id) {

    const genre = await Genre.findById(id)

    if (!genre) {
        throw new GenreNotFoundError()
    }

    await Genre.deleteOne({ _id: id })

    return { message: `Genre ${genre.name} was deleted ` }

}

module.exports.deleteGenre = deleteGenre