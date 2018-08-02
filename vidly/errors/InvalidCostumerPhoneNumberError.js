const { BAD_REQUEST } = require('../utils/statusCodes')

class InvalidCostumerPhoneNumberError extends Error {
    constructor(){
        super('Invalid phone number')
        this.status = BAD_REQUEST
    }
}

module.exports = InvalidCostumerPhoneNumberError