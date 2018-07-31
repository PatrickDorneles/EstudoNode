const express = require('express')
const genres = require('./routes/genre')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/genres', genres)

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

