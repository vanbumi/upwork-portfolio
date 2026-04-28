'use client'

import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { Button } from '../ui/Button'

type PricingTier = {
  name: string
  price: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

type PricingSimpleProps = {
  title: string
  subtitle?: string
  tiers: PricingTier[]
  id?: string
}

const PricingSimple = ({ title, subtitle, tiers, id }: PricingSimpleProps) => {
  return (
    <Section background="gray" id={id}>
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative bg-white rounded-2xl p-8 shadow-lg ${
              tier.popular ? 'ring-2 ring-blue-500 shadow-xl' : ''
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            )}
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
            <p className="text-gray-600 mb-4">{tier.description}</p>
            
            <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                <span className="text-gray-500 text-sm block">one-time payment</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Button variant={tier.popular ? 'primary' : 'outline'} href="#contact" className="w-full text-center">
              {tier.buttonText}
            </Button>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default PricingSimple