'use client'

import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { Button } from '../ui/Button'

const SocialAuto = () => {
  const features = [
    {
      icon: "🔄",
      title: "Auto-Post ke Instagram",
      description: "Setiap blog post baru otomatis terbagi ke Instagram feed & story. Konten Anda selalu fresh."
    },
    {
      icon: "📱",
      title: "Support Multi-Platform",
      description: "Posting ke Instagram, LinkedIn, Twitter, dan Facebook — dari satu dashboard."
    },
    {
      icon: "⏰",
      title: "Schedule & Queue",
      description: "Atur jadwal posting kapan saja. Sistem akan antri dan posting otomatis."
    },
    {
      icon: "📊",
      title: "Analytics & Insight",
      description: "Lihat performa post: reach, engagement, dan konversi dari setiap platform."
    },
    {
      icon: "🤖",
      title: "DM Automation",
      description: "Auto-reply ke komentar/DM, capture leads, dan qualify prospek 24/7."
    },
    {
      icon: "🔗",
      title: "Custom Integration",
      description: "Hubungkan dengan CRM, email marketing, atau tools lain via webhook."
    }
  ]

  const pricingTiers = [
    {
      name: "Basic Auto-Post",
      price: "$97",
      period: "one-time",
      features: [
        "Setup RSS to Instagram",
        "Auto-post ke 1 akun",
        "1 bulan support",
        "Dokumentasi cara pakai"
      ],
      buttonText: "Add to Package",
      popular: false
    },
    {
      name: "Pro Auto-Post",
      price: "$197",
      period: "one-time",
      features: [
        "Setup RSS ke 3 platform (IG, FB, X)",
        "Auto-post ke 3 akun",
        "3 bulan support",
        "Queue & scheduling",
        "Analytics dashboard"
      ],
      buttonText: "Recommended",
      popular: true
    },
    {
      name: "Managed Service",
      price: "$49",
      period: "monthly",
      features: [
        "Semua fitur Pro",
        "Kami kelola posting",
        "Content curation",
        "Weekly report",
        "24/7 support"
      ],
      buttonText: "Contact Us",
      popular: false
    }
  ]

  return (
    <Section background="white" id="social-auto">
      <div className="text-center mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
            ✨ Bonus Service
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Social Media Automation
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ubah blog menjadi mesin leads otomatis. Posting ke Instagram, LinkedIn, dan Twitter — tanpa sentuh HP.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Pricing Tiers */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingTiers.map((tier, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`relative bg-gray-50 rounded-2xl p-8 ${
              tier.popular ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            )}
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
            
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
              <span className="text-gray-500 text-sm ml-1">
                {tier.period === 'one-time' ? 'one-time' : '/month'}
              </span>
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
            
            <Button 
              variant={tier.popular ? 'primary' : 'outline'} 
              href="/#contact" 
              className="w-full text-center"
            >
              {tier.buttonText}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          🔒 Works with Instagram Business accounts • GDPR compliant • 30-day money back guarantee
        </p>
      </div>
    </Section>
  )
}

export default SocialAuto