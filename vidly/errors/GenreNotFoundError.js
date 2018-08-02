const { NOT_FOUND } = require('../utils/statusCodes')

class GenreNotFoundError extends Error {
    constructor(){
        super('Genre not found')
        this.status = NOT_FOUND
    }
}

module.exports = GenreNotFoundError