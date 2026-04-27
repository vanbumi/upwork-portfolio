'use client'

import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

type HeroLeftProps = {
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  badge?: string
}

const HeroLeft = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '#',
  badge,
}: HeroLeftProps) => {
  return (
    <section className="min-h-[90vh] flex items-center bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          {badge && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            >
              {badge}
            </motion.div>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl"
          >
            {subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="primary" href={ctaLink}>
              {ctaText} →
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroLeft