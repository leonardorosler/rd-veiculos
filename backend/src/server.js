const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())


app.get('/teste', (req, res) => {
  res.status(200).send("Rota get funcionando!")
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(` Server rodando na porta ${PORT}`)
})