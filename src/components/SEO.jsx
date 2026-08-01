import { Helmet } from 'react-helmet-async'
import data from '../data/portfolioData.json'

export default function SEO({ title, description, path }) {
  const fullTitle = title ? `${title} · ${data.profile.name}` : `${data.profile.name} — ${data.profile.role}`
  const desc = description || data.profile.intro
  const url = typeof window !== 'undefined' ? window.location.origin + (path || '') : ''
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="author" content={data.profile.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
