const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
transporter.verify((err) => {
  if (err) {
    console.error('❌ Email connection failed:', err.message)
  } else {
    console.log('✅ Email transporter ready')
  }
})
module.exports = transporter
