// Contact.jsx — Backend API-உடன் இணைக்கப்பட்டது
// src/components/Contact.jsx-ஐ இதனால் மாற்றவும்

import { useState, useRef } from 'react'

const INITIAL = { name: '', email: '', subject: '', message: '' }
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'பெயர் தேவை (Name is required)'
  else if (fields.name.trim().length < 2) errors.name = 'At least 2 characters required'
  if (!fields.email.trim()) errors.email = 'Email தேவை (Email is required)'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Valid email address தேவை'
  if (!fields.subject.trim()) errors.subject = 'Subject தேவை (Subject is required)'
  if (!fields.message.trim()) errors.message = 'Message தேவை (Message is required)'
  else if (fields.message.trim().length < 20) errors.message = 'At least 20 characters required'
  return errors
}

export default function Contact() {
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [toast, setToast] = useState({ show: false, type: 'success', msg: '' })
  const toastTimer = useRef(null)

  const showToast = (type, msg) => {
    setToast({ show: true, type, msg })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 4500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value })
      setErrors(prev => ({ ...prev, [name]: errs[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    const errs = validate(fields)
    setErrors(prev => ({ ...prev, [name]: errs[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const allTouched = { name: true, email: true, subject: true, message: true }
    setTouched(allTouched)
    const errs = validate(fields)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('sending')
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setFields(INITIAL)
        setTouched({})
        setErrors({})
        showToast('success', 'Message sent! I\'ll get back to you within 24 hours.')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        // Server-side validation errors
        if (data.errors) setErrors(data.errors)
        setStatus('idle')
        showToast('error', data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Contact submit error:', err)
      setStatus('idle')
      showToast('error', 'Network error. Please check your connection and try again.')
    }
  }

  const Field = ({ name, label, type = 'text', rows }) => (
    <div>
      <label className="form-label" htmlFor={name}>{label}</label>
      {rows ? (
        <textarea
          id={name} name={name} rows={rows}
          value={fields[name]} onChange={handleChange} onBlur={handleBlur}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className={`form-input resize-none ${touched[name] && errors[name] ? 'error' : ''}`}
        />
      ) : (
        <input
          id={name} name={name} type={type}
          value={fields[name]} onChange={handleChange} onBlur={handleBlur}
          placeholder={`Enter your ${label.toLowerCase()}...`}
          className={`form-input ${touched[name] && errors[name] ? 'error' : ''}`}
        />
      )}
      {touched[name] && errors[name] && (
        <p className="form-error"><span>⚠</span> {errors[name]}</p>
      )}
    </div>
  )

  return (
    <>
      <section id="contact" className="py-24 relative overflow-hidden bg-[--background]">
        <div className="absolute -left-20 top-10 w-72 h-72 rounded-full border border-[rgba(201,168,76,0.3)] pointer-events-none" />
        <div className="absolute right-10 bottom-10 w-40 h-24 diagonal-lines opacity-50 pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="reveal text-[0.68rem] tracking-[0.4em] text-[--gold] mb-6 uppercase">LET'S COLLABORATE</p>
            <h2 className="reveal delay-100 font-display text-[clamp(3rem,8vw,5rem)] mb-6">
              Have a project<br />in mind<span style={{ color: 'var(--gold)' }}>?</span>
            </h2>
            <p className="reveal delay-200 text-[--muted-foreground] max-w-xl mx-auto">
              Open to full-time roles and freelance projects. I build fast, scalable web apps — let's talk about what you're working on.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            {/* Left — info */}
            <div className="reveal-left">
              <div className="space-y-8">
                <div>
                  <p className="text-[0.68rem] tracking-[0.3em] text-[--muted-foreground] mb-3 uppercase">Email</p>
                  <a href="mailto:subashardin2001@gmail.com"
                    className="text-[--gold] text-lg border-b border-[--gold] pb-1 inline-block transition-all duration-300 hover:tracking-wide">
                    subashardin2001@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-[0.68rem] tracking-[0.3em] text-[--muted-foreground] mb-3 uppercase">Phone</p>
                  <a href="tel:8667845144" className="text-xl font-display hover:text-[--gold] transition-colors duration-200">
                    +91 8667845144
                  </a>
                </div>
                <div>
                  <p className="text-[0.68rem] tracking-[0.3em] text-[--muted-foreground] mb-3 uppercase">Connect</p>
                  <a href="https://linkedin.com/in/subash-nagamuthu-32011428b"
                    target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm tracking-[0.12em] hover:text-[--gold] transition-colors duration-200">
                    LINKEDIN →
                  </a>
                </div>
                <div className="flex items-center gap-3 mt-4 p-4 border border-[--border] rounded-xl bg-[--background]">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  <span className="text-sm text-[--muted-foreground]">Available for new projects</span>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="reveal-right">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field name="name" label="Your Name" />
                  <Field name="email" label="Email Address" type="email" />
                </div>
                <Field name="subject" label="Subject" />
                <Field name="message" label="Message" rows={5} />

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`submit-btn ${status === 'success' ? 'success' : ''}`}
                >
                  {status === 'sending' && (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                      </svg>
                      SENDING...
                    </span>
                  )}
                  {status === 'success' && '✓ MESSAGE SENT!'}
                  {status === 'idle' && 'SEND MESSAGE →'}
                </button>

                <p className="text-[0.72rem] text-center text-[--muted-foreground]">
                  I'll get back to you within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''}`}
        style={{ borderColor: toast.type === 'error' ? '#ef4444' : 'rgba(201,168,76,0.4)' }}>
        <div className="flex items-center gap-3">
          <span className="text-xl">{toast.type === 'success' ? '✓' : '⚠'}</span>
          <p className="text-sm">{toast.msg}</p>
        </div>
      </div>
    </>
  )
}
