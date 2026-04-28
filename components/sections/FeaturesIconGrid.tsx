'use client'

import { motion } from 'framer-motion'
import { Section } from '../ui/Section'

type Feature = {
  title: string
  description: string
  icon: string
}

type FeaturesIconGridProps = {
  title: string
  subtitle?: string
  features: Feature[]
}

const FeaturesIconGrid = ({ title, subtitle, features }: FeaturesIconGridProps) => {
  return (
    <Section background="gradient">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default FeaturesIconGrid