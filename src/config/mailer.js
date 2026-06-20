const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async ({ to, subject, html }) => {
  await sgMail.send({
    from: 'zhanxstudio@gmail.com',
    to,
    subject,
    html,
  })
}

module.exports = { sendMail }
