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

    console.log(costumers);
    

    return { status: statusCode.OK, data: costumers }
}

module.exports.getCostumers = getCostumers

async function getCostumerById(id) {
    const costumer = await Costumer.findById(id)

    return { status: statusCode.OK, data: { costumer } }
}

module.exports.getCostumerById = getCostumerById

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

    if(!costumer.phone || costumer.phone.length < 8) {
        return { status: statusCode.BAD_REQUEST, data: 'Invalid phone number'}
    }

    const existingCostumer = Costumer.findOne({name: costumer.name})

    if(existingCostumer) {
        return { status: statusCode.BAD_REQUEST, data: 'Costumer name already in use'}
    }

    const newCostumer = new Costumer({
        name: costumer.name,
        isGold: costumer.isGold,
        phone: costumer.phone
    })

    await newCostumer.save()

    return { status: statusCode.CREATED, data: { newCostumer }}

}

module.exports.createCostumer = createCostumer