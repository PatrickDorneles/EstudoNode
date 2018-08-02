const { NOT_FOUND } = require('../utils/statusCodes')

class CostumerNotFoundError extends Error {
    constructor(){
        super("Costumer not found")
        this.status = NOT_FOUND
    }
}

module.exports = CostumerNotFoundError


