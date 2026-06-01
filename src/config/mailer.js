const { Resend } = require('resend')
const resend = new Resend(process.env.RESEND_API_KEY)

const sendMail = async ({ to, subject, html }) => {
  const { error } = await resend.emails.send({
    from: 'Portfolio <onboarding@resend.dev>',
    to,
    subject,
    html,
  })
  if (error) throw new Error(error.message)
}

module.exports = { sendMail }
