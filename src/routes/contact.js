const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')
const { sendContact } = require('../controllers/contactController')

const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests. Please wait a minute.' },
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/', contactLimiter, sendContact)

module.exports = router
