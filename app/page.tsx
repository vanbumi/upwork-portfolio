'use client'

import { useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { HeroCenter, FeaturesGrid, FeaturesCards, FeaturesIconGrid } from '@/components/sections'
import { HeroSwitcher } from '@/components/ui/HeroSwitcher'

export default function Home() {
  const [activeHero, setActiveHero] = useState<'center' | 'left' | 'image'>('center')

  // Sample features data
  const sampleFeatures = [
    {
      title: "Fast Performance",
      description: "Lightning fast load times with Next.js 15 and automatic optimization",
      icon: "⚡"
    },
    {
      title: "SEO Optimized",
      description: "Built with best practices for maximum search engine visibility",
      icon: "📈"
    },
    {
      title: "Mobile First",
      description: "Fully responsive design that looks great on any device",
      icon: "📱"
    },
    {
      title: "TypeScript Ready",
      description: "Type-safe code for better developer experience",
      icon: "🔷"
    },
    {
      title: "Easy Customization",
      description: "Modular components that are easy to modify and extend",
      icon: "🎨"
    },
    {
      title: "Analytics Ready",
      description: "Ready to integrate with Google Analytics, Mixpanel, etc",
      icon: "📊"
    }
  ]

  return (
    <main>
      <Header />
      
      <HeroCenter 
        title="Build Fast. Convert Better."
        subtitle="Professional landing pages built with Next.js 15 and Tailwind CSS. Blazing fast and SEO optimized."
        ctaText="Start Building"
        secondaryCtaText="View Pricing"
      />
      
      {/* Test Features Grid */}
      <FeaturesGrid 
        title="Powerful Features"
        subtitle="Everything you need to create high-converting landing pages"
        features={sampleFeatures}
      />
      
      {/* Uncomment untuk test variant lain */}
      {/*
      <FeaturesCards 
        title="Why Choose Us"
        subtitle="We provide the best tools for your business"
        features={sampleFeatures.map(f => ({ ...f, badge: "New" }))}
      />
      
      <FeaturesIconGrid 
        title="Key Benefits"
        subtitle="Simple, fast, and effective"
        features={sampleFeatures.slice(0, 4)}
      />
      */}
      
      <HeroSwitcher activeHero={activeHero} onSwitch={setActiveHero} />
    </main>
  )
}