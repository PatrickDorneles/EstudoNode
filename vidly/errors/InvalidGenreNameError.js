const { BAD_REQUEST } = require('../utils/statusCodes')

class InvalidGenreNameError extends Error {
    constructor(message){
        super(message)
        this.status = BAD_REQUEST
    }
}

module.exports = InvalidGenreNameError