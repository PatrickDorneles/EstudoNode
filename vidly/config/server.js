const mongoose = require('mongoose')

const MONGO_PORT = 27017
const CONNECTION_STRING = `mongodb://localhost:${MONGO_PORT}/vidly` 
const CONFIG = {
    useNewUrlParser: true
}

mongoose.connect(CONNECTION_STRING, CONFIG)
    .then((result) => {
        console.log('Connect to MongoDB');
    })
    .catch(err => {
        console.log('Could not connect to MongoDB', err);
    })



exports.Mongoose = mongoose