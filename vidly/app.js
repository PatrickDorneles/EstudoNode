const express = require('express')
const genres = require('./routes/genre')
const costumers = require('./routes/costumer')
const app = express();

app.use(express.json())
app.use('/api/genres', genres)
app.use('/api/costumers', costumers)

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

