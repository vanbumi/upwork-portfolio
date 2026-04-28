'use client'

import { useState } from 'react'
import { Header } from '@/components/layouts/Header'
import { 
  HeroCenter, 
  HeroLeft, 
  HeroWithImage, 
  FeaturesGrid, 
  PricingSimple,
  Testimonials
} from '@/components/sections'
import { HeroSwitcher } from '@/components/ui/HeroSwitcher'
import { Assistant } from 'next/font/google'

export default function Home() {
  const [activeHero, setActiveHero] = useState<'center' | 'left' | 'image'>('center')

  // Data Features
  const sampleFeatures = [
    { title: "Fast Performance", description: "Lightning fast load times with Next.js 15 and automatic optimization", icon: "⚡" },
    { title: "SEO Optimized", description: "Built with best practices for maximum search engine visibility", icon: "📈" },
    { title: "Mobile First", description: "Fully responsive design that looks great on any device", icon: "📱" },
    { title: "TypeScript Ready", description: "Type-safe code for better developer experience", icon: "🔷" },
    { title: "Easy Customization", description: "Modular components that are easy to modify and extend", icon: "🎨" },
    { title: "Analytics Ready", description: "Ready to integrate with Google Analytics, Mixpanel, etc", icon: "📊" }
  ]

  // Data Pricing
  const pricingTiers = [
    {
      name: "Starter",
      price: "$397",
      description: "Perfect for startups & small businesses",
      features: [
        "1 Landing Page", 
        "Mobile Responsive", 
        "SEO Optimized", 
        "Contact Form", 
        "3 Business Days Delivery"
      ],
      buttonText: "Start Project",
    },
    {
      name: "Professional", 
      price: "$797",
      description: "Best for growing companies",
      features: [
        "Up to 3 Landing Pages",
        "Advanced SEO", 
        "Analytics Setup", 
        "5 Days Support",
        "7 Business Days Delivery",
        "Content Upload Assistance"
      ],
      buttonText: "Choose Plan",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$1,497",
      description: "For large organizations & agencies",
      features: [
        "Unlimited Pages",
        "Custom Design", 
        "Priority Support", 
        "CMS Integration",
        "2 Business Days Delivery",
        "1 Year Maintenance"
      ],
      buttonText: "Contact Us",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Founder",
      company: "TechStart",
      content: "The landing page converted 40% better than our old one. Amazing work!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "GrowthLabs",
      content: "Professional, fast, and SEO optimized. Our organic traffic doubled.",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "CEO",
      company: "CreativeStudio",
      content: "Best investment for our brand. The team understood exactly what we needed.",
      rating: 5
    }
  ]

  return (
    <main>
      <Header />
      
      {/* Hero Section - Conditional Rendering based on activeHero */}
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
      
      {/* Features Section */}
      <FeaturesGrid 
        id="features"
        title="Powerful Features"
        subtitle="Everything you need to create high-converting landing pages"
        features={sampleFeatures}
      />
      
      {/* Pricing Section */}
      <PricingSimple 
        title="Simple, Transparent Pricing"
        subtitle="Choose the plan that fits your business"
        tiers={pricingTiers}
        id="pricing"
      />

      {/* 👈 TAMBAHKAN INI */}
      <Testimonials 
        title="What Our Clients Say"
        subtitle="Trusted by businesses worldwide"
        testimonials={testimonials}
      />
      
      {/* Hero Switcher - Floating Button */}
      <HeroSwitcher activeHero={activeHero} onSwitch={setActiveHero} />
    </main>
  )
}