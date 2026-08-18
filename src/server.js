require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorHandler')
const app = express()
app.set('trust proxy', 1)
const PORT = process.env.PORT || 5000
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://subashportfolio1.netlify.app',
  'https://sprightly-hamster-71d3ea.netlify.app',
  'https://tiny-treacle-d855ca.netlify.app',
  'https://zhanxstudio.in',
  'https://www.zhanxstudio.in',
  process.env.CLIENT_URL,
].filter(Boolean)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    callback(new Error(`CORS blocked: ${origin}`))
  },
  methods: ['GET', 'POST'],
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime().toFixed(2) + 's' })
})
app.use('/api/contact', require('./routes/contact'))
app.use('/api', require('./routes/portfolio'))
app.use('/api/mentor', require('./routes/mentor'))
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`)
  console.log(`📋 Environment : ${process.env.NODE_ENV || 'development'}`)
  console.log(`📨 Email To    : ${process.env.EMAIL_TO || '(not set)'}`)
})
