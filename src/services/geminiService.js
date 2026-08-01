import portfolioData from '../data/portfolioData.json'

// Builds a compact context string from portfolio data so the AI model
// can answer questions about the owner's background accurately.
export function buildPortfolioContext(data = portfolioData) {
  const p = data.profile
  const skills = data.skills.map((c) => `${c.category}: ${c.items.map((i) => i.name).join(', ')}`).join('; ')
  const projects = data.projects.map((pr) => `${pr.title} (${pr.category}) — ${pr.description} [Tech: ${pr.technologies.join(', ')}]`).join('\n')
  const exp = data.experience.map((e) => `${e.role} at ${e.company} (${e.duration}): ${e.responsibilities.join(' ')}`).join('\n')
  const edu = data.education.map((e) => `${e.degree}, ${e.institution} (${e.duration}, ${e.score})`).join('\n')
  const certs = data.certificates.map((c) => `${c.title} — ${c.issuer} (${c.year})`).join(', ')

  return `You are the AI assistant for ${p.name}, a ${p.role}. Answer questions helpfully and concisely using ONLY the portfolio context below. If a question is unrelated to ${p.firstName} or the portfolio, politely steer the conversation back to his profile.

PROFILE
- Name: ${p.name}
- Role: ${p.role}
- Tagline: ${p.tagline}
- Location: ${p.location}
- Email: ${p.email}
- Phone: ${p.phone}
- Intro: ${p.intro}
- Career objective: ${p.careerObjective}

SKILLS
${skills}

PROJECTS
${projects}

EXPERIENCE
${exp}

EDUCATION
${edu}

CERTIFICATES
${certs}

CODING PROFILES
- GitHub: ${data.githubStats.url} (${data.githubStats.repos} repos, ${data.githubStats.stars} stars)
- LeetCode: ${data.leetcodeStats.url} (${data.leetcodeStats.solved} solved, ${data.leetcodeStats.ranking})

SOCIAL
- GitHub: ${p.social.github}
- LinkedIn: ${p.social.linkedin}
- LeetCode: ${p.social.leetcode}
- GeeksforGeeks: ${p.social.gfg}
- Email: ${p.social.email}

Keep replies short, friendly, and professional. Use markdown sparingly (bold for key terms, bullet lists where helpful). Never invent facts not present above.`
}

// Calls Google's Gemini API. Returns the assistant's text reply.
// Throws on network/HTTP errors so the caller can show a friendly message.
function getEnv() {
  try { return import.meta.env || {} } catch { return {} }
}

export async function askGemini(messages) {
  const env = getEnv()
  const apiKey = env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    // Graceful fallback so the chatbot stays useful without a key.
    return "I'm running in demo mode — no Gemini API key is configured yet. Add `VITE_GEMINI_API_KEY` to your `.env` file to enable real AI answers. In the meantime, feel free to explore my skills, projects, and experience on this site!"
  }

  const context = buildPortfolioContext()
  // Convert our {role, content} history into Gemini's contents format.
  const contents = [
    { role: 'user', parts: [{ text: context }] },
    { role: 'model', parts: [{ text: 'Got it — I will answer using this portfolio context.' }] },
    ...messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
  ]

  // Limit prompt size: keep only the last 12 turns for performance.
  const trimmed = contents.slice(0, 2).concat(contents.slice(-12))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: trimmed, generationConfig: { temperature: 0.6, maxOutputTokens: 512 } }),
    }
  )

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`Gemini API error ${res.status}: ${errText.slice(0, 200)}`)
  }

  const json = await res.json()
  const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!reply) throw new Error('Empty response from Gemini.')
  return reply.trim()
}
