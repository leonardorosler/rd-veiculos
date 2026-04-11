const express = require('express')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.get('/teste', (req, res) => {
  res.json("Rota teste funcionando")
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})