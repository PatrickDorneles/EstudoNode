const mongoose = require('../config/server').Mongoose
const { OK, NOT_FOUND, BAD_REQUEST, CREATED } = require('../utils/statusCodes')
const CostumerNotFoundError = require('../errors/CostumerNotFoundError')
const InvalidCostumerNameError = require('../errors/InvalidCostumerNameError')
const InvalidCostumerGoldStatusError = require('../errors/InvalidCostumerGoldStatusError')
const InvalidCostumerPhoneNumberError = require('../errors/InvalidCostumerPhoneNumberError')

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
    

    return { costumers }
}

module.exports.getCostumers = getCostumers

async function getCostumerById(id) {
    const costumer = await Costumer.findById(id)

    if(!costumer){
        throw new CostumerNotFoundError()
    }

    return { costumer }
}

module.exports.getCostumerById = getCostumerById

async function createCostumer(costumer) {

    if(!costumer.name) {
        throw new InvalidCostumerNameError("Name can't be empty")
    }

    if(costumer.name.length < 2){
        throw new InvalidCostumerNameError('Name must be at least 3 characters long')
    }

    if(costumer.isGold === undefined || costumer.isGold === null || typeof costumer.isGold !== 'boolean'){
        throw new InvalidCostumerGoldStatusError()
    }

    if(!costumer.phone || costumer.phone.length < 8) {
        throw new InvalidCostumerPhoneNumberError()
    }

    const existingCostumer = await Costumer.findOne({name: costumer.name})

    if(existingCostumer) {
        throw new InvalidCostumerNameError('Name already in use')
    }

    const newCostumer = new Costumer({
        name: costumer.name,
        isGold: costumer.isGold,
        phone: costumer.phone
    })

    await newCostumer.save()

    return { newCostumer }

}

module.exports.createCostumer = createCostumer

async function putCostumer(id, newCostumer) {
    
    const costumer = await Costumer.findById(id)

    if(!costumer){
        throw new CostumerNotFoundError()
    }

    if(!newCostumer.name) {
        throw new InvalidCostumerNameError("Name can't be empty")
    }

    if(newCostumer.name.length < 2){
        throw new InvalidCostumerNameError('Name must be at least 3 characters long')
    }

    if(newCostumer.isGold === undefined || newCostumer.isGold === null){
        throw new InvalidCostumerGoldStatusError()
    }

    if(!newCostumer.phone || newCostumer.phone.length < 8) {
        throw new InvalidCostumerPhoneNumberError()
    }

    costumer.set({
        name: newCostumer.name,
        isGold: newCostumer.isGold,
        phone: newCostumer.phone
    })

    costumer.save()

    return { costumer }

    
}

module.exports.putCostumer = putCostumer

async function deleteCostumer(id) {

    const costumer = await Costumer.findById(id)

    if(!costumer){
        throw new CostumerNotFoundError()
    }

    await Costumer.deleteOne({ _id: id })

    return { message: `Costumer ${costumer.name} successfully deleted ` }
    
}

module.exports.deleteCostumer = deleteCostumer