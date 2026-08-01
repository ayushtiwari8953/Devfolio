import { Star, Users, GitFork, Activity } from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import SectionHeading from './SectionHeading'
import { useCountUp, useInView } from '../hooks/useScroll'
import data from '../data/portfolioData.json'

function Stat({ value, label, Icon }) {
  const [ref, inView] = useInView()
  const n = useCountUp(value, inView)
  return (
    <div ref={ref} className="glass-card gradient-border p-5 text-center">
      <Icon size={20} className="mx-auto text-accent-deep mb-2" />
      <p className="font-display text-2xl font-bold heading-gradient">{n}</p>
      <p className="text-xs text-ink-500 dark:text-ink-300 mt-1">{label}</p>
    </div>
  )
}

// Lightweight contribution calendar built from deterministic pseudo-data.
function ContributionCalendar() {
  const weeks = 26
  const days = 7
  const cells = Array.from({ length: weeks * days }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280
    const r = seed / 233280
    return r
  })
  const level = (r) => {
    if (r < 0.45) return 'bg-ink-200/50 dark:bg-ink-800/50'
    if (r < 0.7) return 'bg-accent/30'
    if (r < 0.85) return 'bg-accent/60'
    return 'bg-accent-deep'
  }
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-1 mt-4" aria-label="GitHub contribution calendar">
      {cells.map((r, i) => <span key={i} className={`h-2.5 w-2.5 rounded-sm ${level(r)}`} />)}
    </div>
  )
}

export default function GitHubStats() {
  const g = data.githubStats
  return (
    <section id="github" className="section">
      <SectionHeading eyebrow="Open Source" title="GitHub activity" subtitle="A snapshot of my open-source footprint and contribution rhythm." />
      <div className="glass-card gradient-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="grid place-items-center h-11 w-11 rounded-xl bg-ink-900 text-white dark:bg-white dark:text-ink-900"><GithubIcon size={20} /></span>
          <div>
            <p className="font-semibold">@{g.username}</p>
            <a href={g.url} target="_blank" rel="noreferrer" className="text-xs text-accent-deep hover:underline">{g.url}</a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat value={g.repos} label="Repositories" Icon={GitFork} />
          <Stat value={g.stars} label="Stars Earned" Icon={Star} />
          <Stat value={g.followers} label="Followers" Icon={Users} />
          <Stat value={g.contributions} label="Contributions" Icon={Activity} />
        </div>
        <ContributionCalendar />
        <p className="text-xs text-ink-400 mt-2">Last 26 weeks · contributions</p>
      </div>
    </section>
  )
}
