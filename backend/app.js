const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const rutasPreguntas = require('./rutas/preguntasRutas')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/preguntas', rutasPreguntas)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Conectado a MongoDB');
        console.log(`Base de datos utilizada ${mongoose.connection.name}`)
    })
    .catch(error =>{
        console.error('Error al conectar a MongoSB', error.message)
    })
module.exports = app