const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
})

// Startup-ல் connection verify பண்ணு
transporter.verify((err) => {
  if (err) {
    console.error('❌ Email connection failed:', err.message)
  } else {
    console.log('✅ Email transporter ready')
  }
})

module.exports = transporter
