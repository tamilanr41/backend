const { sendMail } = require('../config/mailer')

function validate({ name, email, subject, message }) {
  const errors = {}
  if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Valid email address is required'
  if (!subject || !subject.trim()) errors.subject = 'Subject is required'
  if (!message || message.trim().length < 20) errors.message = 'Message must be at least 20 characters'
  return errors
}

exports.sendContact = async (req, res) => {
  const { name, email, subject, message } = req.body

  const errors = validate({ name, email, subject, message })
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors })
  }

  try {
    await sendMail({
      to: process.env.EMAIL_TO,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family:'Helvetica Neue',sans-serif;max-width:560px;margin:0 auto;background:#0d0d0d;color:#e8e8e8;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1a1a1a,#111);padding:32px;border-bottom:1px solid rgba(201,168,76,0.3);">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.4em;color:#c9a84c;text-transform:uppercase;">New Message</p>
            <h1 style="margin:0;font-size:22px;color:#fff;">Portfolio Contact</h1>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:10px 0;color:#888;width:90px;">Name</td><td style="padding:10px 0;color:#e8e8e8;font-weight:600;">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#888;">Email</td><td style="padding:10px 0;"><a href="mailto:${email}" style="color:#c9a84c;text-decoration:none;">${email}</a></td></tr>
              <tr><td style="padding:10px 0;color:#888;">Subject</td><td style="padding:10px 0;color:#e8e8e8;">${subject}</td></tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:rgba(255,255,255,0.04);border-left:3px solid #c9a84c;border-radius:4px;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.3em;color:#888;text-transform:uppercase;">Message</p>
              <p style="margin:0;font-size:15px;line-height:1.7;color:#ccc;white-space:pre-wrap;">${message}</p>
            </div>
            <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
                style="display:inline-block;padding:12px 24px;background:#c9a84c;color:#000;text-decoration:none;font-size:13px;font-weight:700;border-radius:6px;">
                REPLY →
              </a>
            </div>
          </div>
          <div style="padding:16px 32px;background:rgba(255,255,255,0.03);font-size:11px;color:#555;text-align:center;">
            ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </div>
        </div>
      `,
    })

    await sendMail({
      to: email,
      subject: `Hey ${name.split(' ')[0]}, your message landed safely! 🎯`,
      html: `
        <div style="font-family:'Helvetica Neue',sans-serif;max-width:520px;margin:0 auto;background:#0d0d0d;color:#e8e8e8;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1a1a1a,#111);padding:36px 32px;border-bottom:1px solid rgba(201,168,76,0.3);">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.4em;color:#c9a84c;text-transform:uppercase;">Zhanx Studio</p>
            <h1 style="margin:0;font-size:26px;font-weight:700;color:#fff;">Full Stack Developer</h1>
          </div>
          <div style="padding:36px 32px;">
            <h2 style="margin:0 0 20px;font-size:22px;color:#fff;">Hey ${name.split(' ')[0]}! 👋</h2>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#bbb;">
              Your message landed safely. I'll review it and get back to you within
              <strong style="color:#c9a84c;">24 hours</strong>.
            </p>
            <div style="padding:18px 20px;background:rgba(201,168,76,0.07);border:1px solid rgba(201,168,76,0.2);border-radius:10px;margin-bottom:28px;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.35em;color:#888;text-transform:uppercase;">Your message</p>
              <p style="margin:0;font-size:14px;color:#ccc;font-style:italic;">"${subject}"</p>
            </div>
            <a href="mailto:zhanxstudio@gmail.com"
              style="display:inline-block;padding:12px 22px;background:#c9a84c;color:#000;text-decoration:none;font-size:12px;font-weight:700;border-radius:6px;">
              CONTACT →
            </a>
          </div>
          <div style="padding:20px 32px;background:rgba(255,255,255,0.03);border-top:1px solid rgba(255,255,255,0.06);">
            <p style="margin:0;font-size:13px;color:#666;">— Zhanx Studio<br>
            <span style="font-size:11px;color:#444;">Full Stack Developer</span></p>
          </div>
        </div>
      `,
    })

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! You will hear back within 24 hours.',
    })
  } catch (err) {
    console.error('Email error:', err.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    })
  }
}
