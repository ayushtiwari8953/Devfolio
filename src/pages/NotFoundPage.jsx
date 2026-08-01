import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home as HomeIcon } from 'lucide-react'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen grid place-items-center px-5">
      <SEO title="Page not found" description="The page you were looking for doesn't exist." />
      <div className="text-center">
        <p className="font-display text-7xl sm:text-9xl font-bold heading-gradient">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold">Page not found</h1>
        <p className="mt-2 text-ink-500 dark:text-ink-300 max-w-md mx-auto">The page you're looking for may have been moved or never existed. Let's get you back home.</p>
        <Link to="/" className="btn-primary mt-6 inline-flex"><HomeIcon size={18} /> Back to Home</Link>
      </div>
    </motion.div>
  )
}
