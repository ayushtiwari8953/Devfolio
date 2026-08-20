import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, Loader2 } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import SectionHeading from './SectionHeading'
import data from '../data/portfolioData.json'

function getEnv() {
  try { return import.meta.env || {} } catch { return {} }
}
const env = getEnv()
const SERVICE_ID = env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = env.VITE_EMAILJS_PUBLIC_KEY

const initial = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const formRef = useRef(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    try {
      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY })
        toast.success('Message sent! I\'ll get back to you soon.')
      } else {
        // EmailJS not configured — simulate success so the UX is demoable.
        await new Promise((r) => setTimeout(r, 900))
        toast.info('Your msg is successfully submit.')
      }
      setForm(initial)
    } catch {
      toast.error('Something went wrong sending your message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
    { name: 'subject', label: 'Subject', type: 'text', placeholder: 'What is this about?' },
  ]

  const contactInfo = [
    { Icon: Mail, label: 'Email', value: data.profile.email, href: `mailto:${data.profile.email}` },
    { Icon: Phone, label: 'Phone', value: data.profile.phone, href: `tel:${data.profile.phone}` },
    { Icon: MapPin, label: 'Location', value: data.profile.location, href: null },
    { Icon: GithubIcon, label: 'GitHub', value: '@' + data.githubStats.username, href: data.profile.social.github },
    { Icon: LinkedinIcon, label: 'LinkedIn', value: '/in/' + data.profile.firstName.toLowerCase(), href: data.profile.social.linkedin },
  ]

  return (
    <section id="contact" className="section">
      <SectionHeading eyebrow="Contact" title="Let's talk" subtitle="Have a role, project, or idea in mind? My inbox is always open." />

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Info */}
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2 space-y-3">
          {contactInfo.map(({ Icon, label, value, href }) => (
            <a key={label} href={href || undefined} target={href ? '_blank' : undefined} rel="noreferrer" className="flex items-center gap-3 glass-card p-4 hover:shadow-glow transition-shadow">
              <span className="grid place-items-center h-11 w-11 rounded-xl bg-accent/15 text-accent-deep"><Icon size={18} /></span>
              <div>
                <p className="text-xs text-ink-500 dark:text-ink-400">{label}</p>
                <p className="font-medium text-sm">{value}</p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* Form */}
        <motion.form ref={formRef} onSubmit={onSubmit} noValidate initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3 glass-card gradient-border p-6 space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              <label htmlFor={f.name} className="block text-sm font-medium mb-1.5">{f.label}</label>
              <input
                id={f.name}
                name={f.name}
                type={f.type}
                value={form[f.name]}
                onChange={onChange}
                placeholder={f.placeholder}
                aria-invalid={!!errors[f.name]}
                className={`w-full px-4 py-2.5 rounded-xl glass text-sm outline-none focus:shadow-glow transition-shadow ${errors[f.name] ? 'ring-2 ring-red-400/60' : ''}`}
              />
              {errors[f.name] && <p className="text-xs text-red-400 mt-1">{errors[f.name]}</p>}
            </div>
          ))}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={onChange}
              placeholder="Tell me about it..."
              aria-invalid={!!errors.message}
              className={`w-full px-4 py-2.5 rounded-xl glass text-sm outline-none focus:shadow-glow transition-shadow resize-y ${errors.message ? 'ring-2 ring-red-400/60' : ''}`}
            />
            {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
          </div>
          <button type="submit" disabled={sending} className="btn-primary w-full disabled:opacity-60">
            {sending ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
