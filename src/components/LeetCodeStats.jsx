import { Trophy, Flame, Star, Brain } from 'lucide-react'
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

export default function LeetCodeStats() {
  const l = data.leetcodeStats
  return (
    <section id="leetcode" className="section">
      <SectionHeading eyebrow="Problem Solving" title="LeetCode stats" subtitle="How I keep my fundamentals sharp with daily DSA practice." />
      <div className="glass-card gradient-border p-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="grid place-items-center h-11 w-11 rounded-xl bg-amber-500/20 text-amber-500"><Trophy size={20} /></span>
          <div>
            <p className="font-semibold">@{l.username}</p>
            <a href={l.url} target="_blank" rel="noreferrer" className="text-xs text-accent-deep hover:underline">{l.url}</a>
            <p className="text-xs text-ink-500 dark:text-ink-400 mt-0.5">{l.ranking}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat value={l.solved} label="Total Solved" Icon={Flame} />
          <Stat value={l.easy} label="Easy" Icon={Star} />
          <Stat value={l.medium} label="Medium" Icon={Brain} />
          <Stat value={l.hard} label="Hard" Icon={Trophy} />
        </div>
      </div>
    </section>
  )
}
