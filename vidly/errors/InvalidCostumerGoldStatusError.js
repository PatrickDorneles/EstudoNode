const { BAD_REQUEST } = require('../utils/statusCodes')

class InvalidCostumerGoldStatusError extends Error {
    constructor(){
        super("Invalid Gold status")
        this.status = BAD_REQUEST
    }
}

module.exports = InvalidCostumerGoldStatusError