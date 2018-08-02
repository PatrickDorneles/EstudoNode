const { BAD_REQUEST } = require('../utils/statusCodes')

class InvalidCostumerNameError extends Error {
    constructor(message){
        super(message)
        this.status = BAD_REQUEST
    }
}

module.exports = InvalidCostumerNameError