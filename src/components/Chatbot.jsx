import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Loader2, Bot, User } from 'lucide-react'
import { askGemini } from '../services/geminiService'
import data from '../data/portfolioData.json'

const suggested = [
  'What are your skills?',
  'Tell me about your projects',
  'What is your experience?',
  'How can I contact you?',
]

// Minimal markdown -> HTML (bold, inline code, lists, line breaks).
function renderMarkdown(text) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  let html = esc(text)
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-ink-200/60 dark:bg-ink-800/70 font-mono text-xs">$1</code>')
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // bullet lists
  html = html.replace(/(^|\n)([-*] .+(?:\n[-*] .+)*)/g, (m, pre, block) => {
    const items = block.split('\n').map((l) => l.replace(/^[-*] /, '')).map((l) => `<li>${l}</li>`).join('')
    return `${pre}<ul class="list-disc ml-5 my-1 space-y-0.5">${items}</ul>`
  })
  html = html.replace(/\n/g, '<br/>')
  return html
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm ${data.profile.firstName}'s AI assistant. Ask me about my skills, projects, experience, or how to get in touch.` },
  ])
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, busy, open])

  const send = async (text) => {
    const content = (text ?? input).trim()
    if (!content || busy) return
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setBusy(true)
    try {
      const reply = await askGemini(next.slice(-10))
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: "Sorry, I couldn't reach the AI service right now. Please try again in a moment." }])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat assistant"
        className="fixed bottom-5 right-5 z-50 grid place-items-center h-14 w-14 rounded-full bg-ink-900 text-white dark:bg-white dark:text-ink-900 shadow-glow"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={22} /></motion.span>
          ) : (
            <motion.span key="c" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle size={22} /></motion.span>
          )}
        </AnimatePresence>
        {!open && <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent-deep ring-2 ring-white dark:ring-ink-950 animate-pulse" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-96 h-[32rem] glass-card gradient-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-ink-200/40 dark:border-ink-800/60">
              <span className="grid place-items-center h-9 w-9 rounded-full bg-accent/20 text-accent-deep"><Sparkles size={18} /></span>
              <div className="flex-1">
                <p className="font-semibold text-sm">AI Assistant</p>
                <p className="text-xs text-ink-500 dark:text-ink-400 flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Online</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <span className={`grid place-items-center h-7 w-7 rounded-full shrink-0 ${m.role === 'user' ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900' : 'bg-accent/20 text-accent-deep'}`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </span>
                  <div className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900 rounded-tr-sm' : 'glass rounded-tl-sm'}`}>
                    {m.role === 'assistant' ? <span dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} /> : m.content}
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex gap-2">
                  <span className="grid place-items-center h-7 w-7 rounded-full bg-accent/20 text-accent-deep"><Bot size={14} /></span>
                  <div className="glass px-3.5 py-2.5 rounded-2xl rounded-tl-sm flex gap-1">
                    {[0, 1, 2].map((d) => <motion.span key={d} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15 }} className="h-1.5 w-1.5 rounded-full bg-accent-deep" />)}
                  </div>
                </div>
              )}
            </div>

            {/* Suggested chips */}
            {messages.length <= 1 && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                {suggested.map((s) => (
                  <button key={s} onClick={() => send(s)} className="chip text-xs hover:shadow-glow">{s}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={(e) => { e.preventDefault(); send() }} className="p-3 border-t border-ink-200/40 dark:border-ink-800/60 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                aria-label="Message"
                className="flex-1 px-3.5 py-2.5 rounded-xl glass text-sm outline-none focus:shadow-glow transition-shadow"
              />
              <button type="submit" disabled={busy} aria-label="Send" className="grid place-items-center h-10 w-10 rounded-xl bg-ink-900 text-white dark:bg-white dark:text-ink-900 disabled:opacity-50">
                {busy ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
