const mongoose = require('../config/server').Mongoose
const statusCode = require('../utils/statusCodes')

const costumerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isGold: {
        type: Boolean,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

const Costumer = mongoose.model('Costumer', costumerSchema)

async function getCostumers() {
    const costumers = await Costumer.find()

    return { status: statusCode.OK, data: costumers }
}

async function getCostumerById(id) {
    const costumer = await Costumer.findById(id)

    return { status: statusCode.OK, data: { costumer } }
}

async function createCostumer(costumer) {
    
    if(!costumer) {
        return { status: statusCode.BAD_REQUEST, data: 'Invalid costumer' }
    }

    if(!costumer.name) {
        return { status: statusCode.BAD_REQUEST, data: 'Invalid costumer name'}
    }

    if(costumer.name.length < 2){
        return { status: statusCode.BAD_REQUEST, data: 'Name must be at least 3 characters long'}
    }

    if(costumer.isGold === undefined || costumer.isGold === null){
        return { status: statusCode.BAD_REQUEST, data: 'Invalid value for "is Gold" '}
    }

    if(!costumer.phone) {
        return { status: statusCode.BAD_REQUEST, data: 'Invalid phone number'}
    }

}