const express = require('express')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')

const app = express()

const origensPermitidas = [
  'http://localhost:5173',
  process.env.FRONTEND_URL  // domínio do Vercel em produção
].filter(Boolean)

app.use(cors({
  origin: origensPermitidas,
  credentials: true
}))

app.use(express.json())
app.use('/api', routes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})