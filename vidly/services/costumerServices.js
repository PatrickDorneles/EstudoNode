const mongoose = require('../config/server').Mongoose
const { OK, NOT_FOUND, BAD_REQUEST, CREATED } = require('../utils/statusCodes')

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
    

    return { status: OK, data: costumers }
}

module.exports.getCostumers = getCostumers

async function getCostumerById(id) {
    const costumer = await Costumer.findById(id)

    if(!costumer){
        return { status: NOT_FOUND, data: 'Costumer not found' }
    }

    return { status: OK, data: { costumer } }
}

module.exports.getCostumerById = getCostumerById

async function createCostumer(costumer) {
    
    if(!costumer) {
        return { status: BAD_REQUEST, data: 'Invalid costumer' }
    }

    if(!costumer.name) {
        return { status: BAD_REQUEST, data: 'Invalid costumer name'}
    }

    if(costumer.name.length < 2){
        return { status: BAD_REQUEST, data: 'Name must be at least 3 characters long'}
    }

    if(costumer.isGold === undefined || costumer.isGold === null){
        return { status: BAD_REQUEST, data: 'Invalid value for "is Gold" '}
    }

    if(!costumer.phone || costumer.phone.length < 8) {
        return { status: BAD_REQUEST, data: 'Invalid phone number'}
    }

    const existingCostumer = await Costumer.findOne({name: costumer.name})

    if(existingCostumer) {
        return { status: BAD_REQUEST, data: 'Costumer name already in use'}
    }

    const newCostumer = new Costumer({
        name: costumer.name,
        isGold: costumer.isGold,
        phone: costumer.phone
    })

    await newCostumer.save()

    return { status: CREATED, data: { newCostumer }}

}

module.exports.createCostumer = createCostumer

async function putCostumer(id, newCostumer) {
    
    const costumer = await Costumer.findById(id)

    if(!costumer){
        return { status: NOT_FOUND, data: 'Costumer not found' }
    }

    if(!newCostumer) {
        return { status: BAD_REQUEST, data: 'Invalid costumer' }
    }

    if(!newCostumer.name) {
        return { status: BAD_REQUEST, data: 'Invalid costumer name'}
    }

    if(newCostumer.name.length < 2){
        return { status: BAD_REQUEST, data: 'Name must be at least 3 characters long'}
    }

    if(newCostumer.isGold === undefined || newCostumer.isGold === null){
        return { status: BAD_REQUEST, data: 'Invalid value for "is Gold" '}
    }

    if(!newCostumer.phone || newCostumer.phone.length < 8) {
        return { status: BAD_REQUEST, data: 'Invalid phone number'}
    }

    costumer.set({
        name: newCostumer.name,
        isGold: newCostumer.isGold,
        phone: newCostumer.phone
    })

    costumer.save()

    return { status: OK, data: { costumer } }

    
}

module.exports.putCostumer = putCostumer

async function deleteCostumer(id) {

    const costumer = await Costumer.findById(id)

    if(!costumer){
        return { status: NOT_FOUND, data: 'Costumer not found' }
    }

    await Costumer.deleteOne({ _id: id })

    return { status: OK, data: `Costumer ${costumer.name} successfully deleted ` }
    
}

module.exports.deleteCostumer = deleteCostumer