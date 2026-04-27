'use client'

import { useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { HeroCenter, HeroLeft, HeroWithImage } from '@/components/sections'
import { HeroSwitcher } from '@/components/ui/HeroSwitcher'

export default function Home() {
  const [activeHero, setActiveHero] = useState<'center' | 'left' | 'image'>('center')

  return (
    <main>
      <Header />
      
      {/* Render active hero based on state */}
      {activeHero === 'center' && (
        <HeroCenter 
          title="Build Fast. Convert Better."
          subtitle="Professional landing pages built with Next.js 15 and Tailwind CSS. Blazing fast and SEO optimized."
          ctaText="Start Building"
          secondaryCtaText="View Pricing"
        />
      )}
      
      {activeHero === 'left' && (
        <HeroLeft 
          title="Landing Pages That Actually Convert"
          subtitle="Stop wasting time on complex setups. Get a beautiful, high-converting landing page in days, not weeks."
          ctaText="Get Started Now"
          badge="🔥 Limited Offer"
        />
      )}
      
      {activeHero === 'image' && (
        <HeroWithImage 
          title="Beautiful Landing Pages Made Simple"
          subtitle="Launch your product faster with our professional templates. Used by 1000+ businesses worldwide."
          ctaText="View Templates"  
        />
      )}
      
      {/* Hero Switcher - floating button di bawah */}
      <HeroSwitcher activeHero={activeHero} onSwitch={setActiveHero} />
    </main>
  )
}