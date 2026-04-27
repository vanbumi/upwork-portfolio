'use client'

import { motion } from 'framer-motion'
import { Button } from '../ui/Button'
import Image from 'next/image'

type HeroWithImageProps = {
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  imageUrl?: string
  imageAlt?: string
}

const HeroWithImage = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '#',
  imageUrl = 'https://picsum.photos/id/1/600/400',
  imageAlt = 'Hero image',
}: HeroWithImageProps) => {
  return (
    <section className="min-h-[90vh] flex items-center bg-gradient-to-r from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {subtitle}
            </p>
            <Button variant="primary" href={ctaLink}>
              {ctaText} →
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority={true} // biar tidak priority kecuali hero di atas fold
              />
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-20 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full blur-2xl opacity-20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroWithImage